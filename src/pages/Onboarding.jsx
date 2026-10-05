import handImg from '../assets/hand.jpg'
import {
  ArrowIcon,
  CalendarPlusIcon,
  ChartIcon,
  GearIcon,
  HeartOutlineIcon,
  LoopHeart,
  SketchHeart,
  UsersIcon,
} from '../icons.jsx'
import './Onboarding.css'

const steps = [
  { id: 'business', Icon: CalendarPlusIcon, text: 'Configure seu negócio' },
  { id: 'services', Icon: UsersIcon, text: 'Cadastre seus serviços' },
  { id: 'team', Icon: GearIcon, text: 'Defina sua equipe' },
  { id: 'payments', Icon: ChartIcon, text: 'Ative seus pagamentos' },
  {
    id: 'ready',
    Icon: HeartOutlineIcon,
    text: 'Deixe tudo pronto para receber suas clientes',
  },
]

export default function Onboarding({ onStart }) {
  return (
    <main className="screen onboarding-screen">
      {/* Header com logo centralizado (sem botão Pular, conforme solicitado) */}
      <header className="onb-header">
        <div className="onb-logo">
          <span className="logo-name">Bella Nails</span>
          <span className="logo-sub">STUDIO DE UNHAS</span>
        </div>
      </header>

      {/* Título de boas-vindas com coração desenhado à mão */}
      <section className="onb-hero">
        <h1 className="onb-title">
          <span>Seja bem-vinda,</span>
          <span>
            profissional!
            <SketchHeart className="onb-title-heart" aria-hidden="true" />
          </span>
        </h1>

        {/* Texto explicativo em 5 linhas como no design */}
        <p className="onb-lead">
          <span>Agora vamos configurar seu salão</span>
          <span>em poucos passos para que você</span>
          <span>possa começar a atender suas</span>
          <span>clientes com mais organização,</span>
          <span>praticidade e profissionalismo.</span>
        </p>
      </section>

      {/* Lista dos 5 passos em cartões translúcidos com cantos arredondados */}
      <section className="onb-steps-list" aria-label="Etapas de configuração">
        {steps.map(({ id, Icon, text }, i) => (
          <div
            key={id}
            id={`step-${id}`}
            className="onb-step-item"
            style={{ animationDelay: `${0.12 + i * 0.08}s` }}
          >
            <div className="onb-step-icon-wrap">
              <Icon className="onb-step-icon" />
            </div>
            <span className="onb-step-text">{text}</span>
          </div>
        ))}
      </section>

      {/* Foto da mão esmaltada de fundo com degradê suave */}
      <img
        src={handImg}
        alt="Unhas amendoadas com esmaltação rosé"
        className="onb-hand-bg"
        aria-hidden="true"
      />

      {/* Frase inspiracional com corações */}
      <div className="onb-quote">
        <LoopHeart className="onb-loop-heart" aria-hidden="true" />
        <p>
          <span className="oq1">Mais que unhas,</span>
          <span className="oq2">realizando sonhos</span>
          <span className="oq3">
            com você.
            <SketchHeart className="onb-small-heart" aria-hidden="true" />
          </span>
        </p>
      </div>

      {/* Botão de ação (sem as bolinhas de paginação, conforme solicitado) */}
      <button
        id="start-config-button"
        className="cta onb-cta"
        type="button"
        onClick={onStart}
      >
        <span>Começar configuração</span>
        <ArrowIcon className="cta-arrow" />
      </button>
    </main>
  )
}
