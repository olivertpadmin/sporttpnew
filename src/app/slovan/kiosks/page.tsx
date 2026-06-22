'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#2563EB'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

function KioskVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 260 }}>

      {/* Kiosk terminal body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute', left: 90, top: 10,
          width: 100, height: 190,
          borderRadius: '12px 12px 4px 4px',
          background: 'linear-gradient(160deg, #0a1530 0%, #050e22 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'visible',
        }}
      >
        {/* Screen */}
        <div style={{
          margin: '8px 8px 0',
          height: 132,
          borderRadius: '6px 6px 0 0',
          background: 'linear-gradient(135deg, #0f1f3d 0%, #0a1428 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '7px 7px',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: 5, color: `${ACCENT}`, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 3 }}>
            VYBERTE VSTUPENKY
          </div>
          <div style={{ fontSize: 6, fontWeight: 800, color: 'white', fontFamily: "'Panel Sans', sans-serif", marginBottom: 2, lineHeight: 1.25 }}>
            Sparta Praha<br/>vs Slavia Praha
          </div>
          <div style={{ fontSize: 5, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Sektor A · 990 Kč</div>

          {/* Ticket counter */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 5, padding: '3px 5px',
          }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Ks</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>−</div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ fontSize: 10, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif", width: 12, textAlign: 'center' }}
              >
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                >
                  2
                </motion.span>
              </motion.div>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: 'white', fontWeight: 700 }}>+</div>
            </div>
          </div>
        </div>

        {/* Card reader slot */}
        <div style={{
          margin: '0 16px',
          height: 28,
          borderRadius: 4,
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.5, delay: 1.8, repeat: Infinity, ease: 'easeOut' }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT }}
          />
          <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>PŘILOŽTE KARTU</span>
        </div>

        {/* Base / stand */}
        <div style={{
          position: 'absolute', bottom: -10, left: -10, right: -10, height: 14,
          background: 'linear-gradient(160deg, #0d1d3d 0%, #07111f 100%)',
          borderRadius: '0 0 8px 8px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: 'none',
        }} />
      </motion.div>

      {/* Ticket printing out */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 56, opacity: 1 }}
        transition={{ duration: 0.7, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 114, top: 194,
          width: 52,
          background: '#f8f5e4',
          borderRadius: '0 0 4px 4px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          style={{ padding: '4px 5px' }}
        >
          <div style={{ fontSize: 4.5, fontWeight: 700, color: '#3a2000', marginBottom: 2, letterSpacing: '0.1em' }}>VAŠE VSTUPENKA</div>
          <div style={{ display: 'flex', gap: 1 }}>
            {[2,3,1,2,3,1,2,2,3,1,2].map((w, i) => (
              <div key={i} style={{ width: w, height: 10, background: '#2a1a00', borderRadius: 0.5 }} />
            ))}
          </div>
          <div style={{ fontSize: 4, color: '#8a6020', marginTop: 2 }}>×2 DOSPĚLÝ</div>
        </motion.div>
      </motion.div>

      {/* Card tap approved badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 2.1, type: 'spring', stiffness: 300 }}
        style={{
          position: 'absolute', left: 162, top: 118,
          background: '#16a34a', borderRadius: 999,
          padding: '4px 10px',
          boxShadow: '0 4px 16px rgba(22,163,74,0.4)',
        }}
      >
        <span style={{ color: 'white', fontSize: 9, fontWeight: 700 }}>✓ Zaplaceno</span>
      </motion.div>

    </div>
  )
}

const STEPS_TICKETING = [
  { step: '01', title: 'Procházení a výběr', desc: 'Návštěvníci procházejí dostupné akce a vybírají vstupenky přímo na dotykové obrazovce kiosku.' },
  { step: '02', title: 'Výběr míst', desc: 'Interaktivní mapa míst umožní zákazníkům zvolit přesnou pozici, stejně jako na webu.' },
  { step: '03', title: 'Platba', desc: 'Platba kartou na integrovaném terminálu. Rychle, bezkontaktně, bez práce s hotovostí.' },
  { step: '04', title: 'Tisk nebo digitálně', desc: 'Vstupenka se vytiskne na místě nebo odešle do mobilu, zákazník si vybere.' },
]

const STEPS_CASHLESS = [
  { step: '01', title: 'Procházení nabídky', desc: 'Návštěvník si na dotykové obrazovce kiosku prohlédne nabídku jídla a nápojů, bez nutnosti komunikace s obsluhou.' },
  { step: '02', title: 'Sestavení objednávky', desc: 'Přidejte položky, zvolte množství a upravte objednávku podle potřeby. Objednávka jde rovnou do kuchyně nebo na bar.' },
  { step: '03', title: 'Platba náramkem', desc: 'Přiložte cashless náramek nebo eventovou kartu k NFC čtečce a zaplaťte okamžitě ze svého zůstatku.' },
  { step: '04', title: 'Vyzvednutí', desc: 'Potvrzení objednávky se vytiskne nebo zobrazí na displeji. Návštěvník si ji vyzvedne u výdejního místa, jakmile je připravená.' },
]

const USE_CASES = [
  { icon: '🏟', title: 'Venue a arény', desc: 'Snižte tlak na pokladny díky samoobslužným terminálům, které jsou k dispozici neustále.' },
  { icon: '🎵', title: 'Vstupy na festivaly', desc: 'Last-minute návštěvníci mohou nakoupit a vyzvednout bez zapojení obsluhy.' },
  { icon: '🛍', title: 'Retail lokace', desc: 'Nasaďte kiosky v obchodních centrech a partnerských místech a rozšiřte dosah prodeje.' },
]

const SPECS = [
  { label: 'Displej', value: '21,5" kapacitní dotykový displej 1080×1920' },
  { label: 'Procesor', value: 'Čtyřjádrový ARM 2,0 GHz' },
  { label: 'Paměť', value: '4 GB RAM · 64 GB ROM' },
  { label: 'Operační systém', value: 'Android 11' },
  { label: 'Platby', value: 'NFC · čipová karta · bezkontaktní čtečka' },
  { label: 'Skener', value: '1D/2D modul čárových kódů' },
  { label: 'Tiskárna', value: '80mm termotiskárna' },
  { label: 'Instalace', value: 'Volně stojící provedení (stacionární nebo na kolečkách)' },
]

function HowItWorksTabs() {
  const [tab, setTab] = useState<'ticketing' | 'cashless'>('ticketing')
  const steps = tab === 'ticketing' ? STEPS_TICKETING : STEPS_CASHLESS
  return (
    <div>
      <div className="flex gap-2 mb-6">
        {(['ticketing', 'cashless'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
            style={{
              background: tab === t ? ACCENT : `${ACCENT}12`,
              color: tab === t ? 'white' : ACCENT,
            }}
          >
            {t === 'ticketing' ? '🎟 Ticketing' : '💳 Cashless'}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-5 p-5 rounded-2xl bg-[#F8F6FC] items-start">
            <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
              style={{ background: `${ACCENT}18`, color: ACCENT, fontFamily: "'Panel Sans', sans-serif" }}>
              {s.step}
            </div>
            <div>
              <h3 className="font-bold text-[#11002B] mb-1">{s.title}</h3>
              <p className="text-sm text-[#3A3342]/60 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SlovanKiosksPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>

      {/* Slovan nav */}
      <motion.nav
        data-product-nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center gap-2 px-8 h-14 text-sm font-medium"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <button
          onClick={() => router.push('/slovan')}
          className="flex items-center gap-1.5 transition-colors hover:opacity-70"
          style={{ color: ACCENT }}
        >
          ← Digitální ekosystém
        </button>
        <span className="text-[#3A3342]/30">/</span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: `${ACCENT}20`, color: ACCENT }}>
          Kiosky
        </span>
      </motion.nav>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #040c1c 100%)' }}
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
          background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Produkt 05
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Kiosky
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              Samoobslužné ticketing terminály pro venue a eventy.{' '}
              <span className="text-white/85 font-medium">Vyberte, zaplaťte a vyzvedněte.</span>
              {' '}Bez obsluhy, bez front.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <KioskVisual />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT }}>
                  24/7
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Vždy k dispozici</p>
                <p className="text-xs text-white/25 mt-1">Bez potřeby obsluhy</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-4xl md:text-5xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  Bez<br/><span style={{ color: ACCENT }}>hotovosti</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Pouze karta a NFC</p>
                <p className="text-xs text-white/25 mt-1">Bezkontaktní platební terminál</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-3xl md:text-4xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  Tisk <span style={{ color: ACCENT }}>+&nbsp;aplikace</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Zákazník si vybere</p>
                <p className="text-xs text-white/25 mt-1">Tisk nebo doručení do mobilu</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Hardware: AF910 ── */}
      <section id="hardware" className="max-w-5xl mx-auto px-8 pt-24 pb-16">
        <motion.div {...fade(0.1)} className="flex flex-col md:flex-row gap-16 items-center">
          {/* Product image */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl" style={{
                background: `radial-gradient(ellipse at 50% 80%, ${ACCENT}22 0%, transparent 70%)`,
                filter: 'blur(24px)',
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.nexgoglobal.com/static/upload/image/20230627/1687856718581698.png"
                alt="AF910 samoobslužný kiosek"
                style={{ width: 220, height: 'auto', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 24px 48px rgba(37,99,235,0.18))' }}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="flex-1">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>Hardware</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              AF910 Kiosk
            </h2>
            <p className="text-base text-[#3A3342]/65 leading-relaxed mb-8 max-w-md">
              Plnohodnotný 21,5&quot; samoobslužný terminál navržený přímo pro ticketing a cashless platby.
              Modulární řešení: doplníte jen ty periferie, které potřebujete (termotiskárna, čtečka čárových kódů, NFC čtečka a terminál pro čipové karty).
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {SPECS.map((s) => (
                <div key={s.label} className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid #11002B10' }}>
                  <span className="text-xs font-semibold text-[#3A3342]/40 uppercase tracking-wide w-28 shrink-0 pt-0.5">{s.label}</span>
                  <span className="text-sm font-medium text-[#11002B]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Apps inside the kiosk ── */}
      <section id="kiosk-apps" className="max-w-5xl mx-auto px-8 pb-20">
        <motion.div {...fade(0.15)}>
          <h2 className="text-2xl font-bold text-[#11002B] mb-2">Aplikace v kiosku</h2>
          <p className="text-sm text-[#3A3342]/55 mb-8 max-w-lg">
            Na každém kiosku běží vedle sebe dvě PLG aplikace, takže si návštěvník vše vyřeší z jednoho terminálu.
          </p>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Ticketing App */}
            <div className="rounded-3xl overflow-hidden border border-[#11002B]/8 bg-[#F8F6FC]">
              <div className="px-7 py-6 flex items-center gap-4" style={{ borderBottom: '1px solid #11002B0A' }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: `${ACCENT}18` }}>
                  🎟
                </div>
                <div>
                  <h3 className="font-bold text-[#11002B] text-base">Ticketing aplikace</h3>
                  <p className="text-xs text-[#3A3342]/50 mt-0.5">Procházení akcí · výběr míst · tisk i mobil</p>
                </div>
              </div>
              <ul className="px-7 py-5 space-y-3 text-sm text-[#3A3342]/65">
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Procházejte akce a vyberte kategorii vstupenky</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Interaktivní mapa míst se stejným UX jako na webu</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Zaplaťte kartou nebo přes NFC a vstupenku vytiskněte nebo pošlete do mobilu</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Podporuje i last-minute nákupy přímo na místě</li>
              </ul>
            </div>

            {/* Cashless App */}
            <div className="rounded-3xl overflow-hidden border border-[#11002B]/8 bg-[#F8F6FC]">
              <div className="px-7 py-6 flex items-center gap-4" style={{ borderBottom: '1px solid #11002B0A' }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: `${ACCENT}18` }}>
                  💳
                </div>
                <div>
                  <h3 className="font-bold text-[#11002B] text-base">Cashless aplikace</h3>
                  <p className="text-xs text-[#3A3342]/50 mt-0.5">Objednávky občerstvení · NFC platba · napojení na cashless</p>
                </div>
              </div>
              <ul className="px-7 py-5 space-y-3 text-sm text-[#3A3342]/65">
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Procházejte nabídku a objednávejte jídlo i nápoje přímo z kiosku</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Objednávka jde rovnou do kuchyně nebo na bar, bez potřeby obsluhy</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Plaťte přiložením cashless náramku nebo eventové karty</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Plně integrované s řešením PLG Cashless</li>
              </ul>
            </div>

          </div>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <motion.section id="how-it-works" {...fade(0.2)} className="mb-14">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Jak to funguje</h2>
          <HowItWorksTabs />
        </motion.section>

        <motion.section id="where-we-deploy" {...fade(0.3)}>
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Kde kiosky nasazujeme</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {USE_CASES.map((u) => (
              <div key={u.title} className="p-6 rounded-2xl border border-[#11002B]/8 hover:border-[#3B82F6]/30 transition-colors text-center">
                <span className="text-4xl mb-3 block">{u.icon}</span>
                <h3 className="font-bold text-[#11002B] mb-2">{u.title}</h3>
                <p className="text-xs text-[#3A3342]/55 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',            label: 'Hero' },
          { id: 'hardware',        label: 'Hardware' },
          { id: 'kiosk-apps',      label: 'Aplikace kiosku' },
          { id: 'how-it-works',    label: 'Jak to funguje' },
          { id: 'where-we-deploy', label: 'Kde nasazujeme' },
        ]}
      />
    </div>
  )
}
