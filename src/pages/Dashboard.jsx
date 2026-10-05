import { useState } from 'react'
import anaImg from '../assets/dashboard/ana.png'
import bannerImg from '../assets/dashboard/banner.png'
import marianaImg from '../assets/dashboard/client-mariana.png'
import julianaImg from '../assets/dashboard/client-juliana.png'
import fernandaImg from '../assets/dashboard/client-fernanda.png'
import carlaImg from '../assets/dashboard/client-carla.png'
import {
  CalendarHeartIcon,
  CalendarIcon,
  CheckCircleFilledIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CoinIcon,
  FinanceBarsIcon,
  HomeFilledIcon,
  MenuIcon,
  MoreHorizontalIcon,
  ShoppingBagIcon,
  UsersIcon,
} from '../icons.jsx'
import AppBottomNav from '../components/AppBottomNav.jsx'
import './Dashboard.css'

const appointments = [
  {
    id: 1,
    time: '08:00',
    name: 'Mariana Silva',
    service: 'Manicure',
    status: 'Confirmado',
    statusType: 'confirmed',
    avatar: marianaImg,
  },
  {
    id: 2,
    time: '09:30',
    name: 'Juliana Costa',
    service: 'Alongamento em gel',
    status: 'Confirmado',
    statusType: 'confirmed',
    avatar: julianaImg,
  },
  {
    id: 3,
    time: '11:00',
    name: 'Fernanda Lima',
    service: 'Pedicure',
    status: 'Pendente',
    statusType: 'pending',
    avatar: fernandaImg,
  },
  {
    id: 4,
    time: '14:00',
    name: 'Carla Mendes',
    service: 'Nail art',
    status: 'Confirmado',
    statusType: 'confirmed',
    avatar: carlaImg,
  },
]

