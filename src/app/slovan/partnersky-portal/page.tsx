'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#6366F1'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// For whom
// ─────────────────────────────────────────────────────────
const FOR_WHOM = [
  {
    icon: '🤝',
    title: 'Partneři & sponzoři',
    desc: 'Přístup k přiděleným vstupenkám, jejich správa a operace kdykoliv a odkudkoliv.',
  },
  {
    icon: '⭐',
    title: 'Čestní hosté',
    desc: 'Bezproblémové vyzvednutí čestných vstupenek bez nutnosti osobního kontaktu s klubem.',
  },
  {
    icon: '👔',
    title: 'Zaměstnanci',
    desc: 'Interní distribuce vstupenek pro zaměstnance přehledně na jednom místě.',
  },
  {
    icon: '🏒',
    title: 'Hostující kluby',
    desc: 'Snadná správa a přidělování vstupenek pro hráče, realizační tým a vedení hostujícího klubu.',
  },
  {
    icon: '👥',
    title: 'Speciální skupiny',
    desc: 'Flexibilní řešení pro jakoukoliv další skupinu s individuálními podmínkami purchase flow.',
  },
]

// ─────────────────────────────────────────────────────────
// Partner features (what portal can do)
// ─────────────────────────────────────────────────────────
const PARTNER_FEATURES = [
  {
    icon: '🎟️',
    title: 'Přehled vstupenek',
    desc: 'Veškeré přidělené vstupenky na jednom místě. Vždy dostupné, přehledně seřazené, s historií transakcí a převodů.',
  },
  {
    icon: '🛒',
    title: 'Nákup a vyzvednutí',
    desc: 'Partner si může vstupenky zakoupit nebo zdarma vyzvednout dle nastavení klubu. Vše na pár kliknutí po přihlášení.',
  },
  {
    icon: '🔁',
    title: 'Operace s vstupenkami',
    desc: 'Snadné přeposílání, darování, tisk nebo stahování vstupenek. Plná kontrola nad každou vstupenkou.',
  },
  {
    icon: '🧾',
    title: 'Faktury a transakce',
    desc: 'Automatické stahování faktur, přehled všech transakcí a převodů v jednom místě.',
  },
  {
    icon: '📦',
    title: 'Trvalá databáze',
    desc: 'Vstupenky jsou dostupné kdykoliv a slouží jako trvalá databáze – partner se k nim dostane vždy, když potřebuje.',
  },
]

// ─────────────────────────────────────────────────────────
// Club benefits
// ─────────────────────────────────────────────────────────
const CLUB_BENEFITS = [
  {
    icon: '⏱️',
    title: 'Úspora času',
    desc: 'Konec ruční distribuce vstupenek přes e-mail. Administrátor nastaví pravidla jednou, zbytek běží automaticky.',
  },
  {
    icon: '👥',
    title: 'User friendly pro adminy i partnery',
    desc: 'Intuitivní rozhraní bez nutnosti školení. Partneři spravují své vstupenky samostatně.',
  },
  {
    icon: '💰',
    title: 'Generování dalších příjmů',
    desc: 'Nevyzvednuté čestné a partnerské vstupenky lze automaticky uvolnit do veřejného prodeje a generovat dodatečné tržby.',
  },
  {
    icon: '⚙️',
    title: 'Flexibilní scénáře',
    desc: 'Pracujeme s mnoha variacemi, opcemi a prodejními scénáři přesně dle potřeb klubu – od prioritního přístupu až po komplexní správu celých VIP pater.',
  },
]

// ─────────────────────────────────────────────────────────
// Frozen portal browser mockup
// ─────────────────────────────────────────────────────────
const PORTAL_URL = '/portal-preview/dashboard'

function BrowserMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
      style={{ border: '1px solid rgba(17,0,43,0.12)' }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: '#f0eef8', borderBottom: '1px solid rgba(17,0,43,0.08)' }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <div
          className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{ background: 'white', border: '1px solid rgba(17,0,43,0.1)', color: 'rgba(17,0,43,0.4)', fontFamily: 'monospace' }}
        >
          <span style={{ color: ACCENT, fontSize: 10 }}>🔒</span>
          plg.partners · Partnerský portál
        </div>
      </div>
      {/* Clickable frozen iframe */}
      <div className="relative w-full" style={{ height: 680 }}>
        <iframe
          src={PORTAL_URL}
          title="Partnerský portál"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────
