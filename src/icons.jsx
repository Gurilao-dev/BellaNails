const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const CalendarIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
    <path d="M9.2 15.2l2 2 3.8-3.8" />
  </svg>
)

export const UsersIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8.5" r="3.6" />
    <path d="M2.5 20c0-3.7 2.9-6.3 6.5-6.3s6.5 2.6 6.5 6.3" />
    <path d="M15.2 5.2a3.3 3.3 0 0 1 0 6.4" />
    <path d="M17.6 14.2c2.3.6 3.9 2.8 3.9 5.6" />
  </svg>
)

export const ChartIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="11.5" width="3.8" height="8.5" rx="1" />
    <rect x="10.1" y="4" width="3.8" height="16" rx="1" />
    <rect x="16.2" y="8" width="3.8" height="12" rx="1" />
  </svg>
)

export const HeartPulseIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 20.5s-8-4.7-8-10.8C4 6.9 6.1 4.8 8.6 4.8c1.5 0 2.7.7 3.4 1.9.7-1.2 1.9-1.9 3.4-1.9 2.5 0 4.6 2.1 4.6 4.9 0 6.1-8 10.8-8 10.8z" />
    <path d="M7.6 12h2.3l1.2-2 1.8 4 1.2-2h2.3" />
  </svg>
)

export const ArrowIcon = (p) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5" />
  </svg>
)

/* Coração desenhado à mão (título e frase final) */
export const SketchHeart = (p) => (
  <svg viewBox="0 0 32 30" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 27.5C10.5 23.6 3.2 18 2.6 11.2 2.1 6 5.6 2.6 9.4 2.8c3 .1 5.4 2.4 6.4 5.6 1.2-3.6 4-6 7.3-5.8 4 .3 6.6 4 5.7 8.7-1.2 6.4-7.4 11.3-12.8 16.2" />
    <path d="M15.8 8.4c.2-.9.6-1.8 1.1-2.6" />
  </svg>
)

/* Coração grande com "laço" da frase final */
export const LoopHeart = (p) => (
  <svg viewBox="0 0 40 52" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 33C13 27 4.2 20.5 3.4 12.4 2.8 6.6 6.6 2.6 11 2.9c3.6.3 6.6 3.1 8.2 7.2 1.6-4.5 5.4-7.6 9.6-7.2 4.9.5 7.9 5.3 6.4 11-1.9 7.6-9.6 13.6-14.2 19.1-3.6 4.4-6.6 9.4-9.1 15" />
    <path d="M19.2 10.1c.3-1 .7-2 1.3-2.9" />
  </svg>
)

/* ---------- Tela de planos ---------- */
export const ChevronLeftIcon = (p) => (
  <svg {...base} strokeWidth={1.9} {...p}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

export const CrownIcon = (p) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <path d="M4.5 17.5L3 8.2l5 3.6L12 5.5l4 6.3 5-3.6-1.5 9.3z" />
    <path d="M5 20.5h14" />
    <circle cx="3" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="12" cy="4.6" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="21" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
  </svg>
)

export const BellIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

export const FlameIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
    <path d="M12 2c-.3 1.8-.7 3.3-2 4.6-1.5 1.5-2.8 3.3-2.8 5.6 0 4.1 3.4 7.5 7.6 7.5s7.6-3.4 7.6-7.5c0-4.3-3.2-6.7-5.4-8.8-.9-.9-1.4-1.7-1.6-2.9-.6.8-1.4 1.7-2.3 2.5-1.1 1.1-1.6 2.4-1.6 3.8 0 1.2.6 2.2 1.6 2.8.2.1.4 0 .5-.2.1-.2 0-.4-.1-.5-.7-.7-.9-1.5-.7-2.3.4 1.4 1.6 2.4 3 2.4 1.8 0 3.2-1.4 3.2-3.2 0-1.8-1.3-3.3-2.6-4.6-1.7-1.6-3.3-3.3-3.9-5.2z" />
  </svg>
)

