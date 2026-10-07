import { useState, useEffect } from 'react'
import { CalendarIcon, CalendarPlusIcon } from '../../icons.jsx'
import './ClientBottomNav.css'

export default function ClientBottomNav({ activeTab = 'book', onTabChange }) {
  const [currentTab, setCurrentTab] = useState(activeTab)

  useEffect(() => {
    setCurrentTab(activeTab)
  }, [activeTab])

  const handleClick = (tab) => {
    if (tab === currentTab) return
    setCurrentTab(tab)
    if (onTabChange) {
      setTimeout(() => {
        onTabChange(tab)
      }, 260)
    }
  }

  return (
    <nav className="cbn-floating-bar" aria-label="Navegação do cliente">
      {/* Pílula Deslizante com Curva Elástica */}
      <div
        className={`cbn-sliding-pill ${currentTab === 'book' ? 'is-book-active' : 'is-appts-active'}`}
        aria-hidden="true"
      >
        <span className="cbn-pill-indicator" />
      </div>

      {/* Aba 1: Agendamentos */}
      <button
        type="button"
        className={`cbn-tab-btn ${currentTab === 'appointments' ? 'is-active' : ''}`}
        onClick={() => handleClick('appointments')}
        role="tab"
        aria-selected={currentTab === 'appointments'}
      >
        <CalendarIcon className="cbn-tab-icon" />
        <span className="cbn-tab-label">Agendamentos</span>
      </button>

      {/* Aba 2: Agendar */}
      <button
        type="button"
        className={`cbn-tab-btn ${currentTab === 'book' ? 'is-active' : ''}`}
        onClick={() => handleClick('book')}
        role="tab"
        aria-selected={currentTab === 'book'}
      >
        <CalendarPlusIcon className="cbn-tab-icon" />
        <span className="cbn-tab-label">Agendar</span>
      </button>
    </nav>
  )
}
