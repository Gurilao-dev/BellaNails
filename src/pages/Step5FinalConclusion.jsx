import { useState } from 'react'
import {
  ArrowIcon,
  BellIcon,
  CheckSquareIcon,
  ChevronLeftIcon,
  InfoIcon,
  MessageFastIcon,
  PencilIcon,
} from '../icons.jsx'
import './Step5FinalConclusion.css'

export default function Step5FinalConclusion({ onBack, onFinish }) {
  const [reminders, setReminders] = useState({
    active: true,
    h24: true,
    h2: true,
  })

  const [confirmation, setConfirmation] = useState({
    active: true,
    message: 'Olá! Seu agendamento no Bella Nails foi confirmado! Nos vemos em breve. 💕',
    isEditing: false,
  })

  const [cancellation, setCancellation] = useState({
    active: true,
    policy:
      'Cancelamentos devem ser feitos com antecedência mínima de 3 horas. Em caso de não comparecimento, o valor do sinal não será reembolsado.',
    isEditing: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onFinish?.()
  }

  return (
    <main className="screen conc-screen">
      {/* Header: voltar + Passo 6 de 6 + todas as 6 barras preenchidas */}
      <header className="conc-header">
        <button
          id="conc-back-button"
          className="conc-back-btn"
          type="button"
          onClick={onBack}
          aria-label="Voltar para o passo anterior"
        >
          <ChevronLeftIcon />
        </button>

        <div className="conc-progress-wrap">
          <span className="conc-count-text">Passo 6 de 6</span>
          <div className="conc-bars" aria-label="Progresso da configuração: Passo 6 de 6 concluído">
            <span className="conc-bar active" />
            <span className="conc-bar active" />
            <span className="conc-bar active" />
            <span className="conc-bar active" />
            <span className="conc-bar active" />
            <span className="conc-bar active" />
          </div>
        </div>
      </header>

      {/* Título elegante e Descrição */}
      <section className="conc-intro">
        <h1 className="conc-title">Automatizações e conclusão</h1>
        <p className="conc-desc">
          Configure as mensagens automáticas
          <br />e revise tudo antes de finalizar.
        </p>
      </section>

      {/* Formulário com Cards de Automatizações */}
      <form className="conc-form" onSubmit={handleSubmit}>
        {/* Card 1: Lembretes automáticos (WhatsApp) */}
        <section className="conc-card" aria-label="Lembretes automáticos">
          <div className="conc-card-top">
            <div className="conc-card-title-group">
              <span className="conc-icon-wrap">
                <BellIcon className="conc-svg-icon" />
              </span>
              <h2 className="conc-card-name">Lembretes automáticos (WhatsApp)</h2>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={reminders.active}
              aria-label="Ativar lembretes automáticos"
              className={`conc-switch ${reminders.active ? 'is-on' : 'is-off'}`}
              onClick={() =>
                setReminders((prev) => ({ ...prev, active: !prev.active }))
              }
            >
              <span className="switch-thumb" />
            </button>
          </div>

          <p className="conc-card-sub">
            Enviar lembretes automáticos para suas clientes sobre os agendamentos.
          </p>

          <div className="conc-checkbox-group">
            <label className="conc-checkbox-label">
              <button
                type="button"
                className={`conc-check-box ${reminders.h24 ? 'is-checked' : ''}`}
                onClick={() =>
                  setReminders((prev) => ({ ...prev, h24: !prev.h24 }))
                }
                aria-label="Enviar 24 horas antes"
              >
                {reminders.h24 && <CheckSquareIcon className="conc-check-svg" />}
              </button>
              <span className="conc-check-text">24 horas antes</span>
            </label>

            <label className="conc-checkbox-label">
              <button
                type="button"
                className={`conc-check-box ${reminders.h2 ? 'is-checked' : ''}`}
                onClick={() =>
                  setReminders((prev) => ({ ...prev, h2: !prev.h2 }))
                }
                aria-label="Enviar 2 horas antes"
              >
                {reminders.h2 && <CheckSquareIcon className="conc-check-svg" />}
              </button>
              <span className="conc-check-text">2 horas antes</span>
            </label>
          </div>
        </section>

        {/* Card 2: Mensagens de confirmação */}
        <section className="conc-card" aria-label="Mensagens de confirmação">
          <div className="conc-card-top">
            <div className="conc-card-title-group">
              <span className="conc-icon-wrap">
                <MessageFastIcon className="conc-svg-icon" />
              </span>
              <h2 className="conc-card-name">Mensagens de confirmação</h2>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={confirmation.active}
              aria-label="Ativar mensagens de confirmação"
              className={`conc-switch ${confirmation.active ? 'is-on' : 'is-off'}`}
              onClick={() =>
                setConfirmation((prev) => ({ ...prev, active: !prev.active }))
              }
            >
              <span className="switch-thumb" />
            </button>
          </div>

          <p className="conc-card-sub">
            Enviar mensagem automática ao confirmar o agendamento.
          </p>

          <div className="conc-preview-box">
            {confirmation.isEditing ? (
              <textarea
                className="conc-preview-textarea"
                value={confirmation.message}
                onChange={(e) =>
                  setConfirmation((prev) => ({ ...prev, message: e.target.value }))
                }
                onBlur={() =>
                  setConfirmation((prev) => ({ ...prev, isEditing: false }))
                }
                rows={2}
                autoFocus
              />
            ) : (
              <p className="conc-preview-text">{confirmation.message}</p>
            )}

            <button
              type="button"
              className="conc-pencil-btn"
              onClick={() =>
                setConfirmation((prev) => ({
                  ...prev,
                  isEditing: !prev.isEditing,
                }))
              }
              aria-label="Editar mensagem de confirmação"
            >
              <PencilIcon className="conc-pencil-svg" />
            </button>
          </div>
        </section>

        {/* Card 3: Política de cancelamento */}
        <section className="conc-card" aria-label="Política de cancelamento">
          <div className="conc-card-top">
            <div className="conc-card-title-group">
              <span className="conc-icon-wrap">
                <InfoIcon className="conc-svg-icon" />
              </span>
              <h2 className="conc-card-name">Política de cancelamento</h2>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={cancellation.active}
              aria-label="Ativar política de cancelamento"
              className={`conc-switch ${cancellation.active ? 'is-on' : 'is-off'}`}
              onClick={() =>
                setCancellation((prev) => ({ ...prev, active: !prev.active }))
              }
            >
              <span className="switch-thumb" />
            </button>
          </div>

          <p className="conc-card-sub">
            Defina as regras para cancelamentos.
          </p>

          <div className="conc-preview-box">
            {cancellation.isEditing ? (
              <textarea
                className="conc-preview-textarea"
                value={cancellation.policy}
                onChange={(e) =>
                  setCancellation((prev) => ({ ...prev, policy: e.target.value }))
                }
                onBlur={() =>
                  setCancellation((prev) => ({ ...prev, isEditing: false }))
                }
                rows={3}
                autoFocus
              />
            ) : (
              <p className="conc-preview-text">{cancellation.policy}</p>
            )}

            <button
              type="button"
              className="conc-pencil-btn"
              onClick={() =>
                setCancellation((prev) => ({
                  ...prev,
                  isEditing: !prev.isEditing,
                }))
              }
              aria-label="Editar política de cancelamento"
            >
              <PencilIcon className="conc-pencil-svg" />
            </button>
          </div>
        </section>

        {/* ===================================================================
            Card 4: "Tudo pronto!" com celebração e botão único "Ir para o painel"
            =================================================================== */}
        <section className="conc-celebration-card" aria-label="Conclusão da configuração">
          {/* Círculo com checkmark e raios festivos desenhados */}
          <div className="conc-burst-wrap">
            <div className="conc-check-halo">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="conc-burst-check"
              >
                <path d="M5 12.5l4.5 4.5L19.5 7" />
              </svg>
            </div>

            {/* Raios e confetes festivos irradiando em volta do círculo */}
            <svg
              className="conc-sparkles-svg"
              viewBox="0 0 100 100"
              fill="none"
              stroke="#b51c4a"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {/* Raio superior esquerdo */}
              <line x1="28" y1="26" x2="35" y2="35" />
              <line x1="18" y1="36" x2="24" y2="40" />
              {/* Raio superior direito */}
              <line x1="72" y1="26" x2="65" y2="35" />
              <line x1="82" y1="36" x2="76" y2="40" />
              {/* Raio lateral esquerdo */}
              <line x1="15" y1="52" x2="22" y2="52" />
              {/* Raio lateral direito */}
              <line x1="85" y1="52" x2="78" y2="52" />
              {/* Pequenas gotículas / confetes */}
              <circle cx="32" cy="18" r="1.5" fill="#b51c4a" />
              <circle cx="68" cy="18" r="1.5" fill="#b51c4a" />
            </svg>
          </div>

          <h2 className="conc-ready-title">Tudo pronto!</h2>
          <p className="conc-ready-desc">
            Seu salão está configurado e pronto para receber suas clientes.
            Agora é só começar a usar o sistema!
          </p>

          {/* Botão final: Ir para o painel → */}
          <button
            id="conc-finish-action"
            type="submit"
            className="conc-btn-finish"
          >
            <span>Ir para o painel</span>
            <ArrowIcon className="conc-finish-arrow" />
          </button>
        </section>
      </form>
    </main>
  )
}
