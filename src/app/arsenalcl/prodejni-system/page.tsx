'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

const IS_COLOR = '#0EA5E9'

interface Feature {
  icon: string
  title: string
  description: string
}

interface Module {
  id: string
  label: string
  color: string
  icon: string
  description: string
  features: Feature[]
}

interface Ticket {
  id: string
  title: string
  type: string
  icon: string
  color: string
  image: string
  description: string
}

const MODULES: Module[] = [
  {
    id: 'udalosti',
    label: 'Události & Termíny',
    color: '#F59E0B',
    icon: '📅',
    description: 'Kompletní správa akcí, sezón a termínů prodeje vstupenek.',
    features: [
      { icon: '🗂️', title: 'Sezóny', description: 'Nastavení sezón pro každou databázi – sportovní liga, divadelní série nebo festivalový ročník.' },
      { icon: '🎭', title: 'Akce & Termíny', description: 'Tvorba a editace událostí včetně názvů, popisků a termínů pro zobrazení na www.' },
      { icon: '💰', title: 'Prodej z pokladny', description: 'Obsluha termínu z pohledu prodeje – změny stavů míst, pokladní operace a správa kapacit.' },
      { icon: '📦', title: 'Vstupenkové balíčky', description: 'Nastavení balíčků pro kombinovaný online prodej – skupinové vstupenky, VIP pakety.' },
      { icon: '🔄', title: 'Přeprodej vstupenek', description: 'Nástroj pro přeprodej již zakoupených vstupenek zákazníky s kontrolou oprávnění.' },
    ],
  },
  {
    id: 'abonma',
    label: 'Abonmá & Permanentky',
    color: '#8B5CF6',
    icon: '🎫',
    description: 'Správa předplatného, abonentních cyklů a věrnostních karet pro stálé návštěvníky.',
    features: [
      { icon: '🔁', title: 'Abonentní cykly', description: 'Nastavení a prodej abonentních cyklů – divadelní předplatné, sezónní permanentky.' },
      { icon: '💳', title: 'Věrnostní karta', description: 'Aktivace a prodej věrnostní karty diváka s automatickým uplatňováním slev při nákupu.' },
      { icon: '⭐', title: 'Přednostní nákup', description: 'Vytvoření přednostního přístupu pro permanentkáře nebo kód pro předprodej na www a v aplikaci.' },
      { icon: '📋', title: 'Ceníky pro hlediště', description: 'Evidence ceníků napojených na konkrétní hlediště a abonentní cykly včetně bonusových vstupenek.' },
    ],
  },
  {
    id: 'rezervace',
    label: 'Rezervace & Blokace',
    color: '#10B981',
    icon: '🔒',
    description: 'Přehled a správa rezervací, blokovaných míst a VIP přidělení.',
    features: [
      { icon: '📋', title: 'Seznam rezervací', description: 'Přehled všech rezervací v dané databázi a sezóně s možností editace a tisku.' },
      { icon: '🚫', title: 'Blokovaná místa', description: 'Hromadná správa blokací u jednotlivých termínů – pořadatel, technické zázemí, VIP.' },
      { icon: '👤', title: 'Blokace na jméno', description: 'Seznam blokací míst na konkrétní osobu dle událostí a termínů pro VIP a akreditace.' },
      { icon: '🏟️', title: 'Místa v prodeji', description: 'Real-time přehled míst aktuálně v prodeji u jednotlivých termínů.' },
    ],
  },
  {
    id: 'prodeje',
    label: 'Prodeje & Fakturace',
    color: '#EF4444',
    icon: '🧾',
    description: 'Evidence prodejů, faktur, plateb a storno operací na jednom místě.',
    features: [
      { icon: '📄', title: 'Faktury & Zálohové faktury', description: 'Přehled vystavených faktur a zálohových faktur v dané databázi a sezóně.' },
      { icon: '💳', title: 'Platby kartou', description: 'Vyhledání prodeje dle ID platby kartou na www – propojení s platební bránou.' },
      { icon: '🔍', title: 'Hledat prodeje', description: 'Univerzální vyhledávání napříč rezervacemi, fakturami a prodeji dle evidenčního čísla.' },
      { icon: '❌', title: 'Hromadné storno', description: 'Hromadné vystornování míst dle barkódů – pro odvolané akce nebo chybné prodeje.' },
      { icon: '🖨️', title: 'Generování faktur TP', description: 'Dodatečné vygenerování faktur pro zákazníky, kteří nakoupili na prodejních místech Ticketportal.' },
    ],
  },
  {
    id: 'zakaznici',
    label: 'Zákazníci & CRM',
    color: '#0D9488',
    icon: '👥',
    description: 'Správa zákaznické databáze, typů zákazníků a věrnostních kategorií.',
    features: [
      { icon: '👤', title: 'Seznam zákazníků', description: 'Vytváření a editace zákazníků v systému – osobní údaje, kontakty, historie nákupů.' },
      { icon: '🏷️', title: 'Typy zákazníků', description: 'Nastavení systémových typů zákazníka – student, senior, VIP, pořadatel.' },
      { icon: '📁', title: 'Kategorie zákazníků', description: 'Vlastní kategorizace zákaznické databáze pro cílené akce a slevové skupiny.' },
    ],
  },
  {
    id: 'prehledy',
    label: 'Přehledy & Reporty',
    color: '#F97316',
    icon: '📊',
    description: 'Operativní přehledy pro pořadatele, pokladní i management.',
    features: [
      { icon: '🖨️', title: 'Tisk pořadateli', description: 'Přehled tisků vstupenek pořadatelem u jednotlivých akcí a termínů.' },
      { icon: '🪑', title: 'Nevytištěná prodaná místa', description: 'Přehled prodaných míst, která nebyla fyzicky vytištěna – pro kontrolu doručení.' },
      { icon: '↩️', title: 'Vrácená místa', description: 'Přehled míst vrácených z prodeje pořadateli u jednotlivých událostí.' },
      { icon: '🔑', title: 'Přístupové kódy', description: 'Správa a přehled přístupových kódů pro vstupní kontrolu a turnikety.' },
      { icon: '📑', title: 'Úplný výpis', description: 'Kompletní výpis všech transakcí a pohybů na databázi pro účetní audit.' },
      { icon: '📆', title: 'Denní report', description: 'Automatický denní souhrn prodejů, rezervací a tržeb pro vedení klubu.' },
    ],
  },
  {
    id: 'statistiky',
    label: 'Statistiky & Uzávěrky',
    color: '#6366F1',
    icon: '📈',
    description: 'Kompletní statistické výstupy pro finanční uzávěrky a obchodní analýzy.',
    features: [
      { icon: '💰', title: 'Tržby & Výkazy', description: 'Celkový výkaz tržeb, měsíční výkazy a přehledy prodejů na termíny a akce.' },
      { icon: '🏟️', title: 'Vyprodanost', description: 'Statistika vyprodanosti jednotlivých akcí a termínů – obsazenost hlediště v čase.' },
      { icon: '🎯', title: 'Využití slev', description: 'Analýza uplatněných slev a slevových kategorií pro optimalizaci cenové strategie.' },
      { icon: '📅', title: 'Denní uzávěrka', description: 'Denní uzávěrka pokladny a abonmá pro účetní evidenci.' },
      { icon: '👥', title: 'Statistika zákazníků', description: 'Přehled nákupního chování zákazníků a návštěvnosti po sezónách.' },
      { icon: '🤝', title: 'Zúčtování pro pořadatele', description: 'Přehled provizí, zúčtování a vyúčtování pro pořadatele a provozovatele.' },
    ],
  },
  {
    id: 'administrator',
    label: 'Administrace & Nastavení',
    color: '#64748B',
    icon: '⚙️',
    description: 'Systémová konfigurace, správa uživatelů, oprávnění a šablon vstupenek.',
    features: [
      { icon: '👤', title: 'Uživatelé & Oprávnění', description: 'Správa uživatelských účtů, skupin a granulárních oprávnění pro každou sekci IS.' },
      { icon: '🎟️', title: 'Šablony vstupenek', description: 'Tvorba a správa vizuálních šablon vstupenek – eTicket obrázky, typy a vzhled.' },
      { icon: '🏷️', title: 'Typy slev', description: 'Nastavení slevových typů a kódových slev pro online i pokladní prodej.' },
      { icon: '🚪', title: 'Turniketové zóny', description: 'Konfigurace vstupních zón a propojení s turnikety pro kontrolu vstupu.' },
      { icon: '🏢', title: 'Pořadatel & Provozovatel', description: 'Nastavení pořadatelů, provozovatelů a jejich oprávnění k databázím.' },
      { icon: '🖼️', title: 'Sponzoři', description: 'Správa sponzorů a jejich vizuálního zobrazení na vstupenkách a v systému.' },
    ],
  },
]

