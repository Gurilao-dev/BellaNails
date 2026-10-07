import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import headerBannerImg from '../../assets/client/client-banner-wave.png'
import anaClaraImg from '../../assets/team/client-ana-clara.png'
import julianaImg from '../../assets/team/client-juliana.png'
import fernandaImg from '../../assets/team/client-fernanda.png'
import {
  ChevronLeftIcon,
  CheckIcon,
  ClockIcon,
  StarIcon,
} from '../../icons.jsx'
import {
  subscribeToSalonSettings,
  subscribeToAppointments,
} from '../../firebase/services.js'
import './ClientSchedule.css'

// =============================================================================
// DADOS DAS PROFISSIONAIS (Exatamente conforme imagem 3)
// =============================================================================
const PROFESSIONALS_DATA = [
  {
    id: 'ana-clara',
    name: 'Ana Clara',
    specialty: 'Especialista em alongamento',
    rating: '4,9',
    reviews: '128 avaliações',
    nextTime: '14:00',
    avatar: anaClaraImg,
  },
  {
    id: 'juliana',
    name: 'Juliana',
    specialty: 'Especialista em nail art',
    rating: '4,8',
    reviews: '96 avaliações',
    nextTime: '13:30',
    avatar: julianaImg,
  },
  {
    id: 'fernanda',
    name: 'Fernanda',
    specialty: 'Manicure e pedicure',
    rating: '4,7',
    reviews: '84 avaliações',
    nextTime: '15:00',
    avatar: fernandaImg,
  },
]

// =============================================================================
// DIAS DO CALENDÁRIO (Exatamente conforme imagem 1)
// =============================================================================
const DATES_DATA = [
  { id: '2026-10-05', dayWeek: 'Seg', dayNum: '05', month: 'out' },
  { id: '2026-10-06', dayWeek: 'Ter', dayNum: '06', month: 'out' }, // Selecionado por padrão
  { id: '2026-10-07', dayWeek: 'Qua', dayNum: '07', month: 'out' },
  { id: '2026-10-08', dayWeek: 'Qui', dayNum: '08', month: 'out' },
  { id: '2026-10-09', dayWeek: 'Sex', dayNum: '09', month: 'out' },
]

// =============================================================================
// HORÁRIOS POR TURNO (Base do Catálogo)
// =============================================================================
const PERIODS_DATA = [
  {
    id: 'manha',
    name: 'Manhã',
    iconType: 'sun',
    slots: [
      { time: '08:00', available: true },
      { time: '08:30', available: true },
      { time: '09:00', available: true },
      { time: '09:30', available: true },
      { time: '10:00', available: true },
      { time: '10:30', available: true },
      { time: '11:00', available: true },
      { time: '11:30', available: false },
    ],
  },
  {
    id: 'tarde',
    name: 'Tarde',
    iconType: 'sun',
    slots: [
      { time: '13:00', available: true },
      { time: '13:30', available: true },
      { time: '14:00', available: true },
      { time: '14:30', available: true },
      { time: '15:00', available: true },
      { time: '15:30', available: true },
      { time: '16:00', available: true },
      { time: '16:30', available: true },
      { time: '17:00', available: true },
    ],
  },
  {
    id: 'noite',
    name: 'Noite',
    iconType: 'moon',
    slots: [
      { time: '18:00', available: true },
      { time: '18:30', available: true },
      { time: '19:00', available: false },
      { time: '19:30', available: true },
    ],
  },
]

