import handImg from '../assets/checkout-hand.jpg'
import calendar3dImg from '../assets/calendar-3d.png'
import {
  ChevronLeftIcon,
  CrownIcon,
  SketchHeart,
  CalendarIcon,
  UsersIcon,
  ChartIcon,
  BellIcon,
  FlameIcon,
  CircleCheckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  LockIcon,
  ArrowIcon,
} from '../icons.jsx'
import './Plans.css'

const quickFeatures = [
  { id: 'agenda', Icon: CalendarIcon, line1: 'Agenda', line2: 'online 24h' },
  { id: 'clientes', Icon: UsersIcon, line1: 'Clientes', line2: 'ilimitados' },
  { id: 'relatorios', Icon: ChartIcon, line1: 'Relatórios', line2: 'financeiros' },
  { id: 'lembretes', Icon: BellIcon, line1: 'Lembretes', line2: 'automáticos' },
]

const planFeatures = [
  'Agenda online com agendamento 24h',
  'Clientes ilimitados',
  'Lembretes automáticos (WhatsApp/SMS)',
  'Histórico completo de atendimentos',
  'Relatórios financeiros e de serviços',
  'Divulgação do seu link de agendamento',
  'Suporte prioritário',
  'Atualizações e novas funcionalidades',
]

const guarantees = [
  { id: 'cancel', Icon: ShieldCheckIcon, line1: 'Cancele', line2: 'quando quiser' },
  { id: 'pay', Icon: CreditCardIcon, line1: 'Pagamento', line2: 'seguro e confiável' },
  { id: 'secure', Icon: LockIcon, line1: 'Seus dados', line2: 'sempre protegidos' },
]

export default function Plans({ onBack, onContinue }) {
  return (
    <main className="screen checkout-screen">
      {/* Imagem da mão com unhas ao fundo no topo direito */}
      <img
        src={handImg}
        alt="Unhas com esmaltação rosa e glitter"
        className="checkout-bg-hand"
        aria-hidden="true"
      />

      {/* Header com voltar e logo centralizado */}
      <header className="checkout-header">
        <button
          id="checkout-back-button"
          className="checkout-back"
          type="button"
          onClick={onBack}
          aria-label="Voltar"
        >
          <ChevronLeftIcon />
        </button>

        <div className="checkout-logo">
          <span className="logo-name">Bella Nails</span>
          <span className="logo-sub">STUDIO DE UNHAS</span>
        </div>
      </header>

      {/* Tag Plano Profissional */}
      <div className="checkout-plan-tag">
        <CrownIcon className="tag-crown" />
        <span>PLANO PROFISSIONAL</span>
      </div>

      {/* Título principal */}
      <h1 className="checkout-title">
        <span>Tenha tudo o que</span>
        <span>você precisa para</span>
        <span>gerenciar seu salão</span>
      </h1>

      {/* Texto de apoio com coração desenhado à mão */}
      <div className="checkout-lead-wrap">
        <p className="checkout-lead">
          <span>Assine o Bella Nails e organize sua agenda,</span>
          <span>atenda mais clientes e faça seu negócio</span>
          <span>crescer de forma profissional.</span>
        </p>
        <SketchHeart className="checkout-lead-heart" aria-hidden="true" />
      </div>

      {/* Grid de 4 recursos rápidos */}
      <section className="quick-grid" aria-label="Recursos inclusos">
        {quickFeatures.map(({ id, Icon, line1, line2 }) => (
          <div key={id} className="quick-item">
            <div className="quick-icon-box">
              <Icon className="quick-icon" />
            </div>
            <span className="quick-l1">{line1}</span>
            <span className="quick-l2">{line2}</span>
          </div>
        ))}
      </section>

      {/* Card principal do Plano Profissional */}
      <section className="checkout-card" id="plan-profissional-card">
        {/* Badge Recomendado com chama */}
        <div className="checkout-card-badge">
          <FlameIcon className="badge-flame" />
          <span>Recomendado</span>
        </div>

        {/* Topo do card: ícone coroa + título + subtítulo */}
        <div className="card-top">
          <div className="card-crown-box">
            <CrownIcon className="card-crown-icon" />
          </div>
          <div className="card-titles">
            <h2 className="card-name">Plano Profissional</h2>
            <p className="card-desc">
              Tudo que você precisa para crescer
              <br />o seu salão, em um só lugar.
            </p>
          </div>
        </div>

        {/* Preço e Calendário 3D decorativo */}
        <div className="card-price-row">
          <div className="card-price">
            <span className="price-curr">R$</span>
            <span className="price-num"> 79</span>
            <span className="price-unit">/mês</span>
          </div>

          <div className="card-3d-wrap">
            <img
              src={calendar3dImg}
              alt="Calendário 3D"
              className="calendar-3d-img"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Lista de 8 benefícios com checks em círculo */}
        <ul className="card-feature-list">
          {planFeatures.map((feat) => (
            <li key={feat} className="card-feature-item">
              <CircleCheckIcon className="card-check-icon" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Bloco de confiança / garantias (3 colunas) */}
      <section className="guarantees-row" aria-label="Garantias e segurança">
        {guarantees.map(({ id, Icon, line1, line2 }) => (
          <div key={id} className="guarantee-item">
            <Icon className="guarantee-icon" />
            <strong className="guarantee-l1">{line1}</strong>
            <span className="guarantee-l2">{line2}</span>
          </div>
        ))}
      </section>

      {/* Botão de pagamento */}
      <button
        id="checkout-pay-button"
        className="cta checkout-cta"
        type="button"
        onClick={onContinue}
      >
        <span>Continuar para o pagamento</span>
        <ArrowIcon className="cta-arrow" />
      </button>

      {/* Rodapé de segurança */}
      <footer className="checkout-footer">
        <div className="footer-lock-row">
          <LockIcon className="footer-lock-icon" />
          <span>Pagamento processado de forma segura</span>
        </div>
        <p className="footer-sub">Seus dados estão protegidos.</p>
      </footer>
    </main>
  )
}
