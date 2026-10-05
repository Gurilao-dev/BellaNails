import { useState } from 'react'
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
  MoreVerticalIcon,
  CalendarTodayIcon,
} from '../icons.jsx'
import AppBottomNav from '../components/AppBottomNav.jsx'
import { useBottomSheetDrag } from '../hooks/useBottomSheetDrag.js'
import './Agenda.css'

const initialDays = [
  { id: 'seg', dayShort: 'Seg', dayNum: '06', month: 'out' },
  { id: 'ter', dayShort: 'Ter', dayNum: '07', month: 'out' },
  { id: 'qua', dayShort: 'Qua', dayNum: '08', month: 'out' },
  { id: 'qui', dayShort: 'Qui', dayNum: '09', month: 'out' },
  { id: 'sex', dayShort: 'Sex', dayNum: '10', month: 'out' },
]

const initialAppointments = [
  {
    id: 1,
    startTime: '08:00',
    endTime: '08:45',
    name: 'Mariana Silva',
    service: 'Manicure',
    duration: '45 min',
    status: 'Confirmado',
    statusType: 'confirmed',
    avatar: marianaImg,
  },
  {
    id: 2,
    startTime: '09:30',
    endTime: '10:30',
    name: 'Juliana Costa',
    service: 'Alongamento em gel',
    duration: '1h',
    status: 'Confirmado',
    statusType: 'confirmed',
    avatar: julianaImg,
  },
  {
    id: 3,
    startTime: '11:00',
    endTime: '11:50',
    name: 'Fernanda Lima',
    service: 'Pedicure',
    duration: '50 min',
    status: 'Pendente',
    statusType: 'pending',
    avatar: fernandaImg,
  },
  {
    id: 4,
    startTime: '13:00',
    endTime: '13:45',
    name: 'Patrícia Alves',
    service: 'Manicure',
    duration: '45 min',
    status: 'Confirmado',
    statusType: 'confirmed',
    avatar: patriciaImg,
  },
  {
    id: 5,
    startTime: '14:00',
    endTime: '14:50',
    name: 'Carla Mendes',
    service: 'Alongamento em gel',
    duration: '50 min',
    status: 'Confirmado',
    statusType: 'confirmed',
    avatar: carlaImg,
  },
  {
    id: 6,
    startTime: '16:00',
    endTime: '16:50',
    name: 'Beatriz Rocha',
    service: 'Manicure',
    duration: '50 min',
    status: 'Cancelado',
    statusType: 'cancelled',
    avatar: beatrizImg,
  },
  {
    id: 7,
    startTime: '17:00',
    endTime: '18:00',
    name: 'Camila Santos',
    service: 'Pedicure',
    duration: '1h',
    status: 'Confirmado',
    statusType: 'confirmed',
    avatar: camilaImg,
  },
]

