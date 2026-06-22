'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#7C5CBF'

const FEATURES = [
  { icon: '📰', title: 'News & Content', desc: 'Club news, articles, and push notifications keep fans engaged year-round.' },
  { icon: '🎬', title: 'Multimedia', desc: 'Videos, photo galleries, and highlights, all inside the app.' },
  { icon: '📅', title: 'Matches & Results', desc: 'Live scores, fixtures, and standings for every sport.' },
  { icon: '🎟', title: 'Ticket Purchase', desc: 'Seamless in-app ticket buying through the PLG ticketing infrastructure.' },
  { icon: '👤', title: 'Fan Profiles', desc: 'Personalised experience with favourite teams, history, and saved content.' },
  { icon: '🔔', title: 'Push Notifications', desc: 'Match alerts, ticket release announcements, and club updates.' },
]

const EXAMPLES = [
  { name: 'SK Slavia Praha', type: 'White Label', color: '#C8102E' },
  { name: 'HC Sparta Praha', type: 'White Label', color: '#E87722' },
  { name: 'O2 Arena', type: 'White Label', color: '#00A0DF' },
  { name: 'Festival App', type: 'Lite', color: '#7C5CBF' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

export default function AppsPage() {
  const [activeType, setActiveType] = useState<'white-label' | 'lite'>('white-label')

  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': '#7C5CBF' } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="apps" />

      <div className="max-w-5xl mx-auto px-8 pt-40 pb-24">

        {/* Hero */}
        <motion.section id="hero" {...fade(0.1)} className="mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            Product 02
          </span>
          <h1
            className="text-6xl md:text-7xl mt-6 mb-6 leading-none text-[#11002B]"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}
          >
            Mobile<br />Apps
          </h1>
          <p className="text-xl text-[#3A3342]/70 max-w-2xl leading-relaxed">
            We build apps for sports clubs, arenas, and festivals. The goal is simple:{' '}
            <span className="highlight font-semibold text-[#11002B]">bring fans to the app</span>
            {', '}and bring ticket revenue back to us.
          </p>
        </motion.section>

        {/* White Label vs Lite toggle */}
        <motion.section id="editions" {...fade(0.2)} className="mb-12">
          <div className="flex gap-2 p-1 rounded-xl bg-[#F8F6FC] w-fit mb-8">
            {(['white-label', 'lite'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: activeType === t ? ACCENT : 'transparent',
                  color: activeType === t ? '#fff' : '#3A3342',
                }}
              >
                {t === 'white-label' ? 'White Label' : 'Lite'}
              </button>
            ))}
          </div>

          {activeType === 'white-label' ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#F8F6FC]">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: ACCENT }} />
                <h3 className="font-bold text-[#11002B] text-lg mb-2">Fully Customised</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                  Built from a library of Figma components. Every app is assembled from the same building blocks but mixed uniquely per client. Each looks distinct, on-brand for the club or venue.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F8F6FC]">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: ACCENT }} />
                <h3 className="font-bold text-[#11002B] text-lg mb-2">For Major Clubs &amp; Venues</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                  Designed for SK Slavia, HC Sparta, O2 Arena, and similar partners who need a premium, branded fan experience that matches their identity.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#F8F6FC]">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: ACCENT }} />
                <h3 className="font-bold text-[#11002B] text-lg mb-2">One App, Many Teams</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                  A single version of the app: every Lite client looks the same structurally. Only the colour scheme changes. Fast to deploy, low cost, perfect for smaller clubs.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F8F6FC]">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: ACCENT }} />
                <h3 className="font-bold text-[#11002B] text-lg mb-2">For Smaller Teams</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                  Ideal for regional sports clubs and smaller events who want a professional fan app without the budget for full customisation.
                </p>
              </div>
            </div>
          )}
        </motion.section>

        {/* Features */}
        <motion.section id="features" {...fade(0.3)} className="mb-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">App Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#7C5CBF]/30 transition-colors">
                <span className="text-2xl mb-3 block">{f.icon}</span>
                <h3 className="font-semibold text-[#11002B] text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-[#3A3342]/55 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Example clients */}
        <motion.section id="clients" {...fade(0.4)}>
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Example Clients</h2>
          <div className="flex flex-wrap gap-3">
            {EXAMPLES.map((e) => (
              <div
                key={e.name}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border"
                style={{ borderColor: `${e.color}40`, background: `${e.color}08` }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                <span className="text-sm font-medium text-[#11002B]">{e.name}</span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${e.color}20`, color: e.color }}
                >
                  {e.type}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',     label: 'Hero' },
          { id: 'editions', label: 'White Label & Lite' },
          { id: 'features', label: 'App Features' },
          { id: 'clients',  label: 'Example Clients' },
        ]}
      />
    </div>
  )
}