const TICKETS: Ticket[] = [
  {
    id: 'aczs',
    title: 'SK Bizoni vs. AC Zubři Sportov',
    type: 'Fotbalový zápas',
    icon: '⚽',
    color: '#F59E0B',
    image: '/media/SkBizoni_ACZS (1)-1.png',
    description: 'eTicket na fotbalové utkání základní části sezóny 2026/2027 na Stadionu Větrov.',
  },
  {
    id: 'fcmn',
    title: 'SK Bizoni vs. FC Medvědi Neveklov',
    type: 'Fotbalový zápas',
    icon: '⚽',
    color: '#10B981',
    image: '/media/SkBizoni_FCMN (1)-1.png',
    description: 'eTicket na fotbalové utkání základní části sezóny 2026/2027 na Stadionu Větrov.',
  },
  {
    id: 'hcbs',
    title: 'SK Bizoni vs. HC Bojovníci Strachov',
    type: 'Hokejový zápas',
    icon: '🏒',
    color: '#6366F1',
    image: '/media/SKBizoni_HCBS (1)-1.png',
    description: 'eTicket na hokejové utkání ve Větrov Aréně.',
  },
  {
    id: 'hcvp',
    title: 'SK Bizoni vs. HC Vlci Podlesí',
    type: 'Hokejový zápas',
    icon: '🏒',
    color: '#BE185D',
    image: '/media/SKBizoni_HCVP (1)-1.png',
    description: 'eTicket na hokejové utkání ve Větrov Aréně.',
  },
  {
    id: 'permice',
    title: 'Permanentka Sezóna 2026/2027',
    type: 'Permanentka',
    icon: '🎫',
    color: '#0D9488',
    image: '/media/SkBizoni_Permice2627 (1)-1.png',
    description: 'Voucher pro aktivaci permanentky na všechny domácí zápasy základní části sezóny 2026/2027.',
  },
  {
    id: 'prohlidka',
    title: 'Prohlídka stadionu',
    type: 'Voucher',
    icon: '🏟️',
    color: '#F97316',
    image: '/media/SkBizoni_Prohlídka (1)-1.png',
    description: 'eTicket na prohlídku zákulisí Fotbalového stadionu Větrov – šatny, tunel, VIP prostory.',
  },
]

