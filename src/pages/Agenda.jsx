import { useState, useEffect } from 'react'
import marianaImg from '../assets/agenda/client-mariana.png'
import julianaImg from '../assets/agenda/client-juliana.png'
import fernandaImg from '../assets/agenda/client-fernanda.png'
import patriciaImg from '../assets/agenda/client-patricia.png'
import carlaImg from '../assets/agenda/client-carla.png'
import beatrizImg from '../assets/agenda/client-beatriz.png'
import camilaImg from '../assets/agenda/client-camila.png'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronRightSmallIcon,
  PlusIcon,
  CheckSmallIcon,
  ClockSmallIcon,
  CloseSmallIcon,
  CalendarTodayIcon,
  CheckIcon,
} from '../icons.jsx'
import AppBottomNav from '../components/AppBottomNav.jsx'
import { useBottomSheetDrag } from '../hooks/useBottomSheetDrag.js'
import {
  subscribeToAppointments,
  createAppointment,
  updateAppointmentStatus,
  subscribeToSalonSettings,
  toggleSlotBlocked,
  setNextDayBookingAllowed,
} from '../firebase/services.js'
import './Agenda.css'

const CALENDAR_DAYS = [
  { id: '2026-10-05', dayShort: 'Seg', dayNum: '05', month: 'out' },
  { id: '2026-10-06', dayShort: 'Ter', dayNum: '06', month: 'out' },
  { id: '2026-10-07', dayShort: 'Qua', dayNum: '07', month: 'out' },
  { id: '2026-10-08', dayShort: 'Qui', dayNum: '08', month: 'out' },
  { id: '2026-10-09', dayShort: 'Sex', dayNum: '09', month: 'out' },
  { id: '2026-10-10', dayShort: 'Sáb', dayNum: '10', month: 'out' },
]

