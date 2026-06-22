'use client'

import { motion } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#BE185D'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// AI Visual: chat window → user types → AI responds with chart
// ─────────────────────────────────────────────────────────
const BARS = [
  { h: 30, label: 'Mon' },
  { h: 55, label: 'Tue' },
  { h: 42, label: 'Wed' },
  { h: 78, label: 'Thu' },
  { h: 65, label: 'Fri' },
  { h: 90, label: 'Sat' },
  { h: 48, label: 'Sun' },
]

function AIVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 240 }}>

      {/* Chat window */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute', left: 10, top: 10,
          width: 280, height: 220,
          borderRadius: 16,
          background: 'linear-gradient(160deg, #1a0018 0%, #0d000f 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: `linear-gradient(135deg, ${ACCENT} 0%, #7c1540 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10,
          }}>✨</div>
          <div>
            <div style={{ fontSize: 8, fontWeight: 700, color: 'white' }}>PLG AI Assistant</div>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)' }}>Online · trained on ecosystem data</div>
          </div>
        </div>

        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, height: 'calc(100% - 43px)' }}>

          {/* User message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            style={{ alignSelf: 'flex-end', maxWidth: '75%' }}
          >
            <div style={{
              background: ACCENT,
              borderRadius: '10px 10px 2px 10px',
              padding: '5px 8px',
              fontSize: 7, color: 'white', lineHeight: 1.4,
            }}>
              How will Saturday&apos;s event perform?
            </div>
          </motion.div>

          {/* Typing indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, delay: 1.1, times: [0, 0.2, 1] }}
            style={{ display: 'flex', gap: 3, padding: '4px 8px' }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.1, repeat: 2 }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}
              />
            ))}
          </motion.div>

          {/* AI response */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            style={{ maxWidth: '88%' }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '2px 10px 10px 10px',
              padding: '7px 9px',
            }}>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, marginBottom: 7 }}>
                Based on sales pace, expect{' '}
                <span style={{ color: ACCENT, fontWeight: 700 }}>+28% vs last Saturday</span>.
                Peak hours: 7–9pm.
              </div>

              {/* Mini bar chart */}
              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 50 }}>
                {BARS.map((b, i) => (
                  <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: (b.h / 100) * 40 }}
                      transition={{ duration: 0.5, delay: 2.0 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: '100%',
                        background: b.label === 'Sat'
                          ? `linear-gradient(to top, ${ACCENT}, #e879a8)`
                          : 'rgba(255,255,255,0.15)',
                        borderRadius: '2px 2px 0 0',
                        minHeight: 2,
                      }}
                    />
                    <div style={{ fontSize: 4.5, color: 'rgba(255,255,255,0.3)' }}>{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recommendation badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.6, type: 'spring' }}
            style={{
              alignSelf: 'flex-start',
              background: `${ACCENT}22`,
              border: `1px solid ${ACCENT}40`,
              borderRadius: 8,
              padding: '3px 7px',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <span style={{ fontSize: 7 }}>💡</span>
            <span style={{ fontSize: 6.5, color: ACCENT, fontWeight: 700 }}>Send promo to late buyers</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
const CAPABILITIES = [
  { icon: '📈', title: 'Sales Forecasting', desc: 'Predicts ticket sales curves based on historical data, event type, and market signals, helping promoters plan inventory and pricing.' },
  { icon: '💰', title: 'Dynamic Pricing Advice', desc: 'Recommends optimal price points and when to adjust, maximising revenue without hurting demand.' },
  { icon: '✍️', title: 'Content Generation', desc: 'Drafts event descriptions, social posts, and email campaigns tailored to the event genre and audience.' },
  { icon: '🎯', title: 'Audience Targeting', desc: 'Analyses past buyer behaviour to suggest which segments to target and through which channels.' },
  { icon: '📊', title: 'Performance Reports', desc: 'Auto-generated post-event reports with key metrics, insights, and recommendations for next time.' },
  { icon: '💬', title: 'Conversational Interface', desc: 'Promoters ask questions in plain language and get instant, actionable answers from their data.' },
]

// ─────────────────────────────────────────────────────────
export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="ai-assistant" />

      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #17030b 100%)' }}
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
          background: 'radial-gradient(circle, rgba(190,24,93,0.1) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Product 08
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              AI<br />Assistant
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              An intelligent assistant built into the promoter tools.{' '}
              <span className="text-white/85 font-medium">Smarter decisions, less guesswork</span>
              {', '}powered by all the data that flows through our ecosystem.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <AIVisual />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black leading-none" style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT }}>
                  100<span className="text-4xl">%</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Private by design</p>
                <p className="text-xs text-white/25 mt-1">Your data never leaves the model</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <span style={{ color: ACCENT }}>8</span>+
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Ecosystem data sources</p>
                <p className="text-xs text-white/25 mt-1">Ticketing, cashless, CRM, apps & more</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  &lt;<span style={{ color: ACCENT }}>2</span>s
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Answer time</p>
                <p className="text-xs text-white/25 mt-1">Real-time queries on live data</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-8 pb-24">

        {/* ── Local AI model explainer ── */}
        <motion.section id="local-ai" {...fade(0.2)} className="pt-16 mb-16">
          <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #11002B 0%, #1a0040 100%)', border: '1px solid rgba(190,24,93,0.2)' }}>
            <div className="p-8 md:p-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>How it works</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-4 leading-tight"
                style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Your own AI.<br />Trained on your data.
              </h2>
              <p className="text-white/60 leading-relaxed max-w-2xl text-sm mb-8">
                This is not ChatGPT with a ticketing skin. It is a local AI model that runs on the promoter&apos;s own data from the PLG ecosystem: ticket sales, cashless transactions, fan app behaviour, CRM history, and scanning logs. The model is specific to each promoter and never shares data between accounts.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🎟', label: 'Ticket sales' },
                  { icon: '💳', label: 'Cashless spend' },
                  { icon: '📱', label: 'App behaviour' },
                  { icon: '👥', label: 'CRM & fans' },
                ].map((d) => (
                  <div key={d.label} className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="text-2xl mb-2">{d.icon}</div>
                    <div className="text-xs font-semibold text-white/50">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── What you can ask ── */}
        <motion.section id="promoter-questions" {...fade(0.25)} className="mb-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-2">What Promoters Ask</h2>
          <p className="text-sm text-[#3A3342]/55 mb-8 max-w-lg">Plain language questions, instant answers from real data.</p>
          <div className="space-y-3">
            {[
              { q: 'How many tickets did I sell for the last 3 events?', a: 'Fetches exact figures per event with a breakdown by category (GA, VIP, early bird).' },
              { q: 'Compare this Saturday to the same event last year.', a: 'Side-by-side revenue, attendance, and cashless spend. Highlights what changed and why.' },
              { q: 'Which fans bought tickets but haven\'t used cashless yet?', a: 'Cross-references ticket holders with cashless activity and surfaces the segment for a targeted push.' },
              { q: 'What were peak entry times at Eden Arena last month?', a: 'Pulls scanning logs and shows crowd flow by the minute, useful for staffing next time.' },
              { q: 'Draft a promo email for fans who attended in 2024 but haven\'t bought yet this year.', a: 'Generates a personalised email using CRM history and ticket data, ready to send in one click.' },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl overflow-hidden border border-[#11002B]/8">
                <div className="flex gap-3 px-5 py-4 bg-[#F8F6FC] items-start">
                  <span className="text-lg shrink-0">💬</span>
                  <p className="text-sm font-semibold text-[#11002B]">{item.q}</p>
                </div>
                <div className="flex gap-3 px-5 py-4 items-start" style={{ borderTop: '1px solid #11002B08' }}>
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: `${ACCENT}18`, color: ACCENT }}>✨</span>
                  <p className="text-sm text-[#3A3342]/65 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Capabilities ── */}
        <motion.section id="capabilities" {...fade(0.3)}>
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="flex gap-4 p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#BE185D]/30 transition-colors">
                <span className="text-2xl shrink-0">{c.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#11002B] text-sm mb-1">{c.title}</h3>
                  <p className="text-xs text-[#3A3342]/55 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',                label: 'Hero' },
          { id: 'local-ai',            label: 'How It Works' },
          { id: 'promoter-questions',  label: 'What Promoters Ask' },
          { id: 'capabilities',        label: 'Capabilities' },
        ]}
      />
    </div>
  )
}