export default function ISPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<Ticket | null>(null)

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(150deg, #060D1F 0%, #0B1F52 50%, #1B3F80 100%)' }}
    >
      {/* Textura */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(255,255,255,0.018) 40px, rgba(255,255,255,0.018) 41px)`,
      }} />

      {/* Topbar */}
      <motion.nav
        className="sticky top-0 w-full z-50 flex items-center gap-3 px-6 py-3"
        style={{ background: 'rgba(0,16,43,0.92)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
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
        <span className="text-sm font-semibold" style={{ color: IS_COLOR }}>Prodejní systém</span>
      </motion.nav>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: IS_COLOR }}>
            Informační systém
          </span>
          <h1 className="text-5xl md:text-7xl mt-4 mb-4 leading-none text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Backoffice<br />pro každý detail
          </h1>
          <p className="text-lg text-white/40 max-w-xl leading-relaxed">
            IS22 je centrální správa celého ticketingového provozu – od tvorby události přes prodej a fakturaci až po statistiky a uzávěrky.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { n: '8', l: 'hlavních modulů' },
            { n: '100+', l: 'funkcí systému' },
            { n: '24/7', l: 'online přístup' },
            { n: '1 místo', l: 'pro celý provoz' },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: `${IS_COLOR}15`, border: `1px solid ${IS_COLOR}30` }}>
              <span className="font-bold text-sm" style={{ color: IS_COLOR }}>{s.n}</span>
              <span className="text-white/40 text-sm">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Moduly */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pb-16 flex flex-col gap-6">
        {MODULES.map((mod, i) => (
          <motion.div
            key={mod.id}
            {...iv(0.05 * i)}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: `0 0 80px ${mod.color}10`,
            }}
          >
            <div style={{ height: 4, background: `linear-gradient(90deg, ${mod.color} 0%, ${mod.color}50 60%, transparent 100%)` }} />
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: mod.color }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Modul</span>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl mt-1">{mod.icon}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                    {mod.label}
                  </h2>
                  <p className="text-sm text-white/45 leading-relaxed max-w-2xl">{mod.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {mod.features.map((f) => (
                  <div key={f.title} className="rounded-2xl p-5"
                    style={{ background: `${mod.color}08`, border: `1px solid ${mod.color}20` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{f.icon}</span>
                      <span className="text-sm font-bold" style={{ color: mod.color }}>{f.title}</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── SEKCE ETICKETY ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pb-8">
        <motion.div {...iv(0)}>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: IS_COLOR }}>Ukázky eTicketů</span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl text-white mt-4 mb-2" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Výstupy systému
          </h2>
          <p className="text-sm text-white/40 max-w-xl mb-8">
            Přehled typů vstupenek a voucherů generovaných systémem – fotbalové a hokejové zápasy, permanentky i doplňkové služby.
          </p>
        </motion.div>
      </div>

      {/* Grid vstupenek */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TICKETS.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              {...iv(0.05 * i)}
              className="rounded-3xl overflow-hidden cursor-pointer group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: `0 0 60px ${ticket.color}10`,
              }}
              onClick={() => setSelected(ticket)}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ height: 4, background: `linear-gradient(90deg, ${ticket.color} 0%, ${ticket.color}40 70%, transparent 100%)` }} />
              <div className="relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ticket.image} alt={ticket.title} className="w-full object-contain" style={{ maxHeight: 280 }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <span className="text-white font-semibold text-sm px-4 py-2 rounded-full"
                    style={{ background: `${ticket.color}cc`, border: `1px solid ${ticket.color}` }}>
                    🔍 Zobrazit detail
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{ticket.icon}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: ticket.color }}>
                    {ticket.type}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug mb-1" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  {ticket.title}
                </h3>
                <p className="text-xs text-white/35">{ticket.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
            style={{ background: '#0a1628', border: `1px solid ${selected.color}40` }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ height: 4, background: `linear-gradient(90deg, ${selected.color} 0%, ${selected.color}40 100%)` }} />
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: selected.color }}>
                    {selected.icon} {selected.type}
                  </span>
                  <h2 className="text-lg font-bold text-white mt-0.5" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                    {selected.title}
                  </h2>
                </div>
                <button onClick={() => setSelected(null)}
                  className="text-white/40 hover:text-white text-2xl font-light cursor-pointer transition-colors">
                  ×
                </button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selected.image} alt={selected.title} className="w-full rounded-xl object-contain" style={{ maxHeight: '70vh' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