export default function Agenda({ onNavigateTab }) {
  // 'dia' | 'personalizar' | 'mes'
  const [period, setPeriod] = useState('dia')
  const [selectedDayId, setSelectedDayId] = useState('2026-10-06')
  const [appointments, setAppointments] = useState([])
  const [salonSettings, setSalonSettings] = useState({
    openTime: '08:00',
    closeTime: '19:30',
    slotInterval: 30,
    allowNextDayBooking: true,
    blockedSlots: {},
  })

  // Modal de novo agendamento
  const [showNewModal, setShowNewModal] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [newClientPhone, setNewClientPhone] = useState('')
  const [newService, setNewService] = useState('Alongamento em gel')
  const [newStartTime, setNewStartTime] = useState('14:00')

  // Feedback de alteração de horário
  const [slotFeedback, setSlotFeedback] = useState('')

  // Drag down to close handler for modal
  const { sheetStyle, handleProps } = useBottomSheetDrag(() => setShowNewModal(false))

  // 1. Escuta agendamentos reais no Firestore
  useEffect(() => {
    const unsubscribe = subscribeToAppointments((list) => {
      if (list && list.length > 0) {
        setAppointments(list)
      } else {
        // Se vazio no Firebase, exibe dados padrão
        setAppointments([
          {
            id: 'apt-01',
            date: '2026-10-06',
            time: '14:00',
            clientName: 'Ana Paula',
            clientPhone: '(11) 98765-4321',
            serviceTitle: 'Alongamento em gel',
            duration: '1h 30 min',
            price: 'R$ 90,00',
            priceValue: 90,
            status: 'confirmado',
          },
        ])
      }
    })
    return () => unsubscribe()
  }, [])

  // 2. Escuta configurações de salão e horários no Firestore
  useEffect(() => {
    const unsubscribe = subscribeToSalonSettings((settings) => {
      if (settings) {
        setSalonSettings((prev) => ({ ...prev, ...settings }))
      }
    })
    return () => unsubscribe()
  }, [])

  // Filtra agendamentos do dia selecionado
  const currentDayAppointments = appointments.filter((apt) => {
    return apt.date === selectedDayId || !apt.date // ou exibe se não especificado
  })

  // Adicionar agendamento no Firestore
  const handleAddAppointment = async (e) => {
    e.preventDefault()
    if (!newClientName.trim()) return

    const selectedDayObj = CALENDAR_DAYS.find((d) => d.id === selectedDayId) || CALENDAR_DAYS[1]
    const dateLabel = `${selectedDayObj.dayShort}, ${selectedDayObj.dayNum} de out de 2026`

    await createAppointment({
      clientName: newClientName.trim(),
      clientPhone: newClientPhone.trim(),
      serviceTitle: newService,
      date: selectedDayId,
      dateLabel: dateLabel,
      time: newStartTime,
      price: newService.includes('90') ? 'R$ 90,00' : 'R$ 70,00',
    })

    setNewClientName('')
    setNewClientPhone('')
    setShowNewModal(false)
  }

  // Marcar agendamento como finalizado (cai no financeiro automaticamente!)
  const handleFinalizeAppointment = async (aptId) => {
    await updateAppointmentStatus(aptId, 'finalizado')
    alert('Atendimento finalizado! O valor foi adicionado automaticamente às entradas do seu Financeiro.')
  }

  // Cancelar agendamento
  const handleCancelAppointment = async (aptId) => {
    if (window.confirm('Deseja realmente cancelar este agendamento?')) {
      await updateAppointmentStatus(aptId, 'cancelado')
    }
  }

  // Alternar slot bloqueado/desativado pela manicure
  const handleToggleSlot = async (timeSlot) => {
    const res = await toggleSlotBlocked(selectedDayId, timeSlot)
    if (res.success) {
      setSlotFeedback(`Horário ${timeSlot} ${res.isBlocked ? 'bloqueado' : 'liberado'} para os clientes.`)
      setTimeout(() => setSlotFeedback(''), 2500)
    }
  }

  // Alternar se permite agendamentos para o dia seguinte
  const handleToggleNextDay = async () => {
    const nextVal = !salonSettings.allowNextDayBooking
    await setNextDayBookingAllowed(nextVal)
    setSalonSettings((prev) => ({ ...prev, allowNextDayBooking: nextVal }))
  }

  // Horários gerados baseados na foto do usuário:
  const morningSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
  const afternoonSlots = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']
  const eveningSlots = ['18:00', '18:30', '19:00', '19:30']

  const currentBlocked = (salonSettings.blockedSlots && salonSettings.blockedSlots[selectedDayId]) || []
  const bookedTimes = currentDayAppointments.map((a) => a.time)

  return (
    <main className="screen agenda-screen">
      {/* ===================================================================
          Header e Seletor de Período
          =================================================================== */}
      <div className="agenda-sticky-top">
        <header className="agenda-header anim-stagger-item anim-delay-1">
          <div className="agenda-header-left">
            <div className="agenda-icon-wrap" aria-hidden="true">
              <CalendarIcon className="agenda-title-icon" />
            </div>
            <div className="agenda-title-group">
              <h1 className="agenda-title">Agenda</h1>
              <p className="agenda-subtitle">Gerencie horários e atendimentos</p>
            </div>
          </div>

          <button
            id="agenda-add-button"
            type="button"
            className="agenda-new-apt-btn"
            aria-label="Adicionar novo agendamento"
            onClick={() => setShowNewModal(true)}
          >
            <PlusIcon className="agenda-plus-icon" />
            <span>Novo</span>
          </button>
        </header>

        {/* Seletor de Abas: Dia, Personalizar Horários, Mês */}
        <div className="agenda-period-selector anim-stagger-item anim-delay-2" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={period === 'dia'}
            className={`agenda-period-tab ${period === 'dia' ? 'is-active' : ''}`}
            onClick={() => setPeriod('dia')}
          >
            Atendimentos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={period === 'personalizar'}
            className={`agenda-period-tab ${period === 'personalizar' ? 'is-active' : ''}`}
            onClick={() => setPeriod('personalizar')}
            title="Personalize os horários que você atende e bloqueie intervalos"
          >
            ⚙️ Personalizar Horários
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={period === 'mes'}
            className={`agenda-period-tab ${period === 'mes' ? 'is-active' : ''}`}
            onClick={() => setPeriod('mes')}
          >
            Mês
          </button>
        </div>

        {/* Carrossel de Dias da Semana (< Seg Ter Qua Qui Sex Sáb >) */}
        <section className="agenda-days-strip anim-stagger-item anim-delay-3" aria-label="Dias da semana">
          <div className="agenda-days-list">
            {CALENDAR_DAYS.map((item) => {
              const isSelected = selectedDayId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`agenda-day-card ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setSelectedDayId(item.id)}
                >
                  <span className="agenda-day-short">{item.dayShort}</span>
                  <span className="agenda-day-num">{item.dayNum}</span>
                  <span className="agenda-day-month">{item.month}</span>
                </button>
              )
            })}
          </div>
        </section>
      </div>

      {/* ===================================================================
          CONTEÚDO: MODO 1 - PERSONALIZAR HORÁRIOS (TELA FIEL À FOTO DO USUÁRIO)
          =================================================================== */}
      {period === 'personalizar' ? (
        <div className="agenda-content-body agenda-slots-custom-body">
          
          {/* Card de Configuração do Dia Seguinte e Horários */}
          <div className="agenda-slots-ctrl-card">
            <div className="agenda-slots-ctrl-row">
              <div className="agenda-slots-ctrl-info">
                <span className="agenda-slots-ctrl-title">
                  Liberar agendamentos do dia seguinte
                </span>
                <span className="agenda-slots-ctrl-desc">
                  Permite que as clientes já escolham e reservem horários para amanhã.
                </span>
              </div>
              <label className="agenda-switch">
                <input
                  type="checkbox"
                  checked={Boolean(salonSettings.allowNextDayBooking)}
                  onChange={handleToggleNextDay}
                />
                <span className="agenda-switch-slider" />
              </label>
            </div>

            <div className="agenda-open-hours-badge">
              <span>🕒 Atendimento cadastrado: <strong>{salonSettings.openTime || '08:00'}</strong> às <strong>{salonSettings.closeTime || '19:30'}</strong></span>
            </div>
          </div>

          {slotFeedback && (
            <div className="agenda-slot-toast">{slotFeedback}</div>
          )}

          {/* Instruções Rápidas */}
          <div className="agenda-slots-header-text">
            <h3>Horários para {CALENDAR_DAYS.find(d => d.id === selectedDayId)?.dayShort}, {CALENDAR_DAYS.find(d => d.id === selectedDayId)?.dayNum} de out</h3>
            <p>Toque em qualquer horário para <strong>bloquear ou reativar</strong> para suas clientes:</p>
          </div>

          {/* Turno Manhã */}
          <div className="agenda-period-slots-section">
            <div className="agenda-period-title-divider">
              <span>☀️ Manhã</span>
            </div>
            <div className="agenda-slots-grid">
              {morningSlots.map((time) => {
                const isBlocked = currentBlocked.includes(time)
                const isBooked = bookedTimes.includes(time)

                return (
                  <button
                    key={time}
                    type="button"
                    className={`agenda-slot-toggle-btn ${isBlocked ? 'is-blocked' : isBooked ? 'is-booked' : 'is-available'}`}
                    onClick={() => !isBooked && handleToggleSlot(time)}
                    title={isBooked ? 'Horário já agendado por cliente' : isBlocked ? 'Clique para reativar' : 'Clique para bloquear'}
                  >
                    <span className="agenda-slot-time-text">{time}</span>
                    <span className="agenda-slot-subtext">
                      {isBooked ? 'Agendado' : isBlocked ? 'Desativado' : 'Disponível'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Turno Tarde */}
          <div className="agenda-period-slots-section">
            <div className="agenda-period-title-divider">
              <span>☀️ Tarde</span>
            </div>
            <div className="agenda-slots-grid">
              {afternoonSlots.map((time) => {
                const isBlocked = currentBlocked.includes(time)
                const isBooked = bookedTimes.includes(time)

                return (
                  <button
                    key={time}
                    type="button"
                    className={`agenda-slot-toggle-btn ${isBlocked ? 'is-blocked' : isBooked ? 'is-booked' : 'is-available'}`}
                    onClick={() => !isBooked && handleToggleSlot(time)}
                    title={isBooked ? 'Horário já agendado por cliente' : isBlocked ? 'Clique para reativar' : 'Clique para bloquear'}
                  >
                    <span className="agenda-slot-time-text">{time}</span>
                    <span className="agenda-slot-subtext">
                      {isBooked ? 'Agendado' : isBlocked ? 'Desativado' : 'Disponível'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Turno Noite */}
          <div className="agenda-period-slots-section">
            <div className="agenda-period-title-divider">
              <span>🌙 Noite</span>
            </div>
            <div className="agenda-slots-grid">
              {eveningSlots.map((time) => {
                const isBlocked = currentBlocked.includes(time)
                const isBooked = bookedTimes.includes(time)

                return (
                  <button
                    key={time}
                    type="button"
                    className={`agenda-slot-toggle-btn ${isBlocked ? 'is-blocked' : isBooked ? 'is-booked' : 'is-available'}`}
                    onClick={() => !isBooked && handleToggleSlot(time)}
                    title={isBooked ? 'Horário já agendado por cliente' : isBlocked ? 'Clique para reativar' : 'Clique para bloquear'}
                  >
                    <span className="agenda-slot-time-text">{time}</span>
                    <span className="agenda-slot-subtext">
                      {isBooked ? 'Agendado' : isBlocked ? 'Desativado' : 'Disponível'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Legenda Exatamente Igual à Foto do Usuário */}
          <div className="agenda-slots-legend-row">
            <div className="agenda-legend-item">
              <span className="agenda-legend-bullet is-avail" />
              <span>Disponível</span>
            </div>
            <div className="agenda-legend-item">
              <span className="agenda-legend-bullet is-booked" />
              <span>Agendado</span>
            </div>
            <div className="agenda-legend-item">
              <span className="agenda-legend-bullet is-blocked" />
              <span>Desativado</span>
            </div>
          </div>
        </div>
      ) : (
        /* ===================================================================
           CONTEÚDO: MODO 2 - LISTA DE ATENDIMENTOS REAIS (COM FINALIZAR -> FINANCEIRO)
           =================================================================== */
        <div className="agenda-content-body">
          <div className="agenda-date-heading anim-stagger-item anim-delay-4">
            <div className="agenda-date-text-group">
              <h2 className="agenda-date-title">
                {CALENDAR_DAYS.find(d => d.id === selectedDayId)?.dayShort}, {CALENDAR_DAYS.find(d => d.id === selectedDayId)?.dayNum} de Outubro
              </h2>
              <p className="agenda-date-count">
                {currentDayAppointments.length} atendimento(s) agendado(s)
              </p>
            </div>

            <button
              type="button"
              className="agenda-today-btn"
              onClick={() => setSelectedDayId('2026-10-06')}
            >
              <CalendarTodayIcon className="agenda-today-icon" />
              <span>Hoje</span>
            </button>
          </div>

          <section className="agenda-cards-list" aria-label="Agendamentos do dia">
            {currentDayAppointments.length === 0 ? (
              <div className="agenda-empty-state">
                <p>Nenhum agendamento para este dia.</p>
                <button
                  type="button"
                  className="agenda-empty-add-btn"
                  onClick={() => setShowNewModal(true)}
                >
                  + Adicionar agendamento
                </button>
              </div>
            ) : (
              currentDayAppointments.map((item, idx) => {
                const { id, time, clientName, serviceTitle, duration, status, price } = item

                return (
                  <div
                    key={id || idx}
                    className="agenda-item-card anim-stagger-item"
                    style={{ animationDelay: `${0.1 + idx * 0.04}s` }}
                  >
                    {/* Horário */}
                    <div className="agenda-time-pill">
                      <span className="agenda-time-start">{time || '14:00'}</span>
                    </div>

                    {/* Avatar da Cliente */}
                    <div className="agenda-avatar-wrap">
                      <img
                        src={marianaImg}
                        alt=""
                        className="agenda-avatar-img"
                      />
                    </div>

                    {/* Informações: Nome da Cliente e Serviço */}
                    <div className="agenda-info-col">
                      <h3 className="agenda-client-name">{clientName || 'Cliente'}</h3>
                      <div className="agenda-service-row">
                        <span className="agenda-service-chip">
                          <span className="agenda-service-emoji">💅</span>
                          <span className="agenda-service-label">{serviceTitle || 'Alongamento'}</span>
                        </span>
                        <span className="agenda-duration-chip">
                          <ClockSmallIcon className="agenda-clock-icon" />
                          <span>{duration || '1h 30m'}</span>
                        </span>
                        <span className="agenda-price-chip">
                          {price || 'R$ 90,00'}
                        </span>
                      </div>
                    </div>

                    {/* Lado direito: Status e Botão Finalizar */}
                    <div className="agenda-right-actions">
                      {status === 'finalizado' ? (
                        <span className="agenda-status-badge is-finished">
                          <CheckIcon className="agenda-badge-icon" />
                          <span>Finalizado</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="agenda-btn-finish"
                          onClick={() => handleFinalizeAppointment(id)}
                          title="Finalizar atendimento e adicionar valor ao Financeiro"
                        >
                          <CheckSmallIcon />
                          <span>Recebido</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </section>
        </div>
      )}

      {/* ===================================================================
          Modal de Novo Agendamento
          =================================================================== */}
      {showNewModal && (
        <div className="agenda-modal-backdrop" onClick={() => setShowNewModal(false)}>
          <div
            className="agenda-modal-sheet"
            style={sheetStyle}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Novo agendamento"
          >
            <div className="agenda-modal-drag-area" {...handleProps}>
              <div className="agenda-modal-handle" />
            </div>

            <div className="agenda-modal-content">
              <h2 className="agenda-modal-title">Novo Agendamento</h2>
              <p className="agenda-modal-subtitle">Adicione um horário no seu salão</p>

              <form onSubmit={handleAddAppointment} className="agenda-modal-form">
                <div className="agenda-form-group">
                  <label>Nome da Cliente</label>
                  <input
                    type="text"
                    placeholder="Ex: Carla Mendes"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    required
                  />
                </div>

                <div className="agenda-form-group">
                  <label>WhatsApp da Cliente</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                  />
                </div>

                <div className="agenda-form-group">
                  <label>Serviço</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                  >
                    <option value="Alongamento em gel">Alongamento em gel (R$ 90,00)</option>
                    <option value="Banho de gel">Banho de gel (R$ 70,00)</option>
                    <option value="Manicure">Manicure (R$ 30,00)</option>
                    <option value="Pedicure">Pedicure (R$ 35,00)</option>
                    <option value="Nail art">Nail art (R$ 10,00)</option>
                  </select>
                </div>

                <div className="agenda-form-group">
                  <label>Horário</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                  />
                </div>

                <div className="agenda-modal-btns">
                  <button type="submit" className="agenda-modal-save-btn">
                    Salvar no Firebase
                  </button>
                  <button
                    type="button"
                    className="agenda-modal-cancel-btn"
                    onClick={() => setShowNewModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior Principal do App Admin */}
      <AppBottomNav activeTab="agenda" onNavigateTab={onNavigateTab} />
    </main>
  )
}
