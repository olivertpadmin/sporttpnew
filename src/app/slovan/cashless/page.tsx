'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import SectionNav from '@/components/SectionNav'

const ACCENT      = '#EA580C'
const OPEN_COLOR  = '#0EA5E9'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

function CountUp({ to, prefix = '', suffix = '', duration = 2.4 }: {
  to: number; prefix?: string; suffix?: string; duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const mv = useMotionValue(0)

  useEffect(() => {
    const unsub = mv.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`
    })
    return unsub
  }, [mv, prefix, suffix])

  useEffect(() => {
    if (!isInView) return
    const ctrl = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => ctrl.stop()
  }, [isInView, mv, to, duration])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

function PaymentVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 240 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute"
        style={{
          left: 108, top: 56,
          width: 96, height: 144,
          borderRadius: 14,
          background: 'linear-gradient(160deg, #2a1a40 0%, #160e28 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{
          margin: 10, height: 64, borderRadius: 6,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 3 }}>CELKEM</p>
          <p style={{ color: 'white', fontSize: 19, fontWeight: 900, fontFamily: "'Panel Sans', sans-serif", lineHeight: 1 }}>320 Kč</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4 Q20 12 12 20" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 8 Q17 12 12 16" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 11.5 Q13.5 12 12 12.5" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
      </motion.div>

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            left: 156 - (30 + i * 22),
            top: 102  - (30 + i * 22),
            width:  60 + i * 44,
            height: 60 + i * 44,
            borderColor: `${ACCENT}50`,
          }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.7, 1, 1.15] }}
          transition={{ duration: 1.8, delay: i * 0.35, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, x: -16, rotate: -8 }}
        animate={{ opacity: 1, x: 0, rotate: -14 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        style={{
          position: 'absolute', left: 8, top: 44,
          width: 120, height: 76, borderRadius: 10,
          background: 'linear-gradient(135deg, #1a1a3e 0%, #0f3460 100%)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
          transform: 'rotate(-14deg)',
        }}
      >
        <div style={{
          position: 'absolute', top: 18, left: 14,
          width: 24, height: 18, borderRadius: 3,
          background: 'linear-gradient(135deg, #c8920a 0%, #f0c040 100%)',
        }} />
        <div style={{ position: 'absolute', top: 14, right: 14 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2 Q15 8 8 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 5.5 Q12 8 8 10.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="8" r="1.2" fill="white"/>
          </svg>
        </div>
        <p style={{ position: 'absolute', bottom: 12, left: 14, color: 'rgba(255,255,255,0.4)', fontSize: 6.5, letterSpacing: '0.18em', fontWeight: 600 }}>
          •••• •••• •••• 4821
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.6, type: 'spring', stiffness: 300 }}
        style={{
          position: 'absolute', right: 8, top: 30,
          background: '#22c55e', borderRadius: 999,
          padding: '5px 11px',
          boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
        }}
      >
        <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>✓ Schváleno</span>
      </motion.div>
    </div>
  )
}

const FEATURES = [
  {
    number: '01',
    icon: '🖥️',
    title: 'Správa terminálů',
    desc: 'Během pár sekund přiřadíte libovolný terminál libovolnému prodejci a další můžete přidat kdykoliv i během živé akce. Bez čekání, bez papírování.',
    badge: 'Oproti 1–2 týdnům u konkurence',
  },
  {
    number: '02',
    icon: '🏷️',
    title: 'Katalog a ceny',
    desc: 'Nastavíte produktové katalogy s více ceníky. Různá menu pro různé stánky. A vše znovu využijete i na dalších akcích.',
    badge: 'Na míru pro každý stánek',
  },
  {
    number: '03',
    icon: '⚡',
    title: 'Živé transakce',
    desc: 'Filtrujte podle prodejce, terminálu, času nebo částky. Plný detail o každé platbě: kdo, kdy, kde a za kolik.',
    badge: 'Okamžitá odezva',
  },
  {
    number: '04',
    icon: '📊',
    title: 'Dashboard',
    desc: 'Tržby podle stánků, nejprodávanější produkty i špičky během dne na první pohled. Oddělené pohledy pro prodejce i organizátory.',
    badge: 'Pohledy podle role',
  },
]

const BENEFITS = [
  {
    icon: '📈',
    title: 'Tržby v reálném čase',
    desc: 'Přesně vidíte, co se prodává, na kterém stánku a kdy — živě během akce. Můžete se rozhodovat okamžitě.',
  },
  {
    icon: '🚫',
    title: 'Bez hotovostní logistiky',
    desc: 'Žádné přepočítávání, žádné odvozy do banky, žádné doplňování mincí. Provozní režii spojenou s hotovostí odstraníte úplně.',
  },
  {
    icon: '⚡',
    title: 'Rychlejší obsluha',
    desc: 'Cashless platby jsou rychlejší než práce s hotovostí. Kratší fronty, vyšší průchodnost, spokojenější návštěvníci.',
  },
  {
    icon: '💰',
    title: 'Automatické vyúčtování',
    desc: 'Všechny poplatky se počítají automaticky. Každá strana dostane zaplaceno. Bez ručního párování, prostě to funguje.',
  },
]

const JOURNEY = [
  { step: '01', icon: '📋', title: 'Onboarding',      desc: 'Kontakt s prodejci, registrace a digitální podepisování smluv přes DigiSign.' },
  { step: '02', icon: '⚙️', title: 'Konfigurace',     desc: 'Produkty, ceníky a terminály připravené pro vaši akci.' },
  { step: '03', icon: '👥', title: 'Školení',          desc: 'Váš personál se naučí systém používat. Jsme osobně na místě.' },
  { step: '04', icon: '📦', title: 'Nasazení',         desc: 'Hardware doručíme a nainstalujeme ještě před otevřením areálu.' },
  { step: '05', icon: '🎯', title: 'Live provoz',      desc: 'Po celou dobu vše monitorujeme v reálném čase. Problémy řešíme dřív, než si jich všimnete.' },
  { step: '06', icon: '💰', title: 'Vyúčtování',       desc: 'Automatické výpočty, vygenerované dokumenty, všichni dostanou zaplaceno.' },
]

const INFRA = [
  { icon: '🟢', title: 'Vysoká dostupnost',  desc: 'Enterprise úroveň dostupnosti. Stabilní servery navržené pro kritický provoz.' },
  { icon: '☁️', title: 'Cloud-native',        desc: 'Architektura na Kubernetes navržená pro nápor v momentě, kdy se otevřou brány.' },
  { icon: '🕐', title: 'Podpora 24 / 7',      desc: 'Nepřetržité monitorování a rychlá reakce ve dne v noci, během každé akce.' },
  { icon: '🏟️', title: 'Postaveno pro live', desc: 'Vyvíjí ho tým, který provozuje infrastrukturu pro systémy v národním měřítku.' },
]

export default function SlovanCashlessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>

      {/* Slovan nav */}
      <motion.nav
        data-product-nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-6 py-3"
        style={{ background: 'rgba(10,5,20,0.92)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => router.push('/slovan')}
          className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer text-white/50 text-sm font-semibold flex items-center gap-2"
        >
          ← Digitální ekosystém
        </button>
        <span className="text-white/20 font-light shrink-0">/</span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${ACCENT}20`, color: ACCENT }}>
          Cashless
        </span>
      </motion.nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #1c0a02 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{
          right: '10%', bottom: '5%', width: 480, height: 480, borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}22 0%, transparent 70%)`, filter: 'blur(40px)',
        }} />
        <div className="absolute" style={{
          left: '-5%', top: '10%', width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,55,210,0.18) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Produkt 04
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Cashless
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              Každá transakce ve vašem areálu, řízená jedním chytrým systémem.
              {' '}<span className="text-white/85 font-medium">Vyšší tržby. Méně tření. Kompletní data.</span>
              {' '}Ověřeno na stadionech a festivalech po celé střední Evropě.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <PaymentVisual />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={12} />{' '}
                  <span className="text-4xl" style={{ color: ACCENT }}>M</span>
                  <span className="text-2xl font-bold ml-2 text-white/30">CZK</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Nejvyšší zpracovaný objem na jedné akci</p>
                <p className="text-xs text-white/25 mt-1">Oktagon MMA · Eden Arena, Praha</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <span style={{ color: ACCENT }}>+</span><CountUp to={70} />
                  <span className="text-4xl font-bold" style={{ color: ACCENT }}>%</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Nárůst doplňkových tržeb</p>
                <p className="text-xs text-white/25 mt-1">Po nasazení cashless řešení</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <span style={{ color: ACCENT }}>+</span><CountUp to={125} />
                  <span className="text-4xl font-bold" style={{ color: ACCENT }}>%</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Celkový růst prodeje</p>
                <p className="text-xs text-white/25 mt-1">Napříč akcemi s cashless řešením</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* THE OPPORTUNITY */}
      <motion.section id="opportunity" {...fade(0.1)} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
            Příležitost
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#11002B] mt-4 mb-4 leading-none"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Ticketing máte pod kontrolou.<br />
            <span style={{ color: ACCENT }}>Kdo ale řídí vaše F&amp;B?</span>
          </h2>
          <p className="text-base text-[#3A3342]/55 max-w-xl mb-14 leading-relaxed">
            Organizátoři mají plný přehled o prodeji vstupenek, ale jídlo, nápoje a merchandise obvykle zajišťují externí dodavatelé bez sdílení dat. Tato mezera stojí peníze i cenné informace.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl p-7 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #bbf7d0' }}>
              <div className="text-3xl mb-4">🎟️</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: '#16a34a20', color: '#16a34a' }}>
                ✓ Plná kontrola
              </div>
              <h3 className="text-lg font-black text-[#11002B] mb-1" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Ticketing
              </h3>
              <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                Data patří vám. Pravidla nastavujete vy. Každá vstupenka, každý fanoušek, vše máte pod kontrolou.
              </p>
            </div>

            <div className="rounded-2xl p-7 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', border: '1px solid #fed7aa' }}>
              <div className="text-3xl mb-4">🍔</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: `${ACCENT}20`, color: ACCENT }}>
                ⚠ Externí dodavatelé
              </div>
              <h3 className="text-lg font-black text-[#11002B] mb-1" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Food &amp; Beverage
              </h3>
              <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                Tržby spravuje externí partner. Vy vidíte maximálně souhrny, pokud vůbec. Žádná data po jednotlivých stáncích.
              </p>
            </div>

            <div className="rounded-2xl p-7 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', border: '1px solid #fed7aa' }}>
              <div className="text-3xl mb-4">👕</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: `${ACCENT}20`, color: ACCENT }}>
                ⚠ Externí dodavatelé
              </div>
              <h3 className="text-lg font-black text-[#11002B] mb-1" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Merchandise
              </h3>
              <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                Stejný příběh. Spravuje to třetí strana a ve vašem reportingu je to prakticky neviditelné.
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-8 flex items-start gap-5"
            style={{ background: `linear-gradient(135deg, ${ACCENT}10 0%, ${ACCENT}05 100%)`, border: `1px solid ${ACCENT}30` }}>
            <div className="text-3xl shrink-0">💡</div>
            <div>
              <p className="text-base font-bold text-[#11002B] leading-relaxed">
                PLG Cashless dává organizátorům stejnou úroveň přehledu a kontroly nad F&amp;B a merchandise, jakou už mají nad ticketingem — včetně dat v reálném čase, automatického vyúčtování a bezhotovostního provozu.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* PAYMENT METHODS */}
      <motion.section id="payment-methods" {...fade(0.1)} className="py-24" style={{ background: '#F8F6FC' }}>
        <div className="max-w-5xl mx-auto px-8">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
            Platební možnosti
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-14 leading-tight"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Tři způsoby platby
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-8" style={{ border: `2px solid ${OPEN_COLOR}20` }}>
              <div className="text-4xl mb-6">💳</div>
              <div className="text-xs font-bold tracking-[0.18em] uppercase mb-2" style={{ color: OPEN_COLOR }}>
                Platba kartou
              </div>
              <h3 className="text-2xl font-black text-[#11002B] mb-3" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Open-loop
              </h3>
              <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                Standardní Visa nebo Mastercard. Návštěvníci platí přímo kartou, kterou už mají u sebe. Bez registrace, bez dobíjení. Vyžaduje konektivitu.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 relative" style={{ border: `2px solid ${ACCENT}30` }}>
              <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: `${ACCENT}15`, color: ACCENT }}>
                Nejoblíbenější
              </div>
              <div className="text-4xl mb-6">🏷️</div>
              <div className="text-xs font-bold tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>
                Dobití kreditu
              </div>
              <h3 className="text-2xl font-black text-[#11002B] mb-3" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Closed-loop
              </h3>
              <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                Návštěvníci si před akcí nebo na místě nahrají kredit na PLG náramek nebo kartu. Nevyužitý zůstatek je plně vratný. Získáte maximum dat i kontroly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8" style={{ border: '2px solid #e5e7eb' }}>
              <div className="text-4xl mb-6">💵</div>
              <div className="text-xs font-bold tracking-[0.18em] uppercase mb-2 text-[#9CA3AF]">
                Pouze doplňkově
              </div>
              <h3 className="text-2xl font-black text-[#11002B] mb-3" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Cash
              </h3>
              <p className="text-sm text-[#3A3342]/60 leading-relaxed">
                Přijímá se pouze pro složení depozitu. Jako hlavní platební metoda se nedoporučuje, protože popírá smysl cashless řešení.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FESTIVALS vs ARENAS */}
      <motion.section id="venue-types" {...fade(0.1)} className="py-24" style={{ background: '#F8F6FC' }}>
        <div className="max-w-5xl mx-auto px-8">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
            Doporučení
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-4 leading-tight"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Jaká kombinace<br />je pro vás správná?
          </h2>
          <p className="text-sm text-[#3A3342]/55 mb-14 max-w-lg">
            Stejná platforma, jen jinak nastavená podle publika a typu venue.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-8" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🎪</div>
                <div>
                  <h3 className="text-xl font-black text-[#11002B]" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Festivaly</h3>
                  <p className="text-xs text-[#3A3342]/50">Jednorázové i vícedenní akce</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${OPEN_COLOR}12` }}>
                  <span className="text-sm font-semibold text-[#11002B]">Open-loop</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${OPEN_COLOR}25`, color: OPEN_COLOR }}>Primární</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${ACCENT}12` }}>
                  <span className="text-sm font-semibold text-[#11002B]">Closed-loop</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${ACCENT}25`, color: ACCENT }}>Sekundární</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#f3f4f6' }}>
                  <span className="text-sm font-semibold text-[#3A3342]/40">Cash</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Nedoporučeno</span>
                </div>
              </div>
              <p className="text-xs text-[#3A3342]/50 leading-relaxed">
                Kombinace closed-loop a open-loop zajišťuje plnou kontrolu nad cashflow a eliminuje šedou ekonomiku v areálu.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🏟️</div>
                <div>
                  <h3 className="text-xl font-black text-[#11002B]" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Arény</h3>
                  <p className="text-xs text-[#3A3342]/50">Stadiony a stálé venue</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${OPEN_COLOR}12` }}>
                  <span className="text-sm font-semibold text-[#11002B]">Open-loop</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${OPEN_COLOR}20`, color: OPEN_COLOR }}>Primární</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${ACCENT}12` }}>
                  <span className="text-sm font-semibold text-[#11002B]">Closed-loop</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${ACCENT}25`, color: ACCENT }}>Doplňková</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#f3f4f6' }}>
                  <span className="text-sm font-semibold text-[#3A3342]/40">Cash</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Pouze omezeně</span>
                </div>
              </div>
              <p className="text-xs text-[#3A3342]/50 leading-relaxed">
                Návštěvníci očekávají platbu kartou. Stabilní infrastruktura dělá z open-loop přirozenou hlavní volbu pro stálé provozy.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* KEY BENEFITS */}
      <motion.section id="benefits" {...fade(0.1)} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
            Proč to funguje
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-14 leading-tight"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Co se změní,<br />když přejdete na cashless
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="flex gap-5 p-7 rounded-2xl items-start group transition-all"
                style={{ border: '1px solid #f0eef8', background: i % 2 === 0 ? '#FAFAFA' : 'white' }}>
                <div className="text-3xl shrink-0 mt-0.5">{b.icon}</div>
                <div>
                  <h3 className="font-black text-[#11002B] mb-2 text-base"
                    style={{ fontFamily: "'Panel Sans', sans-serif" }}>{b.title}</h3>
                  <p className="text-sm text-[#3A3342]/60 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PLATFORM FEATURES */}
      <motion.section id="platform" {...fade(0.1)} className="py-24"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #1c0a02 100%)' }}>
        <div className="max-w-5xl mx-auto px-8">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
            Platforma
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-14 leading-tight"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Navrženo podle toho,<br />jak akce skutečně fungují
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl p-7 relative"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-start justify-between mb-5">
                  <span className="text-5xl font-black leading-none"
                    style={{ color: `${ACCENT}30`, fontFamily: "'Panel Sans', sans-serif" }}>
                    {f.number}
                  </span>
                  <span className="text-2xl">{f.icon}</span>
                </div>
                <h3 className="text-xl font-black text-white mb-2"
                  style={{ fontFamily: "'Panel Sans', sans-serif" }}>{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{f.desc}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${ACCENT}15`, color: ACCENT }}>
                  {f.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* THE JOURNEY */}
      <motion.section id="journey" {...fade(0.1)} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
            Od smlouvy k živé akci
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-5 leading-tight"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Dostaneme vás<br />od nuly až do live provozu
          </h2>
          <p className="text-sm text-[#3A3342]/55 mb-16 max-w-lg">
            Nedodáváme jen software, provedeme vás celým procesem. Každou akcí od začátku do konce.
          </p>

          <div className="hidden md:block">
            <div className="relative mb-8">
              <div className="absolute top-6 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }} />
              <div className="grid grid-cols-6 gap-2 relative">
                {JOURNEY.map((j) => (
                  <div key={j.step} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10 font-black text-white text-sm"
                      style={{ background: ACCENT, fontFamily: "'Panel Sans', sans-serif", border: `2px solid ${ACCENT}` }}>
                      {j.step}
                    </div>
                    <span className="text-xl mb-2">{j.icon}</span>
                    <h4 className="text-xs font-black text-[#11002B] mb-1"
                      style={{ fontFamily: "'Panel Sans', sans-serif" }}>{j.title}</h4>
                    <p className="text-xs text-[#3A3342]/50 leading-relaxed">{j.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden space-y-0">
            {JOURNEY.map((j, i) => (
              <div key={j.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0"
                    style={{ background: ACCENT, fontFamily: "'Panel Sans', sans-serif" }}>
                    {j.step}
                  </div>
                  {i < JOURNEY.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: `${ACCENT}30`, minHeight: 32 }} />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{j.icon}</span>
                    <h4 className="font-black text-[#11002B] text-sm"
                      style={{ fontFamily: "'Panel Sans', sans-serif" }}>{j.title}</h4>
                  </div>
                  <p className="text-sm text-[#3A3342]/55 leading-relaxed">{j.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* INFRASTRUCTURE */}
      <motion.section id="infrastructure" {...fade(0.1)} className="py-24" style={{ background: '#F8F6FC' }}>
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
                Infrastruktura
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-5 leading-tight"
                style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Enterprise úroveň.<br />Postaveno pro<br />
                <span style={{ color: ACCENT }}>živé akce.</span>
              </h2>
              <p className="text-sm text-[#3A3342]/55 leading-relaxed">
                Za řešením stojí infrastrukturní know-how mediální skupiny, která provozovala jedny z největších webových platforem ve střední Evropě. Když se otevřou brány a najednou přijdou tisíce transakcí, držíme tempo bez zaváhání.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {INFRA.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e5e7eb' }}>
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h4 className="font-black text-[#11002B] text-sm mb-1.5"
                    style={{ fontFamily: "'Panel Sans', sans-serif" }}>{item.title}</h4>
                  <p className="text-xs text-[#3A3342]/55 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',            label: 'Hero' },
          { id: 'opportunity',     label: 'Příležitost' },
          { id: 'payment-methods', label: 'Platební metody' },
          { id: 'venue-types',     label: 'Festivaly vs arény' },
          { id: 'benefits',        label: 'Klíčové přínosy' },
          { id: 'platform',        label: 'Funkce platformy' },
          { id: 'journey',         label: 'Celá cesta' },
          { id: 'infrastructure',  label: 'Infrastruktura' },
        ]}
      />

    </div>
  )
}
