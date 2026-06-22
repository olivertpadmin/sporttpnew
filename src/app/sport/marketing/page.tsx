'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#10B981'

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// Animated counter (supports decimal multiplier for M/K formatting)
// ─────────────────────────────────────────────────────────
function CountUp({
  to,
  decimals = 0,
  suffix = '',
  duration = 2.2,
}: {
  to: number
  decimals?: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)

  useEffect(() => {
    const unsub = mv.on('change', (v) => {
      if (ref.current)
        ref.current.textContent = `${v.toFixed(decimals).replace('.', ',')}${suffix}`
    })
    return unsub
  }, [mv, decimals, suffix])

  useEffect(() => {
    if (!isInView) return
    const ctrl = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => ctrl.stop()
  }, [isInView, mv, to, duration])

  return (
    <span ref={ref}>
      {(0).toFixed(decimals).replace('.', ',')}
      {suffix}
    </span>
  )
}

// ─────────────────────────────────────────────────────────
// Shared card component
// ─────────────────────────────────────────────────────────
function Card({
  title,
  children,
  accent = ACCENT,
  highlight = false,
}: {
  title: string
  children: React.ReactNode
  accent?: string
  highlight?: boolean
}) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{
        background: highlight ? `${accent}0d` : 'rgba(17,0,43,0.03)',
        border: `1.5px solid ${highlight ? `${accent}30` : 'rgba(17,0,43,0.08)'}`,
      }}
    >
      <div style={{ width: 28, height: 3, background: accent, borderRadius: 2 }} />
      <h4
        className="text-base font-bold text-[#0f0028] leading-snug"
        style={{ fontFamily: "'Panel Sans', sans-serif" }}
      >
        {title}
      </h4>
      <div className="text-sm text-[#3A3342]/60 leading-relaxed">{children}</div>
    </div>
  )
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-[#3A3342]/70 leading-relaxed">
      <span style={{ color: ACCENT, flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✓</span>
      <span>{children}</span>
    </li>
  )
}

// ─────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────
function Section({
  id,
  label,
  heading,
  perex,
  children,
  dark = false,
}: {
  id: string
  label: string
  heading: string
  perex: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className="py-20"
      style={{ background: dark ? 'linear-gradient(150deg, #0a0018 0%, #1a0840 50%, #0f0530 100%)' : undefined }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <motion.div {...iv(0.05)} className="mb-10">
          <span
            className="text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: dark ? ACCENT : ACCENT }}
          >
            {label}
          </span>
          <h2
            className={`text-4xl md:text-5xl font-black mt-3 mb-4 leading-none ${dark ? 'text-white' : 'text-[#0f0028]'}`}
            style={{ fontFamily: "'Panel Sans', sans-serif" }}
          >
            {heading}
          </h2>
          <p className={`text-lg max-w-2xl leading-relaxed ${dark ? 'text-white/50' : 'text-[#3A3342]/55'}`}>
            {perex}
          </p>
        </motion.div>
        {children}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// Social media table data
// ─────────────────────────────────────────────────────────
const SOCIAL_ROWS = [
  { label: 'Oznámení nových akcí',                   goout: true,  tp: true  },
  { label: 'Týdenní tipy na akce',                   goout: true,  tp: true  },
  { label: 'Měsíční tipy na akce',                   goout: 'dle žánrů', tp: true },
  { label: 'Fun facts a příběhy z uměleckého zákulisí', goout: true, tp: false },
  { label: 'Spuštění předprodeje u velkých akcí',    goout: false, tp: true  },
  { label: 'Nejlepší momenty z koncertů a zápasů',   goout: false, tp: true  },
  { label: 'Novinky z kulturního a sportovního světa', goout: false, tp: true },
  { label: 'Tematické a sezónní tipy',               goout: true,  tp: false },
  { label: 'Kulturní horoskop',                      goout: true,  tp: false },
]

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────
export default function SportMarketingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F5F0FF]">

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0a0018 0%, #1a0840 45%, #0f0530 100%)' }}
      >
        {/* Topbar */}
        <motion.nav
          className="relative w-full z-50 flex items-center gap-3 px-6 py-3"
          style={{
            background: 'rgba(10,0,28,0.92)',
            backdropFilter: 'blur(18px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => router.push('/sport')}
            className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer text-white/50 text-sm font-semibold flex items-center gap-2"
          >
            ← Digitální ekosystém
          </button>
          <span className="text-white/20 font-light shrink-0">/</span>
          <span className="text-sm font-semibold" style={{ color: ACCENT }}>Marketingová podpora</span>
        </motion.nav>

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{ right: '5%', top: '20%', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 70%)`, filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Marketingová podpora
            </span>
            <h1
              className="text-6xl md:text-8xl mt-4 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}
            >
              360°<br />marketingový<br />servis
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/50 max-w-xl leading-relaxed mb-0"
          >
            Od úvodní konzultace až po závěrečný report.{' '}
            <span className="text-white/80 font-medium">
              Máme k dispozici unikátní data napříč kategoriemi a žánry
            </span>
            , která nám umožňují přesně zacílit to správné publikum.
          </motion.p>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative z-10 mt-14 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: 8.5,  decimals: 1, suffix: 'M', label: 'měsíčních návštěv webů\nTicketportal a GoOut' },
                { value: 1.7,  decimals: 1, suffix: 'M', label: 'aktivních odběratelů\nnewsletterů' },
                { value: 250,  decimals: 0, suffix: 'K', label: 'sledujících\nna sociálních sítích' },
                { value: 70,   decimals: 0, suffix: 'K', label: 'zalistovaných\nakcí' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="py-10 px-0 md:px-10"
                  style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : undefined }}
                >
                  <div
                    className="text-5xl md:text-6xl font-black text-white leading-none"
                    style={{ fontFamily: "'Panel Sans', sans-serif" }}
                  >
                    <CountUp to={s.value} decimals={s.decimals} />
                    <span style={{ color: ACCENT }}>{s.suffix}</span>
                  </div>
                  <p className="text-sm font-semibold text-white/40 mt-3 whitespace-pre-line leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── NEWSLETTERY ── */}
      <Section
        id="newslettery"
        label="Produkt 01"
        heading="Newslettery"
        perex="Pravidelně rozesíláme různé typy newsletterů, do kterých můžeme zařadit i vaši akci a dostat ji tak do e-mailových schránek tisíců kulturních a sportovních fanoušků."
      >
        <motion.div {...iv(0.1)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Záruka efektivního zásahu" highlight>
            <ul className="space-y-2 mt-1">
              <Check>Nejlepší doručitelnost na trhu</Check>
              <Check>Více než 3 750 000 aktivních kontaktů</Check>
              <Check>Segmentace dle lokality, kategorie, žánru i konkrétních umělců</Check>
              <Check>Stabilně nadprůměrný open rate</Check>
            </ul>
          </Card>
          <Card title="Pravidelné měsíční newslettery">
            <p>Každý měsíc rozesíláme seznam kulturních a sportovních tipů v různých žánrech a kategoriích. Tyto newslettery jdou na celou naši databázi kontaktů.</p>
          </Card>
          <Card title="Tematické newslettery">
            <p>Rozesíláme je při příležitosti svátků a důležitých událostí, v závislosti na sezóně, kapelních turné, filmových premiérách apod. Segmentované pro konkrétní skupiny kontaktů.</p>
          </Card>
          <Card title="Personalizované newslettery">
            <p>V případě zájmu připravíme personalizovaný, segmentovaný newsletter přesně na míru vaší akci a cílové skupině.</p>
          </Card>
        </motion.div>
      </Section>

      {/* ── SOCIÁLNÍ SÍTĚ ── */}
      <Section
        id="socialni-site"
        label="Produkt 02"
        heading="Sociální sítě"
        perex="Vaši akci organicky zařadíme na sociální sítě GoOut a Ticketportal, které dohromady sleduje přes 250 000 uživatelů."
        dark
      >
        <motion.div {...iv(0.1)}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_140px_140px] px-6 py-4"
              style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">Typ postu</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-center" style={{ color: `${ACCENT}cc` }}>GoOut</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-center text-white/30">Ticketportal</span>
            </div>
            {SOCIAL_ROWS.map((row, i) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_140px_140px] px-6 py-4 items-center"
                style={{
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  borderBottom: i < SOCIAL_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                }}
              >
                <span className="text-sm text-white/60">{row.label}</span>
                <span className="text-center">
                  {row.goout === true
                    ? <span style={{ color: ACCENT }} className="font-bold text-base">✓</span>
                    : row.goout
                    ? <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${ACCENT}18`, color: ACCENT }}>{row.goout}</span>
                    : <span className="text-white/15 text-base">—</span>
                  }
                </span>
                <span className="text-center">
                  {row.tp
                    ? <span className="text-white/50 font-bold text-base">✓</span>
                    : <span className="text-white/15 text-base">—</span>
                  }
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ── OBSAH NA MÍRU ── */}
      <Section
        id="obsah-na-miru"
        label="Produkt 03"
        heading="Obsah na míru"
        perex="Máme k dispozici vlastní kreativní a produkční tým. Umíme vytvořit obsah speciálně na míru podle vašeho zadání."
      >
        <motion.div {...iv(0.1)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Personalizovaný obsah na sociálních sítích" highlight>
            <ul className="space-y-2 mt-1">
              <Check>Příspěvek na Instagram či Facebook</Check>
              <Check>Video pozvánka, IG reel, carousel</Check>
              <Check>Real-time content přímo z akce</Check>
              <Check>Soutěž s vstupenkami</Check>
            </ul>
          </Card>
          <Card title="Naše publikum">
            <ul className="space-y-2 mt-1">
              <Check>Silné organické publikum díky dlouhodobé obsahové strategii</Check>
              <Check>Zásah napříč věkovými skupinami</Check>
              <Check>Kreativita s virálním potenciálem</Check>
              <Check>Přes 250 000 uživatelů na sítích, průměrný dosah 1 500 000 uživatelů měsíčně</Check>
            </ul>
          </Card>
          <Card title="Hotový produkt využijte dle svého přání">
            <p>Výsledný produkt vám předáme a dále ho použijete dle libosti – na vašem webu, sociálních sítích nebo propagačních materiálech.</p>
          </Card>
          <Card title="Naše zásady">
            <ul className="space-y-2 mt-1">
              <Check>Fotografie a video tvoříme in-house na profesionální úrovni</Check>
              <Check>Přirozeně propojujeme váš brand s naším obsahem</Check>
              <Check>Poradíme si s jakýmkoliv brandem v oblasti kultury a sportu</Check>
            </ul>
          </Card>
        </motion.div>
      </Section>

      {/* ── MĚŘÍCÍ KÓDY ── */}
      <Section
        id="merici-kody"
        label="Produkt 04"
        heading="Měřící kódy"
        perex="V našem systému máte možnost vytvářet vlastní skripty pro konverze a remarketing. Různé druhy měřících kódů vám rádi pomůžeme nastavit."
        dark
      >
        <motion.div {...iv(0.1)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded-2xl p-6"
            style={{
              background: `${ACCENT}0a`,
              border: `1.5px solid ${ACCENT}25`,
            }}
          >
            <div style={{ width: 28, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 16 }} />
            <h4 className="text-base font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Konverzní kódy
            </h4>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Spouští se automaticky na děkovací stránce po dokončení objednávky. Sbírají data o dokončených nákupech.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Google Analytics', 'Google Ads', 'Meta Pixel', 'Sklik (Seznam)'].map((s) => (
                <span
                  key={s}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1.5px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ width: 28, height: 3, background: 'rgba(255,255,255,0.25)', borderRadius: 2, marginBottom: 16 }} />
            <h4 className="text-base font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Remarketingové kódy
            </h4>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Spouští se automaticky v případě, kdy zákazník nedokončí nákup. Sbírají data o projeveném zájmu o akci.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <span style={{ color: ACCENT, flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✓</span>
                <span>Automatické spuštění při opuštění košíku</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <span style={{ color: ACCENT, flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✓</span>
                <span>Data o projeveném zájmu o konkrétní akci</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </Section>

      {/* ── ONLINE KAMPANĚ ── */}
      <Section
        id="online-kampane"
        label="Produkt 05"
        heading="Online kampaně"
        perex="Kromě standardních metod jako remarketing nebo využití sociálních sítí nabízíme i nadstandardní tvorbu kampaní na míru vašeho konkrétního zadání."
      >
        <motion.div {...iv(0.1)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Kampaň na míru" highlight>
            <p className="mb-3">Máme vlastní Performance Marketing tým. Online kampaně připravujeme a optimalizujeme pro všechny platformy:</p>
            <div className="flex flex-wrap gap-2">
              {['Meta (Facebook, Instagram)', 'Google', 'Sklik (Seznam.cz)', 'TikTok'].map((p) => (
                <span
                  key={p}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
                >
                  {p}
                </span>
              ))}
            </div>
          </Card>
          <Card title="Kompletní servis od začátku do konce">
            <ul className="space-y-2 mt-1">
              <Check>Od technického nastavení až po vizuální stránku</Check>
              <Check>Příprava kampaňové kreativy a copy</Check>
              <Check>Nastavení a časová optimalizace</Check>
              <Check>Závěrečné vyhodnocení</Check>
            </ul>
          </Card>
          <Card title="Data v první řadě">
            <ul className="space-y-2 mt-1">
              <Check>Řídíme se daty z prodejů a vlastními analytickými nástroji</Check>
              <Check>Informace o chování zákazníků</Check>
              <Check>Součástí týmu jsou profesionální datoví analytici</Check>
            </ul>
          </Card>
          <Card title="Detailní kampaňový report">
            <ul className="space-y-2 mt-1">
              <Check>Automatizovaný Looker Studio report</Check>
              <Check>Detailní komentář marketingového specialisty</Check>
              <Check>Doporučení do dalších kampaní</Check>
              <Check>Screenshoty všech marketingových aktivit</Check>
            </ul>
          </Card>
        </motion.div>
      </Section>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',           label: 'Úvod' },
          { id: 'newslettery',    label: 'Newslettery' },
          { id: 'socialni-site',  label: 'Sociální sítě' },
          { id: 'obsah-na-miru',  label: 'Obsah na míru' },
          { id: 'merici-kody',    label: 'Měřící kódy' },
          { id: 'online-kampane', label: 'Online kampaně' },
        ]}
      />
    </div>
  )
}
