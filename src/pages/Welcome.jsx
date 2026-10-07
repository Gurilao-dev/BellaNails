import handImg from '../assets/hand.jpg'
import {
  CalendarIcon,
  UsersIcon,
  ChartIcon,
  HeartPulseIcon,
  ArrowIcon,
  SketchHeart,
  LoopHeart,
} from '../icons.jsx'

const features = [
  { id: 'agenda', Icon: CalendarIcon, title: 'Agenda online', text: 'com lembretes automáticos' },
  { id: 'clientes', Icon: UsersIcon, title: 'Gestão de clientes', text: 'com histórico completo' },
  { id: 'financeiro', Icon: ChartIcon, title: 'Controle financeiro', text: 'simples e intuitivo' },
  { id: 'divulgacao', Icon: HeartPulseIcon, title: 'Divulgação e mais clientes', text: 'para o seu negócio' },
]

/* Espaço flexível: cresce proporcionalmente quando a tela é mais alta */
const Gap = ({ name }) => <div className={`gap gap-${name}`} aria-hidden="true" />

export default function Welcome({ onSubscribe, onLogin, onViewClient }) {
  return (
    <main className="screen">
      <Gap name="top" />

      <header className="header">
        <div className="logo">
          <span className="logo-name">Bella Nails</span>
          <span className="logo-sub">Studio de unhas</span>
        </div>
      </header>

      <Gap name="title" />

      <section className="hero">
        <h1 className="title">
          <span>Transforme seu</span>
          <span>talento em um</span>
          <span>negócio ainda</span>
          <span>
            mais profissional
            <SketchHeart className="title-heart" />
          </span>
        </h1>

        <Gap name="lead" />

        <p className="lead">
          <span>Assine o sistema Bella Nails e tenha</span>
          <span>tudo o que você precisa para</span>
          <span>organizar sua agenda, encantar</span>
          <span>suas clientes e fazer seu salão crescer.</span>
        </p>
      </section>

      <Gap name="card" />

      <section className="middle">
        <img className="hand" src={handImg} alt="Mão com unhas amendoadas em tom nude rosado" />

        <ul className="features">
          {features.map(({ id, Icon, title, text }) => (
            <li key={id} id={`feature-${id}`} className="feature">
              <Icon className="feature-icon" />
              <div className="feature-text">
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="quote">
        <LoopHeart className="quote-heart" />
        <p>
          <span className="q1">Mais que unhas,</span>
          <span className="q2">um negócio de sucesso</span>
          <span className="q3">
            feito com propósito.
            <SketchHeart className="quote-small-heart" />
          </span>
        </p>
      </div>

      <Gap name="cta" />

      <button id="subscribe-button" className="cta" type="button" onClick={onSubscribe}>
        <span>Assinar agora</span>
        <ArrowIcon className="cta-arrow" />
      </button>

      {onLogin && (
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: '#841b31',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
            marginTop: 8,
            marginBottom: 4,
            textDecoration: 'underline',
          }}
          onClick={onLogin}
        >
          Já sou cadastrada • Entrar com E-mail e Senha
        </button>
      )}

      <button
        id="btn-view-client-page"
        type="button"
        className="welcome-client-link"
        onClick={onViewClient}
      >
        <span>Ver página da Cliente (Agendamento) 💅 →</span>
      </button>

      <Gap name="bottom" />
    </main>
  )
}
