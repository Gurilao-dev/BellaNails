import { useState, useEffect } from 'react'
import headerBannerImg from '../../assets/client/client-confirm-banner.png'
import defaultServiceImg from '../../assets/services/client-alongamento.png'
import defaultProImg from '../../assets/team/client-ana-clara.png'
import {
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ClockIcon,
  PencilIcon,
  UserOutlineIcon,
} from '../../icons.jsx'
import './ClientConfirmation.css'

export default function ClientConfirmation({ onBack, onConfirm, onEdit }) {
  const [observation, setObservation] = useState('')
  const [booking, setBooking] = useState({
    serviceTitle: 'Alongamento em gel',
    price: 'R$ 90,00',
    duration: '1h 30 min',
    professionalName: 'Ana Paula',
    professionalRole: 'Especialista em alongamento',
    dateLabel: 'Ter, 06 de out de 2026',
    time: '14:00',
    serviceImg: defaultServiceImg,
    proAvatar: defaultProImg,
  })

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Recupera dados salvos de etapas anteriores se disponíveis
  useEffect(() => {
    try {
      const savedAppt = localStorage.getItem('bella_client_appointment')
      const savedService = localStorage.getItem('bella_client_service')
      
      let newBooking = { ...booking }

      if (savedAppt) {
        const apptData = JSON.parse(savedAppt)
        if (apptData.service?.title) newBooking.serviceTitle = apptData.service.title
        if (apptData.service?.price) newBooking.price = apptData.service.price
        if (apptData.service?.duration) newBooking.duration = apptData.service.duration
        if (apptData.service?.image) newBooking.serviceImg = apptData.service.image
        
        if (apptData.professional?.name) newBooking.professionalName = apptData.professional.name
        if (apptData.professional?.specialty) newBooking.professionalRole = apptData.professional.specialty
        if (apptData.professional?.avatar) newBooking.proAvatar = apptData.professional.avatar
        
        if (apptData.date?.dayWeek && apptData.date?.dayNum) {
          newBooking.dateLabel = `${apptData.date.dayWeek}, ${apptData.date.dayNum} de ${apptData.date.month || 'out'} de 2026`
        }
        if (apptData.time) newBooking.time = apptData.time
      } else if (savedService) {
        const srv = JSON.parse(savedService)
        if (srv.title) newBooking.serviceTitle = srv.title
        if (srv.price) newBooking.price = srv.price
        if (srv.duration) newBooking.duration = srv.duration
        if (srv.image) newBooking.serviceImg = srv.image
      }

      setBooking(newBooking)
    } catch {
      // Mantém os dados padrão fiéis ao mockup
    }
  }, [])

  const handleFinalConfirm = () => {
    const finalData = {
      ...booking,
      observation: observation.trim(),
      confirmedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem('bella_client_confirmed_appointment', JSON.stringify(finalData))
    } catch {
      // Ignora
    }

    if (onConfirm) {
      onConfirm(finalData)
    }
  }

  return (
    <div className="ccnf-screen">
      {/* =====================================================================
          Conteúdo Rolável (Scrollable Body: Banner, Stepper, Título e Card)
          ===================================================================== */}
      <div className="ccnf-scroll-body">
        {/* Banner Superior Ilustrado (PNG Original do Usuário - Sem Quadrado) */}
        <header className="ccnf-header-wrap">
          <img
            src={headerBannerImg}
            alt="Bella Nails Studio de Unhas - Beleza em cada detalhe"
            className="ccnf-header-img"
          />
        </header>

        {/* Stepper de Progresso (Passo 4 de 4 Ativo) */}
        <nav className="ccnf-stepper-wrap" aria-label="Progresso do agendamento">
          <div className="ccnf-stepper-inner">
            {/* Passo 1: Serviço (Concluído) */}
            <div className="ccnf-step-col is-done">
              <div className="ccnf-step-badge">
                <CheckIcon className="ccnf-check-icon" />
              </div>
              <span className="ccnf-step-label">Serviço</span>
            </div>

            <div className="ccnf-step-connector is-active" />

            {/* Passo 2: Profissional (Concluído) */}
            <div className="ccnf-step-col is-done">
              <div className="ccnf-step-badge">
                <CheckIcon className="ccnf-check-icon" />
              </div>
              <span className="ccnf-step-label">Profissional</span>
            </div>

            <div className="ccnf-step-connector is-active" />

            {/* Passo 3: Data e horário (Concluído) */}
            <div className="ccnf-step-col is-done">
              <div className="ccnf-step-badge">
                <CheckIcon className="ccnf-check-icon" />
              </div>
              <span className="ccnf-step-label">Data e horário</span>
            </div>

            <div className="ccnf-step-connector is-active" />

            {/* Passo 4: Confirmação (Ativo) */}
            <div className="ccnf-step-col is-current">
              <div className="ccnf-step-badge is-current-badge">
                <span className="ccnf-step-num">4</span>
              </div>
              <span className="ccnf-step-label is-current-label">Confirmação</span>
            </div>
          </div>
        </nav>

        {/* Conteúdo Principal do Agendamento */}
        <main className="ccnf-main-content">
          {/* Linha do Cabeçalho: Botão Voltar + Título e Subtítulo */}
          <div className="ccnf-title-header">
            <button
              type="button"
              className="ccnf-back-circle-btn"
              onClick={onBack}
              aria-label="Voltar para a tela anterior"
            >
              <ChevronLeftIcon className="ccnf-back-chevron" />
            </button>

            <div className="ccnf-title-text-group">
              <h1 className="ccnf-main-title">Confirmar agendamento</h1>
              <p className="ccnf-subtitle">
                Confira os detalhes do seu horário antes de finalizar.
              </p>
            </div>
          </div>

          {/* Card Resumo dos Detalhes (Serviço + Profissional) */}
          <section className="ccnf-summary-card">
            {/* Linha Superior: Foto do Serviço + Detalhes */}
            <div className="ccnf-service-top-row">
              <div className="ccnf-service-photo-wrap">
                <img
                  src={booking.serviceImg}
                  alt={booking.serviceTitle}
                  className="ccnf-service-photo"
                />
              </div>

              <div className="ccnf-service-details-col">
                <h2 className="ccnf-service-name">{booking.serviceTitle}</h2>
                <div className="ccnf-service-price">{booking.price}</div>

                <div className="ccnf-meta-list">
                  <div className="ccnf-meta-item">
                    <ClockIcon className="ccnf-meta-icon" />
                    <span>{booking.duration}</span>
                  </div>

                  <div className="ccnf-meta-item">
                    <UserOutlineIcon className="ccnf-meta-icon" />
                    <span>{booking.professionalName}</span>
                  </div>

                  <div className="ccnf-meta-item">
                    <CalendarIcon className="ccnf-meta-icon" />
                    <span>{booking.dateLabel}</span>
                  </div>

                  <div className="ccnf-meta-item">
                    <ClockIcon className="ccnf-meta-icon" />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linha Divisória */}
            <div className="ccnf-card-divider" />

            {/* Linha Inferior: Profissional Selecionada */}
            <div
              className="ccnf-pro-strip"
              onClick={onEdit || onBack}
              role="button"
              tabIndex={0}
              title="Editar ou alterar profissional"
            >
              <div className="ccnf-pro-avatar-wrap">
                <img
                  src={booking.proAvatar}
                  alt={booking.professionalName}
                  className="ccnf-pro-avatar-img"
                />
              </div>

              <div className="ccnf-pro-text-wrap">
                <h3 className="ccnf-pro-title">{booking.professionalName}</h3>
                <p className="ccnf-pro-subtitle">{booking.professionalRole}</p>
              </div>

              <div className="ccnf-pro-arrow-circle" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* =====================================================================
          Parte Fixa na Parte de Baixo da Tela (Observação + Botões de Ação)
          ===================================================================== */}
      <footer className="ccnf-fixed-bottom-bar">
        {/* Campo de Observação (Opcional) */}
        <section className="ccnf-obs-section">
          <label htmlFor="booking-obs" className="ccnf-obs-label">
            Observação (opcional)
          </label>

          <div className="ccnf-obs-box">
            <div className="ccnf-obs-input-row">
              <PencilIcon className="ccnf-obs-pencil-icon" />
              <textarea
                id="booking-obs"
                className="ccnf-obs-textarea"
                placeholder="Alguma observação sobre o atendimento?"
                maxLength={300}
                rows={2}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
            </div>
            <div className="ccnf-obs-counter">
              {observation.length}/300
            </div>
          </div>
        </section>

        {/* Botões de Ação */}
        <div className="ccnf-actions-group">
          {/* Botão Primário: Confirmar Agendamento */}
          <button
            type="button"
            className="ccnf-submit-btn"
            onClick={handleFinalConfirm}
          >
            <span className="ccnf-submit-btn-text">Confirmar agendamento</span>
            <div className="ccnf-submit-btn-arrow-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </button>

          {/* Botão Secundário: Voltar para editar */}
          <button
            type="button"
            className="ccnf-edit-btn"
            onClick={onEdit || onBack}
          >
            <span className="ccnf-edit-arrow">←</span>
            <span>Voltar para editar</span>
          </button>
        </div>
      </footer>

      {/* =====================================================================
          Modal / Toast de Sucesso Final
          ===================================================================== */}
      {isSuccessModalOpen && (
        <div className="ccnf-modal-backdrop" onClick={() => setIsSuccessModalOpen(false)}>
          <div className="ccnf-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ccnf-modal-icon-circle">
              <CheckIcon className="ccnf-modal-check" />
            </div>
            <h3 className="ccnf-modal-title">Agendamento Confirmado!</h3>
            <p className="ccnf-modal-desc">
              Seu horário para <strong>{booking.serviceTitle}</strong> com{' '}
              <strong>{booking.professionalName}</strong> em{' '}
              <strong>{booking.dateLabel} às {booking.time}</strong> foi reservado com sucesso!
            </p>
            <button
              type="button"
              className="ccnf-modal-btn"
              onClick={() => {
                setIsSuccessModalOpen(false)
                if (onBack) onBack()
              }}
            >
              Concluir
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