export const CircleCheckIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="10" fill="#f47290" />
    <path d="M8 12.2l2.8 2.8 5.5-5.8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ShieldCheckIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export const CreditCardIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

export const LockIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2.5" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export const CalendarPlusIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
    <path d="M12 12.8v4.4M9.8 15h4.4" />
  </svg>
)

export const GearIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

export const HeartOutlineIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const CameraIcon = (p) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

export const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

export const ChevronDownIcon = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const UtensilsIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 2v20" />
    <path d="M21 2v6a3 3 0 0 1-3 3" />
    <path d="M3 2v6a3 3 0 0 0 6 0V2" />
    <path d="M6 11v11" />
  </svg>
)

export const CalendarHeartIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
    <path d="M12 17.5s-3-1.8-3-4.2a2 2 0 0 1 3-1.7 2 2 0 0 1 3 1.7c0 2.4-3 4.2-3 4.2z" />
  </svg>
)

export const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
)

export const PencilIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
)

export const PlusIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const TrashIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

export const PixIcon = (p) => (
  <svg viewBox="0 0 512 512" fill="currentColor" {...p}>
    <path d="M112.57 391.15l87.56-87.56c8.33-8.33 21.84-8.33 30.17 0l87.56 87.56c27.67 27.67 72.53 27.67 100.2 0l42.45-42.45c6.25-6.25 6.25-16.38 0-22.63l-94.67-94.67c-11.45-11.45-11.45-30.01 0-41.46l94.67-94.67c6.25-6.25 6.25-16.38 0-22.63l-42.45-42.45c-27.67-27.67-72.53-27.67-100.2 0l-87.56 87.56c-8.33 8.33-21.84 8.33-30.17 0l-87.56-87.56c-27.67-27.67-72.53-27.67-100.2 0l-42.45 42.45c-6.25 6.25-6.25 16.38 0 22.63l94.67 94.67c11.45 11.45 11.45 30.01 0 41.46l-94.67 94.67c-6.25 6.25-6.25 16.38 0 22.63l42.45 42.45c27.67 27.67 72.53 27.67 100.2 0z" />
  </svg>
)

export const BanknoteIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
)

export const DebitCardIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <rect x="5" y="13.5" width="3.5" height="2.5" rx="0.5" />
  </svg>
)

export const MessageFastIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8M8 13h5" />
  </svg>
)

export const InfoIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

export const CheckSquareIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" />
    <path d="M7.5 12l3.2 3.2 5.8-6.4" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const MenuIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
)

export const HomeFilledIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
)

export const ShoppingBagIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

export const MoreHorizontalIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="12" r="2" />
  </svg>
)

export const ChevronRightIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const CoinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.6 0-2.5 1-2.5 2s1 1.8 2.5 2.2c1.7.5 2.5 1.2 2.5 2.3 0 1.5-1.2 2.5-2.5 2.5-1.3 0-2.2-.6-2.8-1.5" />
    <line x1="12" y1="6" x2="12" y2="7.5" />
    <line x1="12" y1="16.5" x2="12" y2="18" />
  </svg>
)

export const CheckCircleFilledIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12.2l2.8 2.8 5.5-5.8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const CalendarAgendaHeaderIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3.5" y="4" width="17" height="17" rx="3" />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2.2} />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2.2} />
    <line x1="3.5" y1="9" x2="20.5" y2="9" />
    <circle cx="8" cy="13" r="1" fill="currentColor" />
    <circle cx="12" cy="13" r="1" fill="currentColor" />
    <circle cx="16" cy="13" r="1" fill="currentColor" />
    <circle cx="8" cy="17" r="1" fill="currentColor" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
)

