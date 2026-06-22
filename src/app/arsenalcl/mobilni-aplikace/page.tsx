'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#7C3AED'

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

const HERO_BARS = [
  { label: 'Držení míče', home: 58, away: 42 },
  { label: 'Střely',      home: 7,  away: 4  },
  { label: 'Rohy',        home: 5,  away: 3  },
]

function VenueVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 260 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute', left: 75, top: 10, width: 150, height: 240,
          borderRadius: 28,
          background: 'linear-gradient(160deg, #0f0820 0%, #07041a 100%)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 48, height: 10, background: '#07041a', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, zIndex: 10 }} />
        <div style={{ padding: '18px 12px 12px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 6 }}>LIVE · 67&apos;</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', fontWeight: 700, flex: 1, textAlign: 'right' }}>Kometa</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', fontSize: 16, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif" }}>
                  <motion.span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -10 }} transition={{ delay: 1.5, duration: 0.25 }}>1</motion.span>
                  <motion.span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.25 }}>2</motion.span>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>:</span>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: 'white' }}>0</div>
              </div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', fontWeight: 700, flex: 1 }}>Sparta</div>
            </div>
            <motion.div initial={{ opacity: 0, y: 5, scale: 0.9 }} animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5], scale: [0.9, 1, 1, 0.95] }} transition={{ delay: 1.8, duration: 2, times: [0, 0.1, 0.8, 1] }} style={{ marginTop: 5, background: `${ACCENT}30`, border: `1px solid ${ACCENT}60`, borderRadius: 6, padding: '3px 8px', display: 'inline-block' }}>
              <span style={{ fontSize: 6.5, color: ACCENT, fontWeight: 700 }}>🏒 GÓL! HC Kometa Brno</span>
            </motion.div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {HERO_BARS.map((s, i) => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{s.home}%</span>
                  <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.3)' }}>{s.label}</span>
                  <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{s.away}%</span>
                </div>
                <div style={{ display: 'flex', height: 4, borderRadius: 2, overflow: 'hidden', gap: 1 }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.home}%` }} transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }} style={{ background: ACCENT, borderRadius: '2px 0 0 2px' }} />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.away}%` }} transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '0 2px 2px 0' }} />
                </div>
              </div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} style={{ marginTop: 10 }}>
            <motion.div
              animate={{ boxShadow: [`0 0 0 0 ${ACCENT}70`, `0 0 0 8px ${ACCENT}00`] }}
              transition={{ duration: 1.6, delay: 2.5, repeat: Infinity }}
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #9333ea 100%)`,
                borderRadius: 12,
                padding: '8px 10px',
                textAlign: 'center',
                border: `1px solid rgba(255,255,255,0.15)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}>
              <span style={{ fontSize: 8, fontWeight: 800, color: 'white', letterSpacing: '0.01em' }}>Koupit vstupenku na zápas</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)' }}>→</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

interface SubSection {
  title: string
  desc: string
  bullets: string[]
  image: string
  images?: string[]
  wide?: boolean
  small?: boolean
  large?: boolean
}

const SECTIONS: { label: string; heading: string; subs: SubSection[] }[] = [
  {
    label: 'Onboarding',
    heading: 'První dojem zanecháte jen jednou',
    subs: [
      {
        title: 'Onboarding máte plně v rukou',
        desc: 'Průběh onboardingu je plně konfigurovatelný: úvodní animace, prohlídka aplikace, povolení notifikací, lokalizační služby a výzva k přihlášení nebo registraci. Každou obrazovku lze přizpůsobit brandingu vašeho klubu.',
        bullets: [
          'Úvodní animace nebo video: nastavte atmosféru od první sekundy',
          'Ukažte fanouškům, co v aplikaci najdou',
          'Povolení notifikací: klíčový moment, který posouvá engagement',
          'Výzva k přihlášení: propojte nebo vytvořte fanouškovský profil hned od začátku',
        ],
        image: '/venue-apps/Images.png',
        images: [
          '/venue-apps/onboarding-1.png',
          '/venue-apps/onboarding-2.png',
          '/venue-apps/onboarding-3.png',
        ],
      },
    ],
  },
  {
    label: 'Vstupenky a návštěvnost',
    heading: 'Kompletní ticketingový zážitek, nativně ve vaší aplikaci',
    subs: [
      {
        title: 'Nativní ticketing přímo v aplikaci',
        desc: 'Nejlepší ticketing na trhu, plně nativní ve vaší aplikaci. Celý proces nákupu probíhá přímo v aplikaci včetně nativní mapy sedadel přizpůsobené pro nákup v mobilním telefonu. Fanoušci obdrží digitální vstupenku v aplikaci a kopii e-mailem.',
        bullets: [
          'Celý nákupní proces přímo v aplikaci',
          'Nativní mapa sedadel přizpůsobená pro mobilní nakupování',
          'Digitální verze v aplikaci a kopie e-mailem',
        ],
        image: '/venue-apps/tickets-qr.png',
      },
      {
        title: 'Všechny prodejní scénáře, na které jste zvyklí',
        desc: 'Podporuje každou prodejní fázi, kterou váš klub potřebuje – od partnerských rezervací až po standardní veřejný prodej. Každá fáze má vlastní načasování, ceny a přístupová pravidla.',
        bullets: [
          'Rezervace pro partnery',
          'Prioritní nákup pro vybranou skupinu',
          'Předprodej pro vybranou skupinu',
          'Standardní veřejný prodej',
        ],
        image: '/venue-apps/tickets-presale.png',
      },
      {
        title: 'Užitečné funkce, které zvyšují prodeje',
        desc: 'Funkce navržené pro zvýšení příjmů ze vstupenek a spokojenosti fanoušků.',
        bullets: [
          'Exkluzivní prodej v aplikaci: vybrané zápasy prodávejte jen přes aplikaci',
          'Prodej balíčků: kombinujte zápasy do jednoho balíčku a omezte černý trh',
          'Různé ceny pro každou prodejní fázi: odměňte ty, kdo kupují dříve',
          'Doplňkové služby: přidejte občerstvení nebo parkování přímo ke vstupence',
        ],
        image: '/venue-apps/tickets-cart.png',
      },
      {
        title: 'Darujte a převádějte vstupenky přes aplikaci',
        desc: 'Skutečná revoluce v boji proti překupníkům. Každou vstupenku lze pár kliknutími darovat někomu jinému. Darovaná vstupenka při přesunu mění QR kód, takže vše zůstává bezpečné.',
        bullets: [
          'QR kód se při převodu mění pro plnou bezpečnost a sledovatelnost',
          'Případ 1 (Otevřený): PDF vstupenka i vstupenka v aplikaci generovány současně',
          'Případ 2 (Uzavřený): vstupenka generována pouze pro aplikaci, darování jen aktivním účtům',
          'Pozdní doručení QR: fanoušek koupí vstupenku, QR se zobrazí před akcí',
        ],
        image: '/venue-apps/tickets-donate.png',
      },
      {
        title: 'Digitální permanentka s kompletní docházkou',
        desc: 'Plnohodnotná digitální permanentka s chytrými funkcemi, které zvyšují návštěvnost a generují extra příjmy. Příjmy z uvolněných míst vzrostly o více než 120 %.',
        bullets: [
          'Uvolnění míst zpět do prodeje: vy nastavíte deadline (např. 24 hodin před akcí)',
          'Darování místa jinému fanouškovi: kontrolujete nejzazší čas darování',
          'Kompletní sledování docházky na pár kliknutí.',
          'Převod permanentky, vlastní vzhled, čekací listina a další',
        ],
        image: '/venue-apps/tickets-season.png',
      },
    ],
  },
  {
    label: 'Obsah',
    heading: 'Vše, co fanoušci chtějí vědět, přímo v aplikaci',
    subs: [
      {
        title: 'Zápasy s tabulkami',
        desc: 'Kompletní přehled vašich zápasů včetně aktuální ligové tabulky. API napojení na web, připraveno pro všechny weby od eSports s.r.o. Vlastní weby se snadno propojí standardizovaným API za minimálních nákladů.',
        bullets: [
          'Kalendář plánovaných zápasů',
          'Seznam výsledků odehraných zápasů',
          'Ligové tabulky',
        ],
        image: '/venue-apps/content-matches.png',
        large: true,
      },
      {
        title: 'Každý má svého oblíbence',
        desc: 'Aktuální kádry všech důležitých členů pro každý tým. Příběh hráče, základní data, statistiky aktuální sezóny – fanoušci vše najdou přehledně na jednom místě.',
        bullets: [
          'Přehled klubových a realizačních týmů: vy volíte, které týmy zobrazit',
          'Detail každého hráče včetně statistik',
          'Porovnání hráčů včetně radarového grafu',
        ],
        image: '/venue-apps/content-player.png',
        large: true,
      },
    ],
  },
  {
    label: 'Live statistiky',
    heading: 'Vlastní live centrum zápasu přímo v aplikaci',
    subs: [
      {
        title: 'Live centrum zápasu',
        desc: 'Online zpravodajství ze zápasů s daty v reálném čase, vše přímo v aplikaci. API napojení na externího partnera zaručuje přesné, živé statistiky.',
        bullets: [
          'Online zpravodajství ze zápasů',
          'Přehled důležitých událostí',
          'Statistiky: očekávané góly, střely, fauly',
          'Sestavy domácích vs. hostí',
          'Fotogalerie ze zápasu',
          'Související články',
        ],
        image: '/venue-apps/live-match.png',
        wide: true,
      },
      {
        title: 'Sportovní sázení přímo v centru zápasu',
        desc: 'Propojte svůj affiliatový sázkový web přímo do centra zápasu. Možný model financování přes provizi ze sázek vašich fanoušků.',
        bullets: [
          'Napojení na váš affiliatový sázkový web s živými kurzy',
          'Možný model financování přes provizi',
          'Propojení účtů, takže fanoušci se u bookmaker znovu neregistrují',
        ],
        image: '/venue-apps/live-betting.png',
        wide: true,
      },
      {
        title: 'Maximální fanouškovský engagement',
        desc: 'Ankety pro zapojení fanoušků před zápasem i během něj. Hlasování o hráče zápasu, tipování výsledků nebo střelců.',
        bullets: [
          'Ankety pro zapojení fanoušků před zápasem i během něj',
          'Hlasování o hráče zápasu, tipování výsledku nebo konkrétních střelců',
          'Každý engagement prvek lze propojit s partnerem jako zajímavá forma aktivace partnera',
        ],
        image: '/venue-apps/live-vote.png',
        wide: true,
      },
    ],
  },
  {
    label: 'Marketingové funkce',
    heading: 'Oslovte fanoušky tam, kde skutečně jsou',
    subs: [
      {
        title: 'Reklamní plochy v aplikaci',
        desc: 'Využijte bannerové plochy na viditelných místech v celé aplikaci ke zvýšení návratnosti investic. Pokud banner není potřeba, plocha se automaticky vyplní vaším obsahem.',
        bullets: [
          'Bannerové plochy na viditelných místech v aplikaci',
          'Pohodlné nastavení podmínek zobrazení',
          'Automatické vyplnění obsahem, když žádný banner není aktivní',
        ],
        image: '/venue-apps/marketing-2.png',
        small: true,
      },
      {
        title: 'Personalizované nabídky pro fanoušky',
        desc: 'Slevy, benefity, výhody. Oslovte fanoušky cílenými nabídkami od vás nebo vašich partnerů.',
        bullets: [
          'Nabídky cílené na všechny fanoušky, konkrétní segment nebo konkrétní uživatele',
          'Formát: standardní slevový kód, QR kód nebo čárový kód',
          'Informace o partnerovi a instrukce k uplatnění u každé nabídky',
        ],
        image: '/venue-apps/marketing-3.png',
        small: true,
      },
      {
        title: 'Upřímná zpětná vazba od fanoušků',
        desc: 'Zeptejte se fanoušků na cokoliv. Ke každé otázce připojíme všechny relevantní informace o fanouškovi, takže práce se zpětnou vazbou je ještě jednodušší.',
        bullets: [
          'Ptejte se fanoušků na cokoliv: otevřené otázky nebo kategorie',
          'Kategorie: Aplikace, Občerstvení, Stadion, Vstupenky, Ostatní',
          'Relevantní data fanouška automaticky připojena ke každé odpovědi',
        ],
        image: '/venue-apps/marketing-1.png',
        small: true,
      },
      {
        title: 'Cílené push notifikace',
        desc: 'Novinky, které fanoušci skutečně čtou. Odesílejte push notifikace s doručitelností až 70 %. Přiveďte fanoušky na správné místo – uvnitř i vně aplikace.',
        bullets: [
          'Manuální i automatické notifikace',
          'Cílení notifikací na konkrétní fanouškovské segmenty',
          'Naplánování doručení na správný čas',
          'Testovací odeslání před spuštěním',
          'Deep-link na libovolné místo: prodej, článek, detail zápasu, fanshopu',
        ],
        image: '/venue-apps/marketing-4.png',
        small: true,
      },
    ],
  },
]

const TIERS = [
  {
    name: 'Premium', tag: 'Na míru',
    desc: 'Plně přizpůsobeno pro kluby, které chtějí mít fanouškovský zážitek zcela ve svých rukou.',
    features: [
      'Vlastní branding: barvy, logo, fonty pro každý klub',
      'Kompletní sada funkcí bez omezení',
      'In-app obchod vlastněný klientem',
      'CRM a věrnostní program v ceně',
      'Hlubší integrace a vlastní moduly',
    ],
  },
  {
    name: 'Standard', tag: 'SaaS',
    desc: 'Rychlé spuštění, osvědčený základní produkt pro kluby začínající svou mobilní cestu.',
    features: [
      'White-label s omezenými možnostmi brandingu',
      'Základní funkce: vstupenky, výsledky, novinky, push',
      'Obchody provozované PLG',
      'Sdílená infrastruktura, nižší náklady',
      'Možnost upgradu na Premium kdykoliv',
    ],
  },
]

const MUTATIONS = [
  { icon: '⚽', name: 'Sporty',    desc: 'Kluby a ligy. Live centrum zápasu, fanouškovské profily, permanentky, nativní ticketing.' },
  { icon: '🏟', name: 'Arény',    desc: 'Multifunkční haly. Procházení programu, objevování akcí, cashless a správa sedadel.' },
  { icon: '🎪', name: 'Festivaly', desc: 'Časově omezené akce. Line-up, program, obsah umělců, kontrola přístupu přes QR.' },
  { icon: '🎤', name: 'Umělci',   desc: 'Turné a fanouškovská komunita. Fanshopu, termíny turné, exkluzivní obsah.' },
]

const COMING_SOON = [
  { icon: '🛍', title: 'Nativní fanshop', desc: 'Fanoušci nakupují merch nebo dresy přímo v aplikaci. Jedna platba, jeden účet, jeden pokladní proces – žádné přesměrování do externího obchodu.' },
  { icon: '🎮', title: 'Gamifikace a AI', desc: 'Odznaky, výzvy, personalizovaná doporučení a chytří asistenti. Aplikace se učí, co každého fanouška baví.' },
  { icon: '⭐', title: 'Prémiový obsah', desc: 'Exkluzivní videa, články, zákulisní přístupy a VIP obsah jen pro členy, předplatitele a fanoušky.' },
]

const CLUB_EXAMPLES = [
  {
    country: 'Česko',
    clubs: [
      { name: 'SK Slavia Praha', color: '#C8102E' },
      { name: 'HC Sparta Praha', color: '#E87722' },
      { name: 'HC Bílí Tygři Liberec', color: '#5BA3D9' },
      { name: 'HC Vítkovice Ridera',   color: '#004B9E' },
      { name: 'O2 Arena',        color: '#00A0DF' },
    ],
  },
  {
    country: 'Slovensko',
    clubs: [
      { name: 'ŠK Arsenal ČL Bratislava', color: '#0057A8' },
      { name: 'HC Arsenal ČL Bratislava', color: '#1A4B9D' },
      { name: 'HC Žilina',            color: '#C8102E' },
    ],
  },
]

const NAV_IDS = ['onboarding', 'tickets-attendance', 'content', 'live-stats', 'marketing'] as const

export default function ArsenalCLVenueAppsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #0f071c 100%)' }}
      >
        {/* Topbar breadcrumb */}
        <motion.nav
          className="relative w-full z-50 flex items-center gap-3 px-6 py-3"
          style={{
            background: 'rgba(17,0,43,0.9)',
            backdropFilter: 'blur(18px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => router.push('/arsenalcl')}
            className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer text-white/50 text-sm font-semibold flex items-center gap-2"
          >
            ← Digitální ekosystém
          </button>
          <span className="text-white/20 font-light shrink-0">/</span>
          <span className="text-sm font-semibold" style={{ color: ACCENT }}>Mobilní aplikace</span>
        </motion.nav>

        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{ right: '10%', bottom: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)`, filter: 'blur(40px)' }} />
        <div className="absolute" style={{ left: '-5%', top: '10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0" style={{ paddingTop: 80, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span {...fade(0.1)} className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Produkt 06</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Mobilní<br />aplikace
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              Fanoušek ve vaší kapse.{' '}
              <span className="text-white/85 font-medium">Jedno přihlášení, jeden profil, jeden ekosystém</span>
              {' – '}vstupenky, výsledky, živé přenosy, novinky, statistiky a věrnostní program, vše pohodlně ve vaší mobilní aplikaci.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex-shrink-0">
            <VenueVisual />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="whitespace-nowrap text-5xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={350} /><span className="text-3xl md:text-4xl" style={{ color: ACCENT }}>K</span>
                  <span className="text-xl md:text-2xl font-bold ml-1" style={{ color: ACCENT }}>+</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Vstupenek prodáno přes aplikaci</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="whitespace-nowrap text-5xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={250} /><span className="text-3xl md:text-4xl ml-1" style={{ color: ACCENT }}>M</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Příjmy vygenerované přes aplikaci</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-5xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <span style={{ color: ACCENT }}>+</span><CountUp to={40} />
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: ACCENT }}>%</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Průměrný nárůst návštěvnosti</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-5xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={90} />
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: ACCENT }}>%</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Viditelnost push notifikací</p>
                <p className="text-xs text-white/25 mt-1">vs 15–25 % open rate e-mailů</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURE SECTIONS
      ══════════════════════════════════════════════════ */}
      {SECTIONS.map((group, gi) => {
        const groupBg = gi % 2 === 0 ? '#ffffff' : '#faf8ff'
        return (
          <div key={group.label} style={{ background: groupBg }}>
            <section id={NAV_IDS[gi]} className="pt-20 pb-4">
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

            {group.subs.map((sub, si) => {
              const reversed = si % 2 !== 0
              return (
                <section key={sub.title} className="py-16">
                  <div className="max-w-5xl mx-auto px-8">
                    <motion.div {...iv(0.1)}
                      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-16`}>
                      <div className="flex-1 min-w-0">
                        <div style={{ width: 32, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 18 }} />
                        <h3 className="text-2xl md:text-3xl font-bold text-[#11002B] mb-3 leading-tight"
                          style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                          {sub.title}
                        </h3>
                        <p className="text-base text-[#3A3342]/55 mb-7 leading-relaxed max-w-lg">{sub.desc}</p>
                        <ul className="space-y-3">
                          {sub.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-sm text-[#3A3342]/75 leading-relaxed">
                              <span style={{ color: ACCENT, marginTop: 1, flexShrink: 0, fontWeight: 700 }}>✓</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`flex-shrink-0 flex justify-center ${sub.wide ? 'md:w-[60%]' : 'md:w-[45%]'}`}>
                        {sub.images && sub.images.length > 1 ? (
                          <div className="relative flex items-end justify-center" style={{ height: 480, width: 340 }}>
                            {sub.images.map((src, pi) => {
                              const offsets = [
                                { x: -105, y: 24, rotate: -8, z: 0, scale: 0.88 },
                                { x: 0,    y: 0,  rotate:  0, z: 2, scale: 1    },
                                { x: 105,  y: 24, rotate:  8, z: 0, scale: 0.88 },
                              ]
                              const o = offsets[pi] ?? offsets[1]
                              return (
                                <motion.div
                                  key={src}
                                  {...iv(0.1 + pi * 0.1)}
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    translateX: '-50%',
                                    x: o.x,
                                    y: o.y,
                                    rotate: o.rotate,
                                    scale: o.scale,
                                    zIndex: o.z,
                                    filter: pi !== 1 ? 'brightness(0.75)' : 'none',
                                  }}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={src}
                                    alt={`${sub.title} ${pi + 1}`}
                                    style={{ height: 420, width: 'auto', maxWidth: 195, mixBlendMode: 'multiply' }}
                                    loading="lazy"
                                  />
                                </motion.div>
                              )
                            })}
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={sub.image}
                            alt={sub.title}
                            className="h-auto"
                            style={{ maxHeight: sub.wide ? 840 : sub.small ? 448 : sub.large ? 728 : 560, maxWidth: sub.wide ? 560 : sub.small ? 240 : sub.large ? 390 : 300, width: 'auto', mixBlendMode: 'multiply' }}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </motion.div>
                  </div>
                </section>
              )
            })}
          </div>
        )
      })}

      {/* ══════════════════════════════════════════════════
          TIERS + MUTATIONS + COMING SOON + CLIENTS
      ══════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-8 pb-24">

        {/* Tiers */}
        <motion.section id="pricing" {...iv(0.1)} className="pt-20 mb-20">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Ceník</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-2 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Dvě úrovně, jedna platforma</h2>
          <p className="text-lg text-[#3A3342]/55 mb-10 max-w-xl">Obě úrovně sdílí stejnou infrastrukturu. Vyberte, co vám dnes sedí, a kdykoliv upgradujte.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TIERS.map((tier) => (
              <div key={tier.name} className="rounded-2xl p-7"
                style={{ background: tier.name === 'Premium' ? `linear-gradient(135deg, ${ACCENT}12 0%, ${ACCENT}06 100%)` : 'rgba(17,0,43,0.03)', border: `1.5px solid ${tier.name === 'Premium' ? `${ACCENT}30` : 'rgba(17,0,43,0.08)'}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl font-black text-[#11002B]" style={{ fontFamily: "'Panel Sans', sans-serif" }}>{tier.name}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: tier.name === 'Premium' ? `${ACCENT}18` : 'rgba(17,0,43,0.06)', color: tier.name === 'Premium' ? ACCENT : '#3A3342' }}>{tier.tag}</span>
                </div>
                <p className="text-sm text-[#3A3342]/60 mb-5 leading-relaxed">{tier.desc}</p>
                <ul className="space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#11002B]/80">
                      <span style={{ color: tier.name === 'Premium' ? ACCENT : '#3A3342', marginTop: 1, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Mutations */}
        <motion.section id="verticals" {...iv(0.1)} className="mb-20">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Segmenty</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-2 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Dostupné pro každý segment</h2>
          <p className="text-lg text-[#3A3342]/55 mb-10 max-w-xl">Premium i Standard jsou dostupné ve čtyřech variantách, každá přizpůsobená specifickým potřebám daného klienta.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MUTATIONS.map((m) => (
              <div key={m.name} className="p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#7C3AED]/30 transition-colors">
                <span className="text-3xl mb-3 block">{m.icon}</span>
                <h3 className="font-bold text-[#11002B] text-base mb-1.5">{m.name}</h3>
                <p className="text-xs text-[#3A3342]/55 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Coming soon */}
        <motion.section id="roadmap" {...iv(0.1)} className="mb-20">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Roadmapa</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-2 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Co přichází</h2>
          <p className="text-lg text-[#3A3342]/55 mb-10 max-w-xl">Nové funkce. Větší zážitek. Silnější vztahy s fanoušky.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMING_SOON.map((c) => (
              <div key={c.title} className="p-6 rounded-2xl"
                style={{ background: `${ACCENT}07`, border: `1.5px dashed ${ACCENT}25` }}>
                <span className="text-3xl mb-3 block">{c.icon}</span>
                <h3 className="font-bold text-[#11002B] text-base mb-2">{c.title}</h3>
                <p className="text-sm text-[#3A3342]/55 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Clients */}
        <motion.section id="clients" {...iv(0.1)}>
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Klienti</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-8 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Příklady klientů</h2>
          <div className="space-y-6">
            {CLUB_EXAMPLES.map((group) => (
              <div key={group.country}>
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#3A3342]/35 mb-3">{group.country}</p>
                <div className="flex flex-wrap gap-2.5">
                  {group.clubs.map((e) => (
                    <div key={e.name} className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-colors"
                      style={{ borderColor: `${e.color}40`, background: `${e.color}08` }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
                      <span className="text-sm font-medium text-[#11002B]">{e.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Branded app showcase */}
          <motion.div
            {...iv(0.15)}
            className="mt-14 rounded-3xl border border-[#11002B]/6 bg-[#F8F6FC] px-4 py-8 md:px-8 md:py-10 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold text-[#11002B] mb-1"
                  style={{ fontFamily: "'Panel Sans', sans-serif" }}
                >
                  Jak to vypadá v praxi
                </h3>
                <p className="text-sm text-[#3A3342]/60 max-w-xl">
                  Šest skutečných aplikací postavených na stejné platformě, každá brandovaná tak, aby působila zcela nativně pro svůj klub nebo stánek.
                </p>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3A3342]/45">
                Snímky z produkce
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {[
                { src: '/venue-apps/client-slavia.png', label: 'SK Slavia Praha', tilt: '-4deg' },
                { src: '/venue-apps/client-o2.png', label: 'O2 Arena', tilt: '3deg' },
                { src: '/venue-apps/client-tygri.png', label: 'Bílí Tygři Liberec', tilt: '-6deg' },
                { src: '/venue-apps/client-sparta.png', label: 'HC Sparta Praha', tilt: '4deg' },
                { src: '/venue-apps/client-b4l.png', label: 'Beats for Love', tilt: '-3deg' },
                { src: '/venue-apps/client-arsenalcl.png', label: 'ŠK Arsenal ČL Bratislava', tilt: '5deg' },
              ].map((app, index) => (
                <motion.div
                  key={app.src}
                  {...iv(0.18 + index * 0.04)}
                  className="relative mx-auto"
                  style={{ maxWidth: 260 }}
                >
                  <div
                    className="relative rounded-[2.6rem] border border-black/70 bg-black overflow-hidden shadow-[0_18px_45px_rgba(15,7,28,0.55)]"
                    style={{ transform: `rotate(${app.tilt})`, padding: 6 }}
                  >
                    <div className="relative overflow-hidden rounded-[2rem] bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.src}
                        alt={app.label}
                        loading="lazy"
                        className="block w-full h-auto object-cover"
                        style={{ mixBlendMode: 'normal' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',               label: 'Úvod' },
          { id: 'onboarding',         label: 'Onboarding' },
          { id: 'tickets-attendance', label: 'Vstupenky' },
          { id: 'content',            label: 'Obsah' },
          { id: 'live-stats',         label: 'Live statistiky' },
          { id: 'marketing',          label: 'Marketing' },
          { id: 'pricing',            label: 'Ceník' },
          { id: 'verticals',          label: 'Segmenty' },
          { id: 'roadmap',            label: 'Roadmapa' },
          { id: 'clients',            label: 'Klienti' },
        ]}
      />
    </div>
  )
}
