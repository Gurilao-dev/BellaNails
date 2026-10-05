import { useState } from 'react'
import {
  ArrowIcon,
  CalendarHeartIcon,
  CalendarPlusIcon,
  ChevronLeftIcon,
  UtensilsIcon,
} from '../icons.jsx'
import './Step2Schedule.css'

const initialSchedule = [
  { id: 'seg', day: 'Segunda-feira', active: true, start: '09:00', end: '19:00', Icon: CalendarHeartIcon },
  { id: 'ter', day: 'Terça-feira', active: true, start: '09:00', end: '19:00', Icon: CalendarPlusIcon },
  { id: 'qua', day: 'Quarta-feira', active: true, start: '09:00', end: '19:00', Icon: CalendarHeartIcon },
  { id: 'qui', day: 'Quinta-feira', active: true, start: '09:00', end: '19:00', Icon: CalendarPlusIcon },
  { id: 'sex', day: 'Sexta-feira', active: true, start: '09:00', end: '19:00', Icon: CalendarPlusIcon },
  { id: 'sab', day: 'Sábado', active: true, start: '08:00', end: '16:00', Icon: CalendarHeartIcon },
  { id: 'dom', day: 'Domingo', active: false, start: '09:00', end: '14:00', Icon: CalendarHeartIcon },
]

export default function Step2Schedule({ onBack, onContinue }) {
  const [schedule, setSchedule] = useState(initialSchedule)
  const [lunchBreak, setLunchBreak] = useState({
    active: true,
    start: '12:00',
    end: '13:00',
  })
  const [saturdayBooking, setSaturdayBooking] = useState(true)

  const toggleDay = (id) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    )
  }

  const handleTimeChange = (id, field, value) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onContinue?.({ schedule, lunchBreak, saturdayBooking })
  }

  return (
    <main className="screen sched-screen">
      {/* Topo: seta voltar + Passo 2 de 6 + 6 barras de progresso */}
      <header className="sched-header">
        <button
          id="sched-back-button"
          className="sched-back-btn"
          type="button"
          onClick={onBack}
          aria-label="Voltar para o passo anterior"
        >
          <ChevronLeftIcon />
        </button>

        <div className="sched-progress-wrap">
          <span className="sched-count-text">Passo 2 de 6</span>
          <div className="sched-bars" aria-label="Progresso: Passo 2 de 6">
            <span className="sched-bar active" />
            <span className="sched-bar active" />
            <span className="sched-bar" />
            <span className="sched-bar" />
            <span className="sched-bar" />
            <span className="sched-bar" />
          </div>
        </div>
      </header>

      {/* Título elegante e Descrição */}
      <section className="sched-intro">
        <h1 className="sched-title">Horário de funcionamento</h1>
        <p className="sched-desc">
          Defina os horários de atendimento do seu salão.
        </p>
      </section>

      {/* Formulário com os dias e configurações */}
      <form className="sched-form" onSubmit={handleSubmit}>
        {/* Card Principal: Lista de dias da semana (Segunda a Domingo) */}
        <section className="sched-main-card" aria-label="Dias de atendimento">
          {schedule.map((item) => {
            const { id, day, active, start, end, Icon } = item
            return (
              <div
                key={id}
                id={`day-row-${id}`}
                className={`sched-day-row ${active ? 'is-active' : 'is-inactive'}`}
              >
                {/* Linha superior: Ícone + Nome do Dia + Toggle Switch */}
                <div className="sched-row-top">
                  <div className="sched-day-meta">
                    <span className="sched-icon-wrapper">
                      <Icon className="sched-day-icon" />
                    </span>
                    <span className="sched-day-label">{day}</span>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={active}
                    aria-label={`Ativar atendimento para ${day}`}
                    className={`sched-switch ${active ? 'is-on' : 'is-off'}`}
                    onClick={() => toggleDay(id)}
                  >
                    <span className="switch-thumb" />
                  </button>
                </div>

                {/* Linha inferior: Caixas de horário calibradas ou "Fechado" */}
                <div className="sched-row-times">
                  {active ? (
                    <>
                      <input
                        type="text"
                        className="sched-time-box"
                        value={start}
                        onChange={(e) => handleTimeChange(id, 'start', e.target.value)}
                        aria-label={`Horário de início para ${day}`}
                      />
                      <span className="sched-time-sep">às</span>
                      <input
                        type="text"
                        className="sched-time-box"
                        value={end}
                        onChange={(e) => handleTimeChange(id, 'end', e.target.value)}
                        aria-label={`Horário de término para ${day}`}
                      />
                    </>
                  ) : (
                    <>
                      <div className="sched-time-box is-closed">Fechado</div>
                      <span className="sched-time-sep is-hidden" aria-hidden="true">às</span>
                      <div className="sched-time-box is-closed">Fechado</div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </section>

        {/* Card Secundário: Intervalo para almoço */}
        <section className="sched-card sched-lunch-section" aria-label="Intervalo para almoço">
          <div className="sched-row-top">
            <div className="sched-day-meta">
              <span className="sched-icon-wrapper">
                <UtensilsIcon className="sched-day-icon" />
              </span>
              <span className="sched-day-label">Intervalo para almoço</span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={lunchBreak.active}
              aria-label="Ativar intervalo para almoço"
              className={`sched-switch ${lunchBreak.active ? 'is-on' : 'is-off'}`}
              onClick={() =>
                setLunchBreak((prev) => ({ ...prev, active: !prev.active }))
              }
            >
              <span className="switch-thumb" />
            </button>
          </div>

          <div className="sched-row-times">
            {lunchBreak.active ? (
              <>
                <input
                  type="text"
                  className="sched-time-box"
                  value={lunchBreak.start}
                  onChange={(e) =>
                    setLunchBreak((prev) => ({ ...prev, start: e.target.value }))
                  }
                  aria-label="Início do almoço"
                />
                <span className="sched-time-sep">às</span>
                <input
                  type="text"
                  className="sched-time-box"
                  value={lunchBreak.end}
                  onChange={(e) =>
                    setLunchBreak((prev) => ({ ...prev, end: e.target.value }))
                  }
                  aria-label="Término do almoço"
                />
              </>
            ) : (
              <div className="sched-time-box is-closed full">Sem intervalo</div>
            )}
          </div>
        </section>

        {/* Card Terciário: Atender aos sábados */}
        <section className="sched-card sched-saturday-section" aria-label="Atender aos sábados">
          <div className="sched-row-top">
            <div className="sched-day-meta">
              <span className="sched-icon-wrapper">
                <CalendarPlusIcon className="sched-day-icon" />
              </span>
              <div className="sched-saturday-text">
                <span className="sched-day-label">Atender aos sábados</span>
                <span className="sched-day-sub">Permitir agendamentos aos sábados</span>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={saturdayBooking}
              aria-label="Permitir agendamentos aos sábados"
              className={`sched-switch ${saturdayBooking ? 'is-on' : 'is-off'}`}
              onClick={() => setSaturdayBooking((prev) => !prev)}
            >
              <span className="switch-thumb" />
            </button>
          </div>
        </section>

        {/* Botões de Ação Inferiores: proporções exatas do design (~38% Voltar / ~62% Continuar) */}
        <footer className="sched-actions">
          <button
            id="sched-back-action"
            type="button"
            className="sched-btn-back"
            onClick={onBack}
          >
            Voltar
          </button>

          <button
            id="sched-continue-action"
            type="submit"
            className="sched-btn-continue"
          >
            <span>Continuar</span>
            <ArrowIcon className="sched-btn-arrow" />
          </button>
        </footer>
      </form>
    </main>
  )
}