export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9.5 9.5c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4.3.7.8 1.8.8 1.9.1.2 0 .4-.1.6l-.4.5c-.1.1-.3.2-.1.5.3.6.8 1.3 1.5 1.8.7.6 1.4.9 2 .9.3 0 .4-.2.6-.4l.5-.5c.2-.2.4-.2.6-.1.2.1 1.3.6 1.5.7.2.1.3.2.3.4 0 .6-.4 1.4-1.3 1.5-.7.1-1.8.2-3.8-.8-2-1.1-3.3-3.1-3.4-3.3-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.7.8-1.9z" fill="currentColor" stroke="none" />
  </svg>
)

export const FilterSlidersIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="10" y1="18" x2="14" y2="18" />
  </svg>
)

export const UsersFilledIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)

export const ShoppingBagFilledIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zm10 8a4 4 0 0 1-8 0H6a6 6 0 0 0 12 0h-2z" />
  </svg>
)

export const FinanceBarsIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="11" width="4.2" height="10" rx="2.1" />
    <rect x="9.9" y="3.8" width="4.2" height="17.2" rx="2.1" />
    <rect x="16.8" y="7.5" width="4.2" height="13.5" rx="2.1" />
  </svg>
)

export const TrophyIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 4h16v7a8 8 0 0 1-16 0V4z" />
    <path d="M12 15v4" />
    <path d="M8 21h8" strokeWidth={2.2} />
  </svg>
)

export const ExchangeArrowsIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="4.5" strokeWidth={1.8} />
    <path d="M6.5 9h9m0 0l-2.6-2.6M15.5 9l-2.6 2.6" />
    <path d="M17.5 15h-9m0 0l2.6-2.6M8.5 15l2.6 2.6" />
  </svg>
)

export const CalendarBadgeIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="17" rx="3.5" />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2.2} />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2.2} />
    <line x1="3" y1="9" x2="21" y2="9" />
    <circle cx="8.5" cy="13.5" r="1.1" fill="currentColor" />
    <circle cx="12" cy="13.5" r="1.1" fill="currentColor" />
    <circle cx="16" cy="13.5" r="1.1" fill="currentColor" />
    <circle cx="8.5" cy="17" r="1.1" fill="currentColor" />
    <circle cx="12" cy="17" r="1.1" fill="currentColor" />
  </svg>
)

export const TrendingUpIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

export const ChevronLeftSmallIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

export const ChevronRightSmallIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const SettingsGearIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

export const MapPinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const PhoneIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const CalendarStarIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="17" rx="3.5" />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2.2} />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2.2} />
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M12 11.8l.8 1.6 1.8.3-1.3 1.3.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.3 1.8-.3z" fill="currentColor" stroke="none" />
  </svg>
)

export const WalletBadgeIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="3.5" />
    <path d="M2.5 10h19" />
    <circle cx="16.5" cy="14" r="1.3" fill="currentColor" />
  </svg>
)

export const ServicesBagIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5.5 8.5C5.5 7.4 6.4 6.5 7.5 6.5H16.5C17.6 6.5 18.5 7.4 18.5 8.5L17.8 18.5C17.7 19.9 16.5 21 15.1 21H8.9C7.5 21 6.3 19.9 6.2 18.5L5.5 8.5Z" />
    <path d="M9 6.5V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5V6.5" />
    <path d="M10 10.5C10 11.6 10.9 12.5 12 12.5C13.1 12.5 14 11.6 14 10.5" />
  </svg>
)

export const ServicesBagFilledIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
    <path d="M9 2C7.34 2 6 3.34 6 5V6.5H7.8V5C7.8 3.9 8.7 3 9.8 3H14.2C15.3 3 16.2 3.9 16.2 5V6.5H18V5C18 3.34 16.66 2 15 2H9Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 8C4.95 8 4.5 8.45 4.55 9L5.35 18.5C5.48 20.45 7.1 22 9.05 22H14.95C16.9 22 18.52 20.45 18.65 18.5L19.45 9C19.5 8.45 19.05 8 18.5 8H5.5ZM10 10.5C10 11.6 10.9 12.5 12 12.5C13.1 12.5 14 11.6 14 10.5H16C16 12.71 14.21 14.5 12 14.5C9.79 14.5 8 12.71 8 10.5H10Z" />
  </svg>
)

