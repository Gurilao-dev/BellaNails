import {
  CalendarAgendaHeaderIcon,
  CalendarIcon,
  HomeFilledIcon,
  HomeOutlineIcon,
  MoreHorizontalIcon,
  ServicesBagFilledIcon,
  ServicesBagIcon,
  UsersFilledIcon,
  UsersIcon,
} from '../icons.jsx'
import './AppBottomNav.css'

export default function AppBottomNav({ activeTab, onNavigateTab }) {
  return (
    <nav className="app-floating-nav" aria-label="Navegação principal">
      {/* 1. Início */}
      <button
        id="nav-tab-inicio"
        type="button"
        className={`app-nav-btn ${activeTab === 'inicio' ? 'is-active' : ''}`}
        onClick={() => onNavigateTab?.('inicio')}
        aria-label="Ir para Início"
      >
        <div className="app-nav-btn-content">
          {activeTab === 'inicio' ? (
            <HomeFilledIcon className="app-nav-icon is-filled" />
          ) : (
            <HomeOutlineIcon className="app-nav-icon" />
          )}
          <span className="app-nav-label">Início</span>
        </div>
      </button>

      {/* 2. Agenda */}
      <button
        id="nav-tab-agenda"
        type="button"
        className={`app-nav-btn ${activeTab === 'agenda' ? 'is-active' : ''}`}
        onClick={() => onNavigateTab?.('agenda')}
        aria-label="Ir para Agenda"
      >
        <div className="app-nav-btn-content">
          {activeTab === 'agenda' ? (
            <CalendarAgendaHeaderIcon className="app-nav-icon is-filled" />
          ) : (
            <CalendarIcon className="app-nav-icon" />
          )}
          <span className="app-nav-label">Agenda</span>
        </div>
      </button>

      {/* 3. Clientes */}
      <button
        id="nav-tab-clientes"
        type="button"
        className={`app-nav-btn ${activeTab === 'clientes' ? 'is-active' : ''}`}
        onClick={() => onNavigateTab?.('clientes')}
        aria-label="Ir para Clientes"
      >
        <div className="app-nav-btn-content">
          {activeTab === 'clientes' ? (
            <UsersFilledIcon className="app-nav-icon is-filled" />
          ) : (
            <UsersIcon className="app-nav-icon" />
          )}
          <span className="app-nav-label">Clientes</span>
        </div>
      </button>

      {/* 4. Serviços */}
      <button
        id="nav-tab-servicos"
        type="button"
        className={`app-nav-btn ${activeTab === 'servicos' ? 'is-active' : ''}`}
        onClick={() => onNavigateTab?.('servicos')}
        aria-label="Ir para Serviços"
      >
        <div className="app-nav-btn-content">
          {activeTab === 'servicos' ? (
            <ServicesBagFilledIcon className="app-nav-icon is-filled" />
          ) : (
            <ServicesBagIcon className="app-nav-icon" />
          )}
          <span className="app-nav-label">Serviços</span>
        </div>
      </button>

      {/* 5. Mais */}
      <button
        id="nav-tab-mais"
        type="button"
        className={`app-nav-btn ${activeTab === 'mais' ? 'is-active' : ''}`}
        onClick={() => onNavigateTab?.('mais')}
        aria-label="Mais opções e configurações"
      >
        <div className="app-nav-btn-content">
          <MoreHorizontalIcon className={`app-nav-icon ${activeTab === 'mais' ? 'is-filled' : ''}`} />
          <span className="app-nav-label">Mais</span>
        </div>
      </button>
    </nav>
  )
}
