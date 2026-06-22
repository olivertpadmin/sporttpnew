'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#EF4444'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

function CountUp({ to, suffix = '', duration = 2.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const mv = useMotionValue(0)
  useEffect(() => {
    const unsub = mv.on('change', (v) => { if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}` })
    return unsub
  }, [mv, suffix])
  useEffect(() => {
    if (!isInView) return
    const ctrl = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => ctrl.stop()
  }, [isInView, mv, to, duration])
  return <span ref={ref}>0{suffix}</span>
}

// ─────────────────────────────────────────────────────────
// Ticketing Apps Visual: phone → tap → wallet ticket slides in
// ─────────────────────────────────────────────────────────
function TicketingAppVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 240 }}>

      {/* Tap ripple */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: 142, top: 150,
            width: 20, height: 20,
            border: `2px solid ${ACCENT}`,
            marginLeft: -10, marginTop: -10,
          }}
          animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
          transition={{ duration: 1, delay: 1.4 + i * 0.3, repeat: Infinity, repeatDelay: 2.5, ease: 'easeOut' }}
        />
      ))}

      {/* Phone frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          position: 'absolute', left: 90, top: 20,
          width: 120, height: 200,
          borderRadius: 22,
          background: 'linear-gradient(160deg, #1a0505 0%, #0d0000 100%)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          overflow: 'hidden',
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 40, height: 10, background: '#0d0000',
          borderBottomLeftRadius: 8, borderBottomRightRadius: 8, zIndex: 10,
        }} />

        {/* Screen */}
        <div style={{ padding: '18px 10px 10px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* App header */}
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 8, textAlign: 'center', fontWeight: 600 }}>
            MY TICKETS
          </div>

          {/* Wallet card sliding in */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: `linear-gradient(135deg, ${ACCENT}cc 0%, #7c0000 100%)`,
              borderRadius: 12,
              padding: '10px',
              marginBottom: 6,
            }}
          >
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)', marginBottom: 3 }}>GENERAL ADMISSION</div>
            <div style={{ fontSize: 10, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif", marginBottom: 2 }}>
              Oktagon MMA 58
            </div>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)' }}>Eden Arena · Sat 15 Feb 2025</div>
            {/* Barcode */}
            <div style={{ display: 'flex', gap: 1, marginTop: 8 }}>
              {[2,3,1,4,2,1,3,2,4,1,2,3,1,2,4].map((w, i) => (
                <div key={i} style={{ width: w, height: 14, background: 'rgba(255,255,255,0.9)', borderRadius: 0.5 }} />
              ))}
            </div>
          </motion.div>

          {/* Second faded card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 0.4 }}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '8px',
              height: 36,
            }}
          />

          {/* Tap to enter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={{
              marginTop: 'auto',
              background: ACCENT,
              borderRadius: 8,
              padding: '6px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 7, fontWeight: 700, color: 'white' }}>Tap to enter →</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Tap finger indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8], y: [0, -8, 0] }}
        transition={{ duration: 0.8, delay: 1.3, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: 124, top: 134,
          fontSize: 22,
        }}
      >
        👆
      </motion.div>

    </div>
  )
}

// SectionNav anchor ids - order matches SECTIONS groups
const TICKETING_APPS_GROUP_IDS = [
  'onboarding',
  'events-ticketing',
  'entry-onsite',
  'content',
  'marketing-notifications',
] as const

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
const SECTIONS = [
  {
    label: 'Onboarding',
    heading: 'You only make a first impression once',
    subs: [
      {
        title: 'You\'re in control of the onboarding',
        desc: 'The onboarding flow is fully configurable: introductory animation, app tour, notification permission, location services, and a call to log in or register. Each screen is customised to match your venue brand.',
        bullets: [
          'Introductory animation or video: set the mood from the first second',
          'Show fans what they\'ll find in the app',
          'Enabling notifications: the key moment that drives engagement later',
          'Call for login: connect or create a fan profile immediately',
        ],
      },
    ],
  },
  {
    label: 'Events & Ticketing',
    heading: 'The complete ticketing experience, native in your app',
    subs: [
      {
        title: 'Native ticketing directly in the app',
        desc: 'The entire ticket purchase process takes place directly in the app, including a native seat map customised for phone shopping. Fans receive a digital ticket in the app and a copy by email.',
        bullets: [
          'Full purchase process inside the app, with no external redirects',
          'Native seat map optimised for mobile',
          'Digital ticket in-app + email copy',
          'Multiple sales phases: partner presale, priority access, public sale',
        ],
      },
      {
        title: 'Program browsing & event discovery',
        desc: 'A complete overview of all upcoming events at the venue. Fans can browse by category, date, or artist and go straight from discovery to purchase in a few taps.',
        bullets: [
          'Full event calendar with filters',
          'Event detail pages: lineup, description, seating plan',
          'Direct path from discovery to checkout',
          'Venue section highlights and featured events',
        ],
      },
      {
        title: 'Transfer and donate tickets',
        desc: 'A real game changer in the fight against dealers. Each ticket can be sent to someone else with a few clicks. The QR code changes on transfer, keeping everything secure.',
        bullets: [
          'QR code changes on transfer for full security and traceability',
          'Donate or resell to any verified app user',
          'Late delivery QR: fan buys ticket, QR appears before the event',
          'Organisers control transfer rules and deadlines',
        ],
      },
    ],
  },
  {
    label: 'Entry & On-site',
    heading: 'Smooth entry, seamless venue experience',
    subs: [
      {
        title: 'Digital ticket & QR entry',
        desc: 'Fans arrive with their phone. No printing, no queuing at the box office. The QR code is displayed directly in the app and scanned at the gate in under a second.',
        bullets: [
          'Instant QR display, works offline',
          'Unique per-transfer QR prevents fraud',
          'Compatible with all standard gate readers',
          'Apple Wallet / Google Wallet support',
        ],
      },
      {
        title: 'In-venue navigation and info',
        desc: 'Help fans find their seat, the nearest bar, or the toilets. All venue information in one place, with no printed maps and no confusion.',
        bullets: [
          'Interactive venue map with seat finder',
          'F&B locations, restrooms, first aid',
          'Entry gate assignment per ticket',
          'Parking and transport information',
        ],
      },
    ],
  },
  {
    label: 'Content',
    heading: 'Everything fans want to know, right in the app',
    subs: [
      {
        title: 'News, articles and event content',
        desc: 'Keep fans engaged between events with editorial content, behind-the-scenes stories, artist features, and venue news. All managed from a simple CMS.',
        bullets: [
          'Article feed with categories and tags',
          'Rich media: photos, video embeds',
          'Event preview and review content',
          'Push-linked articles for post-match/show coverage',
        ],
      },
    ],
  },
  {
    label: 'Marketing & Notifications',
    heading: 'Reach your fans where they actually are',
    subs: [
      {
        title: 'Targeted push notifications',
        desc: 'News that fans actually read. Send push notifications with deliverability up to 70 %. Take your fans to the right place, whether inside or outside the app.',
        bullets: [
          'Manual and automated notifications',
          'Target by segment: ticket holders, loyalty members, VIPs',
          'Schedule delivery for the right time',
          'Deep-link to any in-app location: event, article, offer',
        ],
      },
      {
        title: 'Personalised offers and partner benefits',
        desc: 'Discounts, benefits, advantages. Reach your fans with targeted offers from you or your partners.',
        bullets: [
          'Offers targeted to all fans, a specific segment, or individual users',
          'Format: discount code, QR code, or barcode',
          'Partner info and redemption instructions per offer',
          'In-app banner advertising space with auto-fill',
        ],
      },
      {
        title: 'Fan feedback',
        desc: 'Ask fans anything. Each response carries relevant fan profile data so you can act on feedback immediately.',
        bullets: [
          'Open-ended and categorised questions',
          'Categories: App, Refreshments, Venue, Tickets, Other',
          'Fan info automatically attached to each response',
        ],
      },
    ],
  },
]

const EXAMPLE_CLIENT = {
  name: 'O2 Arena',
  color: '#00A0DF',
  desc: 'One of Europe\'s busiest arenas uses a PLG-powered app to manage multi-event ticketing, in-venue navigation, push campaigns, and fan data, all under the O2 Arena brand.',
  stats: [
    { n: '13 000', l: 'seats per event' },
    { n: '200+',   l: 'events per year' },
    { n: '1 app',  l: 'tickets, content & offers' },
    { n: 'SSO',    l: 'linked to PLG ecosystem' },
  ],
}

// ─────────────────────────────────────────────────────────
export default function TicketingAppsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="ticketing-apps" />

      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #1c0808 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{
          right: '10%', bottom: '5%', width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)`, filter: 'blur(40px)',
        }} />
        <div className="absolute" style={{
          left: '-5%', top: '10%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Product 02
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Ticketing<br />Apps
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              The mobile face of our ticketing business. Buyers purchase, store, and use tickets{' '}
              <span className="text-white/85 font-medium">entirely from their phone</span>
              {', '}across every market we operate in.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <TicketingAppVisual />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT }}>
                  iOS + Android
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Platforms</p>
                <p className="text-xs text-white/25 mt-1">Native on both app stores</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={7} />
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Markets</p>
                <p className="text-xs text-white/25 mt-1">One app, every country</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  SSO
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Single login</p>
                <p className="text-xs text-white/25 mt-1">Tied to the PLG ecosystem</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Built on Venue Apps callout */}
      <section id="foundation" className="max-w-5xl mx-auto px-8 pt-16">
        <motion.div {...iv(0.1)}
          className="rounded-3xl px-10 py-8 flex flex-col md:flex-row items-center gap-6"
          style={{ background: 'linear-gradient(135deg, #07000f 0%, #1c0808 100%)', border: `1px solid ${ACCENT}25` }}>
          <div className="flex-1">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Foundation</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2 mb-2 leading-tight"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Built on Venue Owner Apps
            </h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-xl">
              Ticketing Apps share the same proven platform as our Venue Owner Apps: the full feature set, infrastructure, and integrations. The difference is the use case: multi-event public venues like arenas, not single clubs.
            </p>
          </div>
          <div className="flex-shrink-0 px-6 py-4 rounded-2xl text-center"
            style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}>
            <div className="text-3xl font-black text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>100%</div>
            <div className="text-xs text-white/40 mt-1">shared codebase</div>
          </div>
        </motion.div>
      </section>

      {/* Feature Sections */}
      {SECTIONS.map((group, gi) => {
        const groupBg = gi % 2 === 0 ? '#ffffff' : '#faf8ff'
        return (
          <div key={group.label} style={{ background: groupBg }}>
            <section id={TICKETING_APPS_GROUP_IDS[gi]} className="pt-20 pb-4">
              <div className="max-w-5xl mx-auto px-8">
                <motion.div {...iv(0.1)}>
                  <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{group.label}</span>
                  <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-0 leading-none"
                    style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                    {group.heading}
                  </h2>
                </motion.div>
              </div>
            </section>

            {group.subs.map((sub, si) => (
              <section key={sub.title} className="py-16">
                <div className="max-w-5xl mx-auto px-8">
                  <motion.div {...iv(0.1)}>
                    <div style={{ width: 32, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 18 }} />
                    <h3 className="text-2xl md:text-3xl font-bold text-[#11002B] mb-3 leading-tight"
                      style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                      {sub.title}
                    </h3>
                    <p className="text-base text-[#3A3342]/55 mb-7 leading-relaxed max-w-2xl">{sub.desc}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {sub.bullets.map((b, bi) => (
                        <div key={bi} className="flex items-start gap-3 p-4 rounded-xl"
                          style={{ background: si % 2 === 0 ? `${ACCENT}07` : 'rgba(17,0,43,0.03)', border: `1px solid ${ACCENT}15` }}>
                          <span style={{ color: ACCENT, marginTop: 1, flexShrink: 0, fontWeight: 700 }}>✓</span>
                          <span className="text-sm text-[#3A3342]/75 leading-relaxed">{b}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            ))}
          </div>
        )
      })}

      {/* Example client */}
      <section
        id="example-client"
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 50%, #0f071c 100%)' }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-20">
          <motion.div {...iv(0.1)}>
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Example Client</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-12 leading-none"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>Real results from a real venue</h2>
          </motion.div>
          <motion.div {...iv(0.2)}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: `0 0 48px ${EXAMPLE_CLIENT.color}18` }}>
            <div style={{ height: 3, background: `linear-gradient(90deg, ${EXAMPLE_CLIENT.color} 0%, ${EXAMPLE_CLIENT.color}60 100%)` }} />
            <div className="p-8">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: EXAMPLE_CLIENT.color }} />
                <span className="text-[10px] font-semibold text-white/45 uppercase tracking-[0.18em]">{EXAMPLE_CLIENT.name}</span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-2xl">{EXAMPLE_CLIENT.desc}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {EXAMPLE_CLIENT.stats.map((s) => (
                  <div key={s.l} style={{ background: `${EXAMPLE_CLIENT.color}12`, border: `1px solid ${EXAMPLE_CLIENT.color}28`, borderRadius: 10, padding: '12px 14px' }}>
                    <div className="font-black leading-none mb-1"
                      style={{ fontFamily: "'Panel Sans', sans-serif", color: EXAMPLE_CLIENT.color, fontSize: s.n.length > 5 ? '0.9rem' : '1.15rem' }}>
                      {s.n}
                    </div>
                    <div className="text-[9px] text-white/40 leading-snug">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="pb-16" />

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',                   label: 'Hero' },
          { id: 'foundation',             label: 'Foundation' },
          { id: 'onboarding',             label: 'Onboarding' },
          { id: 'events-ticketing',       label: 'Events & Ticketing' },
          { id: 'entry-onsite',           label: 'Entry & On-site' },
          { id: 'content',                label: 'Content' },
          { id: 'marketing-notifications', label: 'Marketing' },
          { id: 'example-client',         label: 'Example Client' },
        ]}
      />
    </div>
  )
}