function timeToMinutes(t) {
  if (!t || typeof t !== 'string') return 0
  const [h, m] = t.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

export default function ClientSchedule({ onBack, onContinue }) {
  // Estado da profissional selecionada (Ana Clara por padrão conforme mockup 3)
  const [selectedProId, setSelectedProId] = useState('ana-clara')

  // Modal "Escolha a profissional" deve subir automaticamente com animação
  const [isProModalOpen, setIsProModalOpen] = useState(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('nomodal')) return false
    return true
  })
  const [isProModalClosing, setIsProModalClosing] = useState(false)
  const [hasConfirmedProOnce, setHasConfirmedProOnce] = useState(false)
  const [wiggleModal, setWiggleModal] = useState(false)

  // Seleção de Data e Horário (Terça 06 out às 14:00 por padrão conforme mockup 1)
  const [selectedDateId, setSelectedDateId] = useState('2026-10-06')
  const [selectedTime, setSelectedTime] = useState('14:00')

  // Feedback de confirmação final
  const [isBookingDone, setIsBookingDone] = useState(false)

  // Referências para gesto de arrasto (travado para não permitir empurrar para baixo antes de escolher)
  const dragStartY = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)

  // Configurações do Studio e Agendamentos reais do Firebase
  const [salonSettings, setSalonSettings] = useState({
    openTime: '08:00',
    closeTime: '19:30',
    blockedSlots: {},
    allowNextDayBooking: true,
  })
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const unsubSettings = subscribeToSalonSettings((data) => {
      if (data) setSalonSettings((prev) => ({ ...prev, ...data }))
    })
    const unsubAppts = subscribeToAppointments((list) => {
      if (list) setAppointments(list)
    })
    return () => {
      unsubSettings()
      unsubAppts()
    }
  }, [])

  // Recupera serviço selecionado da etapa anterior caso exista
  const [selectedService, setSelectedService] = useState(null)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bella_client_selected_service')
      if (saved) {
        setSelectedService(JSON.parse(saved))
      }
    } catch {
      // Ignora erro
    }
  }, [])

  const currentPro = PROFESSIONALS_DATA.find((p) => p.id === selectedProId) || PROFESSIONALS_DATA[0]
  const currentDate = DATES_DATA.find((d) => d.id === selectedDateId) || DATES_DATA[1]

  // Horários calculados dinamicamente com base nas regras cadastradas pela manicure
  const computedPeriods = useMemo(() => {
    const openMin = timeToMinutes(salonSettings.openTime || '08:00')
    const closeMin = timeToMinutes(salonSettings.closeTime || '19:30')
    const blockedForDay = (salonSettings.blockedSlots && salonSettings.blockedSlots[selectedDateId]) || []

    // Agendamentos já ocupados no Firestore para essa data
    const bookedForDay = appointments
      .filter((a) => (a.dateId === selectedDateId || a.date === selectedDateId) && a.status !== 'cancelado')
      .map((a) => a.time)

    // Bloqueio de dia seguinte caso a manicure tenha desmarcado
    const isNextDayDisallowed = salonSettings.allowNextDayBooking === false && selectedDateId !== '2026-10-05'

    return PERIODS_DATA.map((period) => {
      const filteredSlots = period.slots
        .filter((s) => {
          const slotMin = timeToMinutes(s.time)
          return slotMin >= openMin && slotMin <= closeMin
        })
        .map((s) => {
          const isBlocked = blockedForDay.includes(s.time)
          const isBooked = bookedForDay.includes(s.time)
          const isAvail = !isBlocked && !isBooked && !isNextDayDisallowed
          return {
            time: s.time,
            available: isAvail,
          }
        })

      return {
        ...period,
        slots: filteredSlots,
      }
    })
  }, [salonSettings, appointments, selectedDateId])

  // ===========================================================================
  // CONTROLE DO MODAL DE ESCOLHA DA PROFISSIONAL
  // Requisito estrito:
  // "quando a pessoa chega nessa parte tem que subir a aba para escolher o profissional,
  //  quando a pessoa chega ai ele sobe com animação, e não tem como empurrar para
  //  baixo so quando escolher a profissional"
  // ===========================================================================

  // Tentar fechar sem confirmar é bloqueado com animação de feedback
  const handleBlockedDismiss = () => {
    if (!hasConfirmedProOnce) {
      setWiggleModal(true)
      setTimeout(() => setWiggleModal(false), 500)
    } else {
      // Se já escolheu uma vez e reabriu para trocar, pode fechar normalmente
      handleCloseProModal()
    }
  }

  // Confirma a profissional e desce a aba com animação
  const handleConfirmProfessional = () => {
    try {
      localStorage.setItem('bella_client_selected_pro', JSON.stringify(currentPro))
    } catch {
      // Ignora
    }
    setHasConfirmedProOnce(true)
    handleCloseProModal()
  }

  const handleCloseProModal = () => {
    setIsProModalClosing(true)
    setTimeout(() => {
      setIsProModalOpen(false)
      setIsProModalClosing(false)
      setDragOffset(0)
    }, 340)
  }

  // Abrir modal novamente caso queira trocar a profissional
  const handleOpenProModal = () => {
    setIsProModalOpen(true)
    setIsProModalClosing(false)
    setDragOffset(0)
  }

  // ===========================================================================
  // GESTO DE ARRASTO TRAVADO
  // Impede que o usuário empurre a aba para baixo antes de confirmar
  // ===========================================================================
  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY
    const deltaY = currentY - dragStartY.current

    if (deltaY > 0) {
      // Se não confirmou ainda, aplica resistência ultra pesada (máx 12px)
      // e NÃO permite fechar de jeito nenhum!
      if (!hasConfirmedProOnce) {
        setDragOffset(Math.min(deltaY * 0.08, 12))
      } else {
        // Se já confirmou uma vez, permite arrastar suavemente
        setDragOffset(deltaY)
      }
    } else {
      setDragOffset(deltaY * 0.1)
    }
  }

  const handleTouchEnd = () => {
    if (!hasConfirmedProOnce) {
      // Retorna imediatamente à posição original
      setDragOffset(0)
      if (dragOffset > 5) {
        setWiggleModal(true)
        setTimeout(() => setWiggleModal(false), 500)
      }
    } else {
      if (dragOffset > 90) {
        handleCloseProModal()
      } else {
        setDragOffset(0)
      }
    }
  }

  // ===========================================================================
  // SELEÇÃO DE HORÁRIO
  // ===========================================================================
  const handleSelectTime = (slot) => {
    if (!slot.available) {
      return // Indisponível
    }
    setSelectedTime(slot.time)
  }

  // ===========================================================================
  // CONTINUAR / FINALIZAR AGENDAMENTO
  // ===========================================================================
  const handleContinueBooking = () => {
    const bookingData = {
      service: selectedService,
      professional: currentPro,
      date: currentDate,
      dateId: selectedDateId,
      time: selectedTime,
      createdAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem('bella_client_appointment', JSON.stringify(bookingData))
    } catch {
      // Ignora
    }

    if (onContinue) {
      onContinue(bookingData)
    }
  }

  return (
    <div className="csch-screen">
      {/* =====================================================================
          Banner Superior Ilustrado (Bella Nails Studio de Unhas + Mãos)
          ===================================================================== */}
      <header className="csch-header-wrap">
        <img
          src={headerBannerImg}
          alt="Bella Nails - Studio de Unhas - Beleza em cada detalhe"
          className="csch-header-img"
        />
      </header>

      {/* =====================================================================
          Conteúdo Principal: Sem plantas e sem caixa de notificação
          O fundo branco sobe até se esconder atrás da imagem
          ===================================================================== */}
      <main className="csch-main-card">
        {/* Cabeçalho: Botão Voltar + Título e Subtítulo logo abaixo da imagem */}
        <div className="csch-heading-row">
          <button
            type="button"
            className="csch-back-btn"
            onClick={onBack}
            aria-label="Voltar para escolha de serviço"
          >
            <ChevronLeftIcon className="csch-back-icon" />
          </button>

          <div className="csch-title-wrap">
            <h1 className="csch-title">Escolha o dia e horário</h1>
            <p className="csch-subtitle">
              Selecione o melhor horário para o seu atendimento.
            </p>
          </div>
        </div>

        {/* ===================================================================
            Carrossel de Dias da Semana (Seg 05, Ter 06 [ativo], Qua 07, ...)
            =================================================================== */}
        <section className="csch-dates-row" aria-label="Seleção de data">
          {DATES_DATA.map((d) => {
            const isSelected = selectedDateId === d.id
            return (
              <button
                key={d.id}
                type="button"
                className={`csch-date-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedDateId(d.id)}
                aria-pressed={isSelected}
              >
                <span className="csch-date-weekday">{d.dayWeek}</span>
                <span className="csch-date-num">{d.dayNum}</span>
                <span className="csch-date-month">{d.month}</span>
              </button>
            )
          })}
        </section>

        {/* ===================================================================
            Turnos e Horários Filtrados Dinamicamente pelo Firebase
            =================================================================== */}
        <div className="csch-periods-wrap">
          {computedPeriods.map((period) => (
            <section key={period.id} className="csch-period-section">
              {/* Divisor com Ícone de Sol ou Lua e Nome do Turno */}
              <div className="csch-period-divider">
                <div className="csch-divider-line" />
                <div className="csch-divider-badge">
                  {period.iconType === 'sun' ? (
                    <svg
                      className="csch-period-icon sun"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="4" fill="currentColor" />
                      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
                    </svg>
                  ) : (
                    <svg
                      className="csch-period-icon moon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                  <span className="csch-period-name">{period.name}</span>
                </div>
                <div className="csch-divider-line" />
              </div>

              {/* Grade de Horários */}
              <div className="csch-slots-grid">
                {period.slots.map((slot) => {
                  const isSelected = selectedTime === slot.time && slot.available
                  const isUnavailable = !slot.available

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={isUnavailable}
                      className={`csch-slot-btn ${
                        isSelected ? 'is-selected' : ''
                      } ${isUnavailable ? 'is-unavailable' : ''}`}
                      onClick={() => handleSelectTime(slot)}
                    >
                      {slot.time}
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* ===================================================================
            Legenda de Status dos Horários
            =================================================================== */}
        <div className="csch-legend-row" aria-label="Legenda dos horários">
          <div className="csch-legend-item">
            <span className="csch-dot is-available" />
            <span className="csch-legend-text">Disponível</span>
          </div>
          <div className="csch-legend-item">
            <span className="csch-dot is-selected" />
            <span className="csch-legend-text">Selecionado</span>
          </div>
          <div className="csch-legend-item">
            <span className="csch-dot is-unavailable" />
            <span className="csch-legend-text">Indisponível</span>
          </div>
        </div>

        {/* ===================================================================
            Botão Continuar com Badge Circular da Seta
            =================================================================== */}
        <div className="csch-footer-action">
          <button
            type="button"
            className="csch-continue-btn"
            onClick={handleContinueBooking}
          >
            <span className="csch-continue-text">Continuar</span>
            <span className="csch-continue-arrow-wrap">
              <svg
                className="csch-continue-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </main>

      {/* =====================================================================
          MODAL INFERIOR: "Escolha a profissional"
          Sobe automaticamente com animação ao entrar na tela.
          NÃO pode ser empurrado para baixo até escolher a profissional!
          ===================================================================== */}
      {isProModalOpen && (
        <div
          className={`csch-sheet-overlay ${
            isProModalClosing ? 'is-closing' : ''
          }`}
          onClick={handleBlockedDismiss}
        >
          <div
            className={`csch-sheet-container ${
              isProModalClosing ? 'is-closing' : ''
            } ${wiggleModal ? 'is-wiggling' : ''}`}
            style={{
              transform: `translateY(${dragOffset}px)`,
              transition: dragOffset === 0 ? 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Alça / Barra de puxar (Travada com aviso sutil) */}
            <div
              className="csch-sheet-handle-wrap"
              onClick={handleBlockedDismiss}
            >
              <div className="csch-sheet-handle" />
            </div>

            {/* Cabeçalho do Modal */}
            <div className="csch-sheet-header">
              <h2 className="csch-sheet-title">Escolha a profissional</h2>
              <p className="csch-sheet-subtitle">
                Selecione quem vai realizar o seu atendimento para liberar os horários.
              </p>
            </div>

            {/* Lista dos 3 Cards de Profissionais */}
            <div className="csch-pros-list">
              {PROFESSIONALS_DATA.map((pro) => {
                const isSelected = selectedProId === pro.id
                return (
                  <div
                    key={pro.id}
                    className={`csch-pro-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedProId(pro.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedProId(pro.id)
                      }
                    }}
                  >
                    {/* Foto da Profissional */}
                    <div className="csch-pro-avatar-wrap">
                      <img
                        src={pro.avatar}
                        alt={pro.name}
                        className="csch-pro-avatar"
                      />
                    </div>

                    {/* Informações da Profissional */}
                    <div className="csch-pro-info">
                      <h3 className="csch-pro-name">{pro.name}</h3>
                      <p className="csch-pro-specialty">{pro.specialty}</p>

                      <div className="csch-pro-meta-row">
                        {/* Avaliação */}
                        <div className="csch-pro-rating">
                          <StarIcon className="csch-star-icon" />
                          <span className="csch-rating-val">{pro.rating}</span>
                          <span className="csch-rating-count">
                            ({pro.reviews})
                          </span>
                        </div>

                        {/* Próximo Horário Badge */}
                        <div className="csch-pro-next-slot">
                          <ClockIcon className="csch-clock-icon" />
                          <span className="csch-next-label">Próximo horário:</span>
                          <span className="csch-next-time">{pro.nextTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botão de Seleção (Radio / Check) */}
                    <div className="csch-pro-radio-wrap">
                      <div className={`csch-pro-radio ${isSelected ? 'is-checked' : ''}`}>
                        {isSelected && (
                          <svg
                            className="csch-radio-check-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Botão Confirmar Profissional */}
            <div className="csch-sheet-btn-wrap">
              <button
                type="button"
                className="csch-confirm-pro-btn"
                onClick={handleConfirmProfessional}
              >
                <span className="csch-confirm-pro-text">Confirmar profissional</span>
                <svg
                  className="csch-confirm-pro-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