export default function PartnerskyPortalPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #05030f 0%, #0d0a22 45%, #080518 100%)' }}
      >
        {/* Topbar */}
        <motion.nav
          className="relative w-full z-50 flex items-center gap-3 px-6 py-3"
          style={{
            background: 'rgba(5,3,15,0.92)',
            backdropFilter: 'blur(18px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => router.push('/hradec')}
            className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer text-white/50 text-sm font-semibold flex items-center gap-2"
          >
            ← Digitální ekosystém
          </button>
          <span className="text-white/20 font-light shrink-0">/</span>
          <span className="text-sm font-semibold" style={{ color: ACCENT }}>Partnerský portál</span>
        </motion.nav>

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{ right: '8%', top: '15%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`, filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <motion.span {...fade(0.1)} className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
            Produkt
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}
          >
            Partnerský<br />portál
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/55 max-w-xl leading-relaxed"
          >
            Chytré řešení pro správu partnerských, sponzorských a čestných vstupenek –{' '}
            <span className="text-white/85 font-medium">šetří čas, zjednodušuje procesy a generuje další příjmy.</span>
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SEKCE 1 – Pro koho
      ══════════════════════════════════════════════════ */}
      <section id="pro-koho" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div {...iv(0.05)} className="mb-10">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>01</span>
            <h2
              className="text-4xl md:text-5xl font-black text-[#11002B] mt-3 mb-4 leading-none"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}
            >
              Pro koho je portál určen
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {FOR_WHOM.map((item, i) => (
              <motion.div
                key={item.title}
                {...iv(0.05 + i * 0.07)}
                className="rounded-2xl p-5 flex flex-col gap-3 border border-[#11002B]/8 hover:border-[#6366F1]/30 transition-colors"
                style={{ background: i === 0 ? `${ACCENT}07` : undefined }}
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-bold text-[#11002B] text-sm leading-snug" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-xs text-[#3A3342]/55 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SEKCE 2 – Co portál umí (partner pohled)
      ══════════════════════════════════════════════════ */}
      <section id="co-umi" className="py-20" style={{ background: '#faf8ff' }}>
        <div className="max-w-5xl mx-auto px-8">
          <motion.div {...iv(0.05)} className="mb-10">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>02</span>
            <h2
              className="text-4xl md:text-5xl font-black text-[#11002B] mt-3 mb-4 leading-none"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}
            >
              Co portál umí
            </h2>
            <p className="text-lg text-[#3A3342]/55 max-w-xl leading-relaxed">
              Vše, co partner potřebuje ke správě svých vstupenek – bez zbytečných kroků.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNER_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                {...iv(0.05 + i * 0.06)}
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{
                  background: i === 0 ? `linear-gradient(135deg, ${ACCENT}10 0%, ${ACCENT}06 100%)` : 'white',
                  border: `1.5px solid ${i === 0 ? `${ACCENT}30` : 'rgba(17,0,43,0.07)'}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}25` }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-bold text-[#11002B] text-base leading-snug"
                  style={{ fontFamily: "'Panel Sans', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#3A3342]/55 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SEKCE 3 – Co portál přináší klubu
      ══════════════════════════════════════════════════ */}
      <section
        id="pro-klub"
        className="py-20"
        style={{ background: 'linear-gradient(150deg, #05030f 0%, #0d0a22 50%, #080518 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-8">
          <motion.div {...iv(0.05)} className="mb-10">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>03</span>
            <h2
              className="text-4xl md:text-5xl font-black text-white mt-3 mb-4 leading-none"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}
            >
              Co přináší klubu
            </h2>
            <p className="text-lg text-white/45 max-w-xl leading-relaxed">
              Portál není jen nástroj pro partnery – je to aktivum, které šetří čas a generuje příjmy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CLUB_BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                {...iv(0.05 + i * 0.07)}
                className="rounded-2xl p-7 flex gap-5"
                style={{
                  background: i === 2
                    ? `linear-gradient(135deg, ${ACCENT}15 0%, ${ACCENT}08 100%)`
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i === 2 ? `${ACCENT}35` : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}
                >
                  {b.icon}
                </div>
                <div>
                  <h3
                    className="font-bold text-white text-base mb-2 leading-snug"
                    style={{ fontFamily: "'Panel Sans', sans-serif" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SEKCE 4 – Live portal preview
      ══════════════════════════════════════════════════ */}
      <section id="screenshoty" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div {...iv(0.05)} className="mb-10">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>04</span>
            <h2
              className="text-4xl md:text-5xl font-black text-[#11002B] mt-3 mb-4 leading-none"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}
            >
              Živé rozhraní portálu
            </h2>
            <p className="text-lg text-[#3A3342]/50 max-w-lg leading-relaxed">
              Ukázka rozhraní portálu — přesně tak, jak ho vidí partneři.
            </p>
          </motion.div>
          <motion.div {...iv(0.08)}>
            <BrowserMockup />
          </motion.div>
        </div>
      </section>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',        label: 'Úvod' },
          { id: 'pro-koho',    label: 'Pro koho' },
          { id: 'co-umi',      label: 'Co portál umí' },
          { id: 'pro-klub',    label: 'Pro klub' },
          { id: 'screenshoty', label: 'Rozhraní' },
        ]}
      />
    </div>
  )
}
