'use client'

/**
 * SectionNav - fixed right-side slide navigator
 *
 * Renders a vertical strip of dots (one per section) with up/down arrows
 * and a live counter (e.g. "3/8"). Clicking a dot or arrow smooth-scrolls
 * to that section. The active dot updates automatically as the user scrolls.
 * Works on both light and dark section backgrounds.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HOW TO ADD THIS TO A NEW PAGE - read before you start
 * ─────────────────────────────────────────────────────────────────────────
 *
 * STEP 1 - decide your sections
 *   Every visible "slide" of the page needs a unique id string.
 *   Good ids are short, lowercase, hyphenated: "hero", "key-features", "pricing".
 *
 * STEP 2 - add the id to each section element
 *   Find every top-level <section> or <motion.section> in the page file and
 *   add id="your-id" to it. Example:
 *
 *       <section id="hero" className="relative w-full overflow-hidden" ...>
 *       <motion.section id="key-features" {...fade(0.1)} className="py-24 bg-white">
 *       <motion.section id="pricing" {...fade(0.1)} className="py-24" style={{...}}>
 *
 *   The id must be on the outermost element of each section (the one that carries
 *   vertical padding such as py-24). Scroll targets align the first line of content
 *   (after that padding) under the fixed breadcrumb - not the section’s outer edge.
 *
 * STEP 3 - import and place the component
 *   Add the import at the top of the page file:
 *
 *       import SectionNav from '@/components/SectionNav'
 *
 *   Then place <SectionNav> just before the closing tag of the page's root element.
 *   Pass the accent color of this product page and the list of sections in order:
 *
 *       <SectionNav
 *         accent="#EA580C"        // the product's accent color (see ACCENT const at top of file)
 *         sections={[
 *           { id: 'hero',         label: 'Hero' },
 *           { id: 'key-features', label: 'Key Features' },
 *           { id: 'pricing',      label: 'Pricing' },
 *         ]}
 *       />
 *
 *   Labels appear in a tooltip on hover - keep them short (1–3 words).
 *   The order of the array must match the visual top-to-bottom order of sections.
 *
 * REFERENCE - see /src/app/cashless/page.tsx for a complete working example.
 *
 * Scroll offset uses the measured height of `ProductBreadcrumb` (`[data-product-nav]`).
 * If you add SectionNav on a page without that nav, pass a custom offset (future prop)
 * or ensure a sticky header exposes a measurable root.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { track } from '@/lib/track'

/** Space between fixed nav and first visible line of section content after scroll */
const SCROLL_GUTTER_PX = 8
/** Used until `[data-product-nav]` is measured (must match breadcrumb ~ py-3 + mini orbit) */
const FALLBACK_NAV_HEIGHT_PX = 88

/** Y position (document) where section *content* begins: border-top + padding-top */
function sectionContentStartY(el: HTMLElement): number {
  const rect = el.getBoundingClientRect()
  const borderTop = rect.top + window.scrollY
  const padTop = parseFloat(window.getComputedStyle(el).paddingTop) || 0
  return borderTop + padTop
}

interface Section {
  id: string
  label: string
}

interface SectionNavProps {
  sections: Section[]
  accent?: string
}