export default function Dashboard({ onNavigateTab }) {
  const [activeTab, setActiveTab] = useState('inicio')
  const [showMaisModal, setShowMaisModal] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)

  return (
    <main className="screen dash-screen">
      {/* ===================================================================
          Header Superior: Logo Centralizado + Menu Hambúrguer à Direita
          =================================================================== */}
      <header className="dash-header anim-stagger-item anim-delay-1">
        <div className="dash-header-spacer" aria-hidden="true" />

        <div className="dash-logo">
          <span className="dash-logo-title">Bella Nails</span>
          <span className="dash-logo-sub">STUDIO DE UNHAS</span>
        </div>

        <button
          id="dash-menu-button"
          type="button"
          className="dash-menu-btn"
          aria-label="Abrir menu"
          onClick={() => setShowSideMenu((v) => !v)}
        >
          <MenuIcon />
        </button>
      </header>

      {/* Container de Conteúdo com Rolagem */}
      <div className="dash-content-body">
        {/* ===================================================================
            Seção de Saudação: Olá, Ana! + Foto e Cargo
            =================================================================== */}
        <section className="dash-greeting-section anim-stagger-item anim-delay-2">
          <div className="dash-greeting-left">
            <h1 className="dash-greeting-title">
              Olá, Ana! <span className="dash-wave">👋</span>
            </h1>
            <p className="dash-greeting-sub">Que bom te ver por aqui!</p>
          </div>

          <div className="dash-profile-right">
            <div className="dash-avatar-halo">
              <img
                src={anaImg}
                alt="Foto de perfil de Ana Paula"
                className="dash-avatar-img"
              />
            </div>
            <button
              type="button"
              className="dash-role-badge"
              aria-label="Selecionar perfil"
            >
              <span>Proprietária</span>
              <ChevronDownIcon className="dash-role-chevron" />
            </button>
          </div>
        </section>

        {/* ===================================================================
            Seção: Resumo do dia (Data + 3 Cards de Métricas)
            =================================================================== */}
        <section className="dash-summary-section anim-stagger-item anim-delay-3" aria-label="Resumo do dia">
          <div className="dash-summary-header">
            <h2 className="dash-summary-date">Segunda-feira, 06 de Outubro</h2>
            <p className="dash-summary-desc">Aqui está o resumo do seu dia</p>
          </div>

          <div className="dash-stats-grid">
            {/* Card 1: Agendamentos hoje */}
            <div className="dash-stat-card anim-stagger-item anim-delay-3">
              <div className="dash-stat-icon-wrap">
                <CalendarHeartIcon className="dash-stat-icon" />
              </div>
              <span className="dash-stat-number">8</span>
              <span className="dash-stat-label">
                Agendamentos
                <br />
                hoje
              </span>
            </div>

            {/* Card 2: Confirmados */}
            <div className="dash-stat-card anim-stagger-item anim-delay-4">
              <div className="dash-stat-icon-wrap">
                <CheckCircleFilledIcon className="dash-stat-icon" />
              </div>
              <span className="dash-stat-number">6</span>
              <span className="dash-stat-label">Confirmados</span>
            </div>

            {/* Card 3: Faturamento do dia (Acesso rápido ao Financeiro) */}
            <button
              id="dash-stat-financeiro"
              type="button"
              className="dash-stat-card is-interactive anim-stagger-item anim-delay-5"
              onClick={() => onNavigateTab?.('financeiro')}
              title="Acessar painel Financeiro completo"
            >
              <div className="dash-stat-icon-wrap">
                <CoinIcon className="dash-stat-icon" />
              </div>
              <span className="dash-stat-number is-money">R$ 420,00</span>
              <span className="dash-stat-label">
                Faturamento
                <br />
                do dia
              </span>
              <span className="dash-stat-badge-link">
                <span>Ver finanças</span>
                <span className="dash-arrow-small">↗</span>
              </span>
            </button>
          </div>
        </section>

        {/* ===================================================================
            Banner Atalho Especial: Acesso ao Painel Financeiro
            =================================================================== */}
        <section
          className="dash-finance-access-card anim-stagger-item anim-delay-5"
          onClick={() => onNavigateTab?.('financeiro')}
          role="button"
          tabIndex={0}
          aria-label="Abrir painel financeiro"
        >
          <div className="dash-finance-left">
            <div className="dash-finance-icon-box" aria-hidden="true">
              <FinanceBarsIcon className="dash-finance-access-icon" />
            </div>
            <div className="dash-finance-info">
              <div className="dash-finance-headline">
                <strong className="dash-finance-title">Painel Financeiro</strong>
                <span className="dash-finance-tag-new">Novo</span>
              </div>
              <span className="dash-finance-desc">Faturamento do mês, ticket médio e relatórios</span>
            </div>
          </div>
          <div className="dash-finance-action">
            <span className="dash-finance-action-text">Acessar</span>
            <ChevronRightIcon className="dash-finance-action-chevron" />
          </div>
        </section>

        {/* ===================================================================
            Card Banner Motivacional: Foto + Frase
            =================================================================== */}
        <section className="dash-banner-section anim-stagger-item anim-delay-6" aria-label="Mensagem inspiradora">
          <div className="dash-banner-wrap">
            <img
              src={bannerImg}
              alt="Unhas com esmaltação e frase: Cada atendimento transforma histórias"
              className="dash-banner-img"
            />
          </div>
        </section>

        {/* ===================================================================
            Seção: Próximos atendimentos
            =================================================================== */}
        <section className="dash-appointments-section anim-stagger-item anim-delay-7" aria-label="Próximos atendimentos">
          <div className="dash-appointments-header">
            <h2 className="dash-appointments-title">Próximos atendimentos</h2>
            <button
              type="button"
              className="dash-see-all-btn"
              onClick={() => {
                setActiveTab('agenda')
                onNavigateTab?.('agenda')
              }}
            >
              <span>Ver agenda</span>
              <span className="dash-arrow">→</span>
            </button>
          </div>

          <div className="dash-appointments-list">
            {appointments.map((item, idx) => {
              const { id, time, name, service, status, statusType, avatar } = item

              return (
                <div
                  key={id}
                  id={`apt-card-${id}`}
                  className="dash-apt-card anim-stagger-item"
                  style={{ animationDelay: `${0.25 + idx * 0.06}s` }}
                >
                  {/* Horário */}
                  <span className="dash-apt-time">{time}</span>

                  {/* Avatar do cliente */}
                  <div className="dash-apt-avatar">
                    <img
                      src={avatar}
                      alt={`Foto de ${name}`}
                      className="dash-apt-avatar-img"
                    />
                  </div>

                  {/* Nome e Serviço */}
                  <div className="dash-apt-info">
                    <h3 className="dash-apt-name">{name}</h3>
                    <span className="dash-apt-service">{service}</span>
                  </div>

                  {/* Badge de Status (Confirmado ou Pendente) */}
                  <span className={`dash-apt-status ${statusType}`}>
                    {status}
                  </span>

                  {/* Seta indicativa */}
                  <ChevronRightIcon className="dash-apt-chevron" />
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Barra de Navegação Inferior Flutuante */}
      <AppBottomNav activeTab="inicio" onNavigateTab={onNavigateTab} />

      {/* ===================================================================
          Modal Bottom Sheet "Mais" com Acesso ao Financeiro
          =================================================================== */}
      {(showMaisModal || showSideMenu) && (
        <div
          className="dash-modal-backdrop"
          onClick={() => {
            setShowMaisModal(false)
            setShowSideMenu(false)
          }}
        >
          <div
            className="dash-modal-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Menu de opções"
          >
            <div className="dash-sheet-handle" />
            <h3 className="dash-sheet-title">Recursos do Studio</h3>

            <div className="dash-sheet-links">
              <button
                type="button"
                className="dash-sheet-link-btn is-highlight"
                onClick={() => {
                  setShowMaisModal(false)
                  setShowSideMenu(false)
                  onNavigateTab?.('financeiro')
                }}
              >
                <div className="dash-sheet-link-icon-wrap is-finance">
                  <FinanceBarsIcon className="dash-sheet-link-icon" />
                </div>
                <div className="dash-sheet-link-text">
                  <strong>Painel Financeiro</strong>
                  <span>Faturamento, despesas, métricas e relatórios</span>
                </div>
                <ChevronRightIcon className="dash-sheet-chevron" />
              </button>

              <button
                type="button"
                className="dash-sheet-link-btn"
                onClick={() => {
                  setShowMaisModal(false)
                  setShowSideMenu(false)
                  onNavigateTab?.('agenda')
                }}
              >
                <div className="dash-sheet-link-icon-wrap">
                  <CalendarIcon className="dash-sheet-link-icon" />
                </div>
                <div className="dash-sheet-link-text">
                  <strong>Agenda Completa</strong>
                  <span>Ver todos os horários e atendimentos</span>
                </div>
                <ChevronRightIcon className="dash-sheet-chevron" />
              </button>

              <button
                type="button"
                className="dash-sheet-link-btn"
                onClick={() => {
                  setShowMaisModal(false)
                  setShowSideMenu(false)
                  onNavigateTab?.('clientes')
                }}
              >
                <div className="dash-sheet-link-icon-wrap">
                  <UsersIcon className="dash-sheet-link-icon" />
                </div>
                <div className="dash-sheet-link-text">
                  <strong>Clientes & Histórico</strong>
                  <span>Ficha de clientes e WhatsApp</span>
                </div>
                <ChevronRightIcon className="dash-sheet-chevron" />
              </button>

              <button
                type="button"
                className="dash-sheet-link-btn"
                onClick={() => {
                  setShowMaisModal(false)
                  setShowSideMenu(false)
                  onNavigateTab?.('servicos')
                }}
              >
                <div className="dash-sheet-link-icon-wrap">
                  <ShoppingBagIcon className="dash-sheet-link-icon" />
                </div>
                <div className="dash-sheet-link-text">
                  <strong>Catálogo de Serviços</strong>
                  <span>Gerenciar preços e durações</span>
                </div>
                <ChevronRightIcon className="dash-sheet-chevron" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