export const BlossomIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
    <circle cx="12" cy="7" r="3.2" />
    <circle cx="16.5" cy="10.2" r="3.2" />
    <circle cx="14.8" cy="15.8" r="3.2" />
    <circle cx="9.2" cy="15.8" r="3.2" />
    <circle cx="7.5" cy="10.2" r="3.2" />
    <circle cx="12" cy="11.8" r="2" fill="#ffffff" />
  </svg>
)

export const Grid2x2Icon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export const PriceTagIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const HomeOutlineIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
    <path d="M9 21.5V12h6v9.5" />
  </svg>
)

export const PackageIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
)

export const BuildingIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
  </svg>
)

export const SparklesIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M10 2c0 4.2-2.3 6.5-6.5 6.5C7.7 8.5 10 10.8 10 15c0-4.2 2.3-6.5 6.5-6.5C12.3 8.5 10 6.2 10 2z" />
    <path d="M18 13c0 2.2-1.2 3.4-3.4 3.4 2.2 0 3.4 1.2 3.4 3.4 0-2.2 1.2-3.4 3.4-3.4-2.2 0-3.4-1.2-3.4-3.4z" />
    <circle cx="19" cy="5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const MoreVerticalIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
)

export const ClockSmallIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
)

export const CheckSmallIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export const CloseSmallIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export const NailPolishIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 3h6v4H9z" />
    <path d="M6 7h12a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2z" />
    <line x1="12" y1="7" x2="12" y2="11" />
  </svg>
)

export const CalendarTodayIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <circle cx="8" cy="13" r="0.9" fill="currentColor" />
    <circle cx="12" cy="13" r="0.9" fill="currentColor" />
    <circle cx="16" cy="13" r="0.9" fill="currentColor" />
    <circle cx="8" cy="17" r="0.9" fill="currentColor" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    <circle cx="16" cy="17" r="0.9" fill="currentColor" />
  </svg>
)

export const ScaleIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3v18" />
    <path d="M6 7h12" />
    <path d="M6 7l-3 6a3 3 0 0 0 6 0L6 7z" />
    <path d="M18 7l-3 6a3 3 0 0 0 6 0L18 7z" />
    <path d="M8 21h8" />
  </svg>
)

export const CalculatorIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4" y="2" width="16" height="20" rx="3" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="14" x2="16" y2="18" />
    <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" />
  </svg>
)

export const TargetIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

export const LightbulbIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </svg>
)

export const DiamondIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
    <path d="M2 10h20" />
    <path d="M12 21L7.5 10 10 3" />
    <path d="M12 21l4.5-11L14 3" />
  </svg>
)

export const StarOutlineIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export const MenuBarsIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
)

export const DoodleHeart = (p) => (
  <svg viewBox="0 0 52 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 26c-6-4-12-9-12-16 0-5 4-8 8.5-8 3.5 0 6 2 7.5 5 1.5-3 4-5 7.5-5 4.5 0 8.5 3 8.5 8 0 7-7 12-14 17l-6 3" />
    <path d="M28 27c8-2 15 1 22-2" />
  </svg>
)

export const LotusIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 4c-1.5 4-2.5 8.5 0 13 2.5-4.5 1.5-9 0-13z" />
    <path d="M12 17c-3-2-6.5-2.5-9-1 0 4 3 6 9 6s9-2 9-6c-2.5-1.5-6-1-9 1z" />
    <path d="M5.5 14C4.5 9.5 8 5.5 12 4c4 1.5 7.5 5.5 6.5 10" />
  </svg>
)

export const UserOutlineIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="7.5" r="4" />
    <path d="M4 20.5c0-4 3.5-7 8-7s8 3 8 7" />
  </svg>
)

export const TagIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
  </svg>
)

export const ArrowLeftIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

export const StarIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)