export default function SectionNav({ sections, accent = '#EA580C' }: SectionNavProps) {
  const [active, setActive] = useState(0)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const [navHeight, setNavHeight] = useState(FALLBACK_NAV_HEIGHT_PX)
  const scrollRaf = useRef<number | null>(null)

  // Match fixed `ProductBreadcrumb` height (see `data-product-nav` on the nav root)
  useLayoutEffect(() => {
    const nav = document.querySelector<HTMLElement>('[data-product-nav]')
    if (!nav) return
    const measure = () => setNavHeight(nav.getBoundingClientRect().height)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [])

  const updateActiveFromScroll = useCallback(() => {
    const offset = navHeight + SCROLL_GUTTER_PX
    const y = window.scrollY + offset
    let next = 0
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i].id)
      if (!el) continue
      const contentTop = sectionContentStartY(el)
      if (contentTop <= y) next = i
    }
    setActive((a) => (a !== next ? next : a))
  }, [navHeight, sections])

  useEffect(() => {
    updateActiveFromScroll()
    const onScrollOrResize = () => {
      if (scrollRaf.current != null) return
      scrollRaf.current = window.requestAnimationFrame(() => {
        scrollRaf.current = null
        updateActiveFromScroll()
      })
    }
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (scrollRaf.current != null) cancelAnimationFrame(scrollRaf.current)
    }
  }, [updateActiveFromScroll])

  useEffect(() => {
    const section = sections[active]
    if (!section) return
    const product = window.location.pathname.replace(/^\//, '') || 'home'
    track({ type: 'section_view', product, section: section.id, ts: Date.now() })
  }, [active, sections])

  const scrollTo = (idx: number) => {
    const el = document.getElementById(sections[idx].id)
    if (!el) return
    const top =
      sectionContentStartY(el) - navHeight - SCROLL_GUTTER_PX
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  const canGoUp = active > 0
  const canGoDown = active < sections.length - 1

  return (
    <div
      style={{
        position: 'fixed',
        right: 28,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        userSelect: 'none',
      }}
    >
      {/* Up arrow */}
      <button
        onClick={() => canGoUp && scrollTo(active - 1)}
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: `1.5px solid ${canGoUp ? accent + '70' : 'rgba(128,128,128,0.35)'}`,
          background: canGoUp ? accent + '18' : 'rgba(128,128,128,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canGoUp ? 'pointer' : 'default',
          transition: 'all 0.2s',
          marginBottom: 4,
          opacity: canGoUp ? 1 : 0.45,
        }}
        aria-label="Previous section"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 8L5 2M5 2L2 5M5 2L8 5" stroke={canGoUp ? accent : 'rgba(200,200,200,0.9)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      {sections.map((s, i) => (
        <div
          key={s.id}
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setHoveredDot(i)}
          onMouseLeave={() => setHoveredDot(null)}
        >
          {/* Label tooltip */}
          <AnimatePresence>
            {hoveredDot === i && (
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  right: 22,
                  whiteSpace: 'nowrap',
                  background: 'rgba(17,0,43,0.88)',
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: 'Mulish, sans-serif',
                  letterSpacing: '0.06em',
                  padding: '4px 10px',
                  borderRadius: 6,
                  pointerEvents: 'none',
                }}
              >
                {s.label}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dot */}
          <motion.button
            onClick={() => scrollTo(i)}
            animate={{
              width: i === active ? 10 : 6,
              height: i === active ? 10 : 6,
              backgroundColor: i === active ? accent : hoveredDot === i ? accent + 'cc' : 'rgba(255,255,255,0.55)',
            }}
            transition={{ duration: 0.2 }}
            style={{
              borderRadius: '50%',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'block',
              // Ring visible on light bg, white fill visible on dark bg
              boxShadow: i === active ? 'none' : '0 0 0 1.5px rgba(0,0,0,0.22)',
            }}
            aria-label={`Go to ${s.label}`}
          />
        </div>
      ))}

      {/* Down arrow */}
      <button
        onClick={() => canGoDown && scrollTo(active + 1)}
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: `1.5px solid ${canGoDown ? accent + '70' : 'rgba(128,128,128,0.35)'}`,
          background: canGoDown ? accent + '18' : 'rgba(128,128,128,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canGoDown ? 'pointer' : 'default',
          transition: 'all 0.2s',
          marginTop: 4,
          opacity: canGoDown ? 1 : 0.45,
        }}
        aria-label="Next section"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 2L5 8M5 8L2 5M5 8L8 5" stroke={canGoDown ? accent : 'rgba(200,200,200,0.9)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Counter */}
      <div
        style={{
          marginTop: 6,
          fontSize: 9,
          fontWeight: 700,
          fontFamily: 'Mulish, sans-serif',
          letterSpacing: '0.1em',
          color: accent,
          opacity: 0.7,
          textAlign: 'center',
        }}
      >
        {active + 1}/{sections.length}
      </div>
    </div>
  )
}
