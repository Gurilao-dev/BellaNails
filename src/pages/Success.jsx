import { useEffect, useState } from 'react'
import handImg from '../assets/hand.jpg'
import {
  ArrowIcon,
  CheckIcon,
  CrownIcon,
  LoopHeart,
  SketchHeart,
} from '../icons.jsx'
import './Success.css'

/* Partículas de confete posicionadas exatamente como no design */
const confettiItems = [
  { id: 1, type: 'stick', color: '#c42054', x: -68, y: -48, rot: -35, w: 3, h: 14, delay: 0.05 },
  { id: 2, type: 'dot', color: '#e84878', x: -52, y: -74, rot: 0, w: 5, h: 5, delay: 0.1 },
  { id: 3, type: 'stick', color: '#f28da7', x: -30, y: -82, rot: 25, w: 2.5, h: 12, delay: 0.15 },
  { id: 4, type: 'stick', color: '#e03a6a', x: 2, y: -86, rot: -10, w: 3, h: 14, delay: 0.08 },
  { id: 5, type: 'dot', color: '#c42054', x: 28, y: -76, rot: 0, w: 4.5, h: 4.5, delay: 0.12 },
  { id: 6, type: 'stick', color: '#f07195', x: 55, y: -68, rot: 40, w: 3, h: 15, delay: 0.18 },
  { id: 7, type: 'stick', color: '#a81442', x: -82, y: -16, rot: 55, w: 3, h: 13, delay: 0.2 },
  { id: 8, type: 'dot', color: '#f7a4bc', x: -85, y: 16, rot: 0, w: 5, h: 5, delay: 0.22 },
  { id: 9, type: 'stick', color: '#c42054', x: -70, y: 38, rot: -45, w: 2.5, h: 11, delay: 0.14 },
  { id: 10, type: 'dot', color: '#e03a6a', x: 78, y: -20, rot: 0, w: 4, h: 4, delay: 0.16 },
  { id: 11, type: 'stick', color: '#c42054', x: 84, y: 6, rot: -60, w: 3, h: 16, delay: 0.1 },
  { id: 12, type: 'stick', color: '#f28da7', x: 74, y: 34, rot: 30, w: 2.5, h: 12, delay: 0.25 },
  { id: 13, type: 'dot', color: '#f485a2', x: -38, y: -96, rot: 0, w: 4, h: 4, delay: 0.28 },
  { id: 14, type: 'stick', color: '#e84878', x: 42, y: -92, rot: -20, w: 2.5, h: 13, delay: 0.22 },
]

const features = [
  'Agenda liberada',
  'Todas as funcionalidades',
  'Suporte prioritário',
  'Pronto para receber suas clientes!',
]

export default function Success({ onContinue }) {
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCelebrate(true), 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="screen success-screen">
      {/* Selo central comemorativo de confirmação com círculos e confetes */}
      <div className={`success-badge-wrap ${celebrate ? 'pop-active' : ''}`}>
        {/* Confetes explodindo ao redor */}
        <div className="confetti-container" aria-hidden="true">
          {confettiItems.map((c) => (
            <span
              key={c.id}
              className={`confetti-item confetti-${c.type}`}
              style={{
                '--cx': `${c.x}px`,
                '--cy': `${c.y}px`,
                '--rot': `${c.rot}deg`,
                '--w': `${c.w}px`,
                '--h': `${c.h}px`,
                '--color': c.color,
                '--delay': `${c.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Anéis concêntricos de pulso e brilho */}
        <div className="badge-halo halo-3" />
        <div className="badge-halo halo-2" />
        <div className="badge-halo halo-1" />

        {/* Círculo central carmim com o check branco */}
        <div className="badge-circle">
          <CheckIcon className="badge-check-icon" />
        </div>
      </div>

      {/* Título */}
      <h1 className="success-title">
        <span>Pagamento</span>
        <span>confirmado!</span>
      </h1>

      {/* Subtítulo explicativo */}
      <p className="success-subtitle">
        <span>Sua assinatura foi ativada com sucesso</span>
        <span>e seu salão já está pronto para ser</span>
        <span>configurado.</span>
      </p>

      {/* Card de resumo do Plano Profissional Ativo */}
      <section className="success-card" id="plan-summary-card">
        <div className="sc-header">
          <div className="sc-crown-box">
            <CrownIcon className="sc-crown-icon" />
          </div>

          <div className="sc-titles">
            <h2 className="sc-plan-name">Plano Profissional</h2>
            <p className="sc-plan-price">R$ 79,00/mês</p>
          </div>

          <span className="sc-status-badge">Ativo</span>
        </div>

        <ul className="sc-feature-list">
          {features.map((feat, i) => (
            <li
              key={feat}
              className="sc-feature-item"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              <CheckIcon className="sc-check-icon" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Botão de continuação para configuração */}
      <button
        id="continue-config-button"
        className="cta success-cta"
        type="button"
        onClick={onContinue}
      >
        <span>Continuar para configuração</span>
        <ArrowIcon className="cta-arrow" />
      </button>

      {/* Seção inferior com foto da mão à direita e frase inspiracional à esquerda */}
      <div className="success-bottom">
        <img
          src={handImg}
          alt="Unhas esmaltadas em fundo suave"
          className="success-bottom-hand"
          aria-hidden="true"
        />

        <div className="success-quote-wrap">
          <LoopHeart className="success-loop-heart" aria-hidden="true" />

          {/* Risquinhos de brilho acima do "Agora" */}
          <div className="quote-sparks" aria-hidden="true">
            <span className="spark s1" />
            <span className="spark s2" />
            <span className="spark s3" />
          </div>

          <p className="success-quote">
            <span className="sq1">Agora é só</span>
            <span className="sq2">começar a transformar</span>
            <span className="sq3">
              seu sonho em resultados!
              <SketchHeart className="sq-small-heart" aria-hidden="true" />
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}