export default function Agenda({ onNavigateTab }) {
  const [period, setPeriod] = useState('dia')
  const [selectedDay, setSelectedDay] = useState('seg')
  const [appointments, setAppointments] = useState(initialAppointments)
  const [showNewModal, setShowNewModal] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [newService, setNewService] = useState('Manicure')
  const [newDuration, setNewDuration] = useState('45 min')
  const [newStartTime, setNewStartTime] = useState('18:30')
  const [newEndTime, setNewEndTime] = useState('19:15')

  // Drag down to close handler for modal
  const { sheetStyle, handleProps } = useBottomSheetDrag(() => setShowNewModal(false))

  const handleAddAppointment = (e) => {
    e.preventDefault()
    if (!newClientName.trim()) return

    const newApt = {
      id: Date.now(),
      startTime: newStartTime,
      endTime: newEndTime,
      name: newClientName,
      service: newService,
      duration: newDuration || '45 min',
      status: 'Confirmado',
      statusType: 'confirmed',
      avatar: marianaImg,
    }

    setAppointments((prev) => [...prev, newApt])
    setNewClientName('')
    setShowNewModal(false)
  }

  return (
    <main className="screen agenda-screen">
      {/* ===================================================================
          Header e Seletor de Dias Fixos no Topo (Com o Wavy Graphic)
          =================================================================== */}
      <div className="agenda-sticky-top">
        <header className="agenda-header anim-stagger-item anim-delay-1">
          <div className="agenda-header-left">
            <div className="agenda-icon-wrap" aria-hidden="true">
              <CalendarIcon className="agenda-title-icon" />
            </div>
            <div className="agenda-title-group">
              <h1 className="agenda-title">Agenda</h1>
              <p className="agenda-subtitle">Seus atendimentos</p>
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
            <span>Novo agendamento</span>
          </button>
        </header>

        {/* Seletor de Período (Segmented Control: Dia, Semana, Mês) */}
        <div className="agenda-period-selector anim-stagger-item anim-delay-2" role="tablist" aria-label="Seletor de visualização">
          <button
            type="button"
            role="tab"
            aria-selected={period === 'dia'}
            className={`agenda-period-tab ${period === 'dia' ? 'is-active' : ''}`}
            onClick={() => setPeriod('dia')}
          >
            Dia
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={period === 'semana'}
            className={`agenda-period-tab ${period === 'semana' ? 'is-active' : ''}`}
            onClick={() => setPeriod('semana')}
          >
            Semana
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

        {/* Carrossel de Dias da Semana (< Seg Ter Qua Qui Sex >) */}
        <section className="agenda-days-strip anim-stagger-item anim-delay-3" aria-label="Dias da semana">
          <button
            type="button"
            className="agenda-nav-arrow"
            aria-label="Semana anterior"
          >
            <ChevronLeftIcon />
          </button>

          <div className="agenda-days-list">
            {initialDays.map((item) => {
              const isSelected = selectedDay === item.id
              return (
                <button
                  key={item.id}
                  id={`day-card-${item.id}`}
                  type="button"
                  className={`agenda-day-card ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setSelectedDay(item.id)}
                >
                  <span className="agenda-day-short">{item.dayShort}</span>
                  <span className="agenda-day-num">{item.dayNum}</span>
                  <span className="agenda-day-month">{item.month}</span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className="agenda-nav-arrow"
            aria-label="Próxima semana"
          >
            <ChevronRightIcon />
          </button>
        </section>
      </div>

      {/* ===================================================================
          Conteúdo Rolável em Card Branco com Topo Arredondado
          =================================================================== */}
      <div className="agenda-content-body">
        {/* Título da Data Selecionada e Botão Hoje */}
        <div className="agenda-date-heading anim-stagger-item anim-delay-4">
          <div className="agenda-date-text-group">
            <h2 className="agenda-date-title">Segunda-feira, 06 de Outubro</h2>
            <p className="agenda-date-count">
              {appointments.length} atendimentos
            </p>
          </div>

          <button type="button" className="agenda-today-btn" aria-label="Voltar para hoje">
            <CalendarTodayIcon className="agenda-today-icon" />
            <span>Hoje</span>
          </button>
        </div>

        {/* ===================================================================
            Lista de Agendamentos (Cards Idênticos ao Design de Referência)
            =================================================================== */}
        <section className="agenda-cards-list" aria-label="Agendamentos do dia">
          {appointments.map((item, idx) => {
            const { id, startTime, endTime, name, service, duration, status, statusType, avatar } = item

            return (
              <div
                key={id}
                id={`apt-card-${id}`}
                className="agenda-item-card anim-stagger-item"
                style={{ animationDelay: `${0.12 + idx * 0.04}s` }}
              >
                {/* Pílula de Horário à esquerda dentro do card */}
                <div className="agenda-time-pill">
                  <span className="agenda-time-start">{startTime}</span>
                  <span className="agenda-time-end">{endTime}</span>
                </div>

                {/* Avatar da Cliente */}
                <div className="agenda-avatar-wrap">
                  <img
                    src={avatar}
                    alt={`Foto de ${name}`}
                    className="agenda-avatar-img"
                  />
                </div>

                {/* Informações: Nome da Cliente e Serviço com duração */}
                <div className="agenda-info-col">
                  <h3 className="agenda-client-name">{name}</h3>
                  <div className="agenda-service-row">
                    <span className="agenda-service-chip">
                      <span className="agenda-service-emoji">💅</span>
                      <span className="agenda-service-label">{service}</span>
                    </span>
                    <span className="agenda-duration-chip">
                      <ClockSmallIcon className="agenda-clock-icon" />
                      <span>{duration || '45 min'}</span>
                    </span>
                  </div>
                </div>

                {/* Lado direito: Badge de Status, Menu de 3 Pontos e Chevron */}
                <div className="agenda-right-actions">
                  <span className={`agenda-status-badge is-${statusType}`}>
                    {statusType === 'confirmed' && <CheckSmallIcon className="agenda-badge-icon" />}
                    {statusType === 'pending' && <ClockSmallIcon className="agenda-badge-icon" />}
                    {statusType === 'cancelled' && <CloseSmallIcon className="agenda-badge-icon" />}
                    <span>{status}</span>
                  </span>

                  <button
                    type="button"
                    className="agenda-dots-btn"
                    aria-label={`Mais opções para ${name}`}
                  >
                    <MoreVerticalIcon />
                  </button>

                  <ChevronRightSmallIcon className="agenda-chevron-arrow" />
                </div>
              </div>
            )
          })}
        </section>
      </div>

      {/* ===================================================================
          Modal de Novo Agendamento com Suporte a Drag-to-Close
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
            {/* Área de arraste superior */}
            <div className="agenda-modal-drag-area" {...handleProps}>
              <div className="agenda-modal-handle" />
            </div>

            <h3 className="agenda-modal-title">Novo Agendamento</h3>
            <p className="agenda-modal-desc">Adicione um horário para segunda-feira, 06 de outubro</p>

            <form onSubmit={handleAddAppointment} className="agenda-modal-form">
              <label className="agenda-modal-label">
                <span>Nome da cliente</span>
                <input
                  type="text"
                  required
                  placeholder="Ex: Amanda Silva"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="agenda-modal-input"
                  autoFocus
                />
              </label>

              <label className="agenda-modal-label">
                <span>Serviço</span>
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="agenda-modal-select"
                >
                  <option value="Manicure">Manicure</option>
                  <option value="Pedicure">Pedicure</option>
                  <option value="Alongamento em gel">Alongamento em gel</option>
                  <option value="Nail art">Nail art</option>
                  <option value="Banho de gel">Banho de gel</option>
                </select>
              </label>

              <label className="agenda-modal-label">
                <span>Duração</span>
                <input
                  type="text"
                  placeholder="Ex: 45 min ou 1h"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="agenda-modal-input"
                />
              </label>

              <div className="agenda-modal-row">
                <label className="agenda-modal-label">
                  <span>Início</span>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="agenda-modal-input"
                  />
                </label>
                <label className="agenda-modal-label">
                  <span>Término</span>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="agenda-modal-input"
                  />
                </label>
              </div>

              <div className="agenda-modal-actions">
                <button
                  type="button"
                  className="agenda-modal-btn-cancel"
                  onClick={() => setShowNewModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="agenda-modal-btn-save">
                  Salvar agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior Flutuante */}
      <AppBottomNav activeTab="agenda" onNavigateTab={onNavigateTab} />
    </main>
  )
}
