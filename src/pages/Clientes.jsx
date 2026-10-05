import { useMemo, useState } from 'react'
import marianaImg from '../assets/clientes/cliente-mariana.png'
import julianaImg from '../assets/clientes/cliente-juliana.png'
import fernandaImg from '../assets/clientes/cliente-fernanda.png'
import patriciaImg from '../assets/clientes/cliente-patricia.png'
import carlaImg from '../assets/clientes/cliente-carla.png'
import beatrizImg from '../assets/clientes/cliente-beatriz.png'
import camilaImg from '../assets/clientes/cliente-camila.png'
import {
  CalendarIcon,
  ChevronRightIcon,
  FilterSlidersIcon,
  HomeFilledIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  ShoppingBagIcon,
  UsersFilledIcon,
  UsersIcon,
  WhatsAppIcon,
} from '../icons.jsx'
import AppBottomNav from '../components/AppBottomNav.jsx'
import { useBottomSheetDrag } from '../hooks/useBottomSheetDrag.js'
import './Clientes.css'


const initialClients = [
  {
    id: 1,
    name: 'Mariana Silva',
    phone: '(11) 91234-5678',
    avatar: marianaImg,
    tags: [
      { label: 'VIP', type: 'vip', isVip: true },
      { label: 'Frequente', type: 'frequente' },
    ],
  },
  {
    id: 2,
    name: 'Juliana Costa',
    phone: '(11) 98765-4321',
    avatar: julianaImg,
    tags: [
      { label: 'Frequente', type: 'frequente' },
    ],
  },
  {
    id: 3,
    name: 'Fernanda Lima',
    phone: '(11) 99123-4567',
    avatar: fernandaImg,
    tags: [
      { label: 'Nova', type: 'nova' },
    ],
  },
  {
    id: 4,
    name: 'Patrícia Alves',
    phone: '(11) 98877-6655',
    avatar: patriciaImg,
    tags: [
      { label: 'VIP', type: 'vip', isVip: true },
      { label: 'Frequente', type: 'frequente' },
    ],
  },
  {
    id: 5,
    name: 'Carla Mendes',
    phone: '(11) 99777-8899',
    avatar: carlaImg,
    tags: [
      { label: 'Frequente', type: 'frequente' },
    ],
  },
  {
    id: 6,
    name: 'Beatriz Rocha',
    phone: '(11) 99911-2233',
    avatar: beatrizImg,
    tags: [
      { label: 'Nova', type: 'nova' },
    ],
  },
  {
    id: 7,
    name: 'Camila Santos',
    phone: '(11) 98222-3344',
    avatar: camilaImg,
    tags: [
      { label: 'VIP', type: 'vip', isVip: true },
      { label: 'Frequente', type: 'frequente' },
    ],
  },
]

export default function Clientes({ onNavigateTab }) {
  const [activeTab, setActiveTab] = useState('clientes')
  const [activeFilter, setActiveFilter] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [clients, setClients] = useState(initialClients)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newCategory, setNewCategory] = useState('Frequente')

  // Arrastar para baixo para fechar modal
  const { sheetStyle, handleProps } = useBottomSheetDrag(() => setShowAddModal(false))


  // Filtragem combinada por busca e aba (Todos, VIP, Frequentes, Novas)
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)

      if (!matchesSearch) return false

      if (activeFilter === 'vip') {
        return c.tags.some((t) => t.type === 'vip')
      }
      if (activeFilter === 'frequentes') {
        return c.tags.some((t) => t.type === 'frequente')
      }
      if (activeFilter === 'novas') {
        return c.tags.some((t) => t.type === 'nova')
      }
      return true
    })
  }, [clients, searchQuery, activeFilter])

  const handleAddClient = (e) => {
    e.preventDefault()
    if (!newName.trim()) return

    const newClient = {
      id: Date.now(),
      name: newName,
      phone: newPhone || '(11) 90000-0000',
      avatar: marianaImg,
      tags:
        newCategory === 'VIP'
          ? [
              { label: 'VIP', type: 'vip', isVip: true },
              { label: 'Frequente', type: 'frequente' },
            ]
          : [{ label: newCategory, type: newCategory.toLowerCase() }],
    }

    setClients((prev) => [newClient, ...prev])
    setNewName('')
    setNewPhone('')
    setShowAddModal(false)
  }

  const handleOpenWhatsApp = (phone, name) => {
    const cleanNumber = phone.replace(/\D/g, '')
    const msg = encodeURIComponent(`Olá, ${name}! Tudo bem? Entramos em contato do Bella Nails.`)
    window.open(`https://wa.me/55${cleanNumber}?text=${msg}`, '_blank')
  }

  return (
    <main className="screen clientes-screen">
      {/* ===================================================================
          Header e Filtros Fixos no Topo (Sticky)
          =================================================================== */}
      <div className="clientes-sticky-top">
        <header className="clientes-header anim-stagger-item anim-delay-1">
          <div className="clientes-header-left">
            <div className="clientes-icon-wrap" aria-hidden="true">
              <UsersIcon className="clientes-title-icon" />
            </div>
            <h1 className="clientes-title">Clientes</h1>
          </div>

          <button
            id="clientes-add-button"
            type="button"
            className="clientes-add-btn"
            aria-label="Cadastrar nova cliente"
            onClick={() => setShowAddModal(true)}
          >
            <PlusIcon />
          </button>
        </header>

        {/* Barra de Busca com Ícone de Lupa */}
        <div className="clientes-search-wrap anim-stagger-item anim-delay-2">
          <SearchIcon className="clientes-search-icon" />
          <input
            id="clientes-search-input"
            type="search"
            placeholder="Buscar cliente por nome ou telefone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="clientes-search-input"
          />
        </div>

        {/* Filtros em Pílula (Todos, VIP, Frequentes, Novas) + Botão de Filtro */}
        <div className="clientes-filters-row anim-stagger-item anim-delay-3" role="tablist" aria-label="Filtrar clientes">
          <div className="clientes-pills-list">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'todos'}
              className={`clientes-filter-pill ${activeFilter === 'todos' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('todos')}
            >
              Todos
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'vip'}
              className={`clientes-filter-pill ${activeFilter === 'vip' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('vip')}
            >
              VIP
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'frequentes'}
              className={`clientes-filter-pill ${activeFilter === 'frequentes' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('frequentes')}
            >
              Frequentes
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'novas'}
              className={`clientes-filter-pill ${activeFilter === 'novas' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('novas')}
            >
              Novas
            </button>
          </div>

          <button
            type="button"
            className="clientes-filter-btn"
            aria-label="Abrir opções de filtro"
            onClick={() => setActiveFilter('todos')}
          >
            <FilterSlidersIcon />
          </button>
        </div>

        {/* Subtítulo: "32 clientes cadastradas" */}
        <div className="clientes-count-row anim-stagger-item anim-delay-4">
          <span className="clientes-count-text">32 clientes cadastradas</span>
        </div>
      </div>

      {/* Conteúdo rolável */}
      <div className="clientes-content-body">
        {/* ===================================================================
            Lista de Cards de Clientes
            =================================================================== */}
        <section className="clientes-cards-list" aria-label="Lista de clientes cadastradas">
          {filteredClients.map((client, idx) => {
            const { id, name, phone, avatar, tags } = client

            return (
              <div
                key={id}
                id={`cliente-card-${id}`}
                className="clientes-card anim-stagger-item"
                style={{ animationDelay: `${0.18 + idx * 0.05}s` }}
              >
                {/* Foto circular da cliente */}
                <div className="clientes-avatar-wrap">
                  <img
                    src={avatar}
                    alt={`Foto de ${name}`}
                    className="clientes-avatar-img"
                  />
                </div>

                {/* Informações da cliente (Nome, Telefone e Tags) */}
                <div className="clientes-info">
                  <h2 className="clientes-name">{name}</h2>
                  <span className="clientes-phone">{phone}</span>

                  <div className="clientes-tags-row">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`clientes-tag ${tag.type}`}
                      >
                        {tag.isVip && (
                          <span className="clientes-vip-icon" aria-hidden="true">
                            ✓
                          </span>
                        )}
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ações: Ícone do WhatsApp e Seta */}
                <div className="clientes-card-actions">
                  <button
                    type="button"
                    className="clientes-whatsapp-btn"
                    aria-label={`Conversar com ${name} no WhatsApp`}
                    onClick={() => handleOpenWhatsApp(phone, name)}
                  >
                    <WhatsAppIcon className="clientes-whatsapp-icon" />
                  </button>

                  <button
                    type="button"
                    className="clientes-details-btn"
                    aria-label={`Ver perfil de ${name}`}
                  >
                    <ChevronRightIcon className="clientes-chevron" />
                  </button>
                </div>
              </div>
            )
          })}
        </section>
      </div>

      {/* ===================================================================
          Modal Bottom Sheet: Cadastrar Nova Cliente
          =================================================================== */}
      {showAddModal && (
        <div className="clientes-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div
            className="clientes-modal-sheet"
            style={sheetStyle}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Cadastrar nova cliente"
          >
            <div className="clientes-modal-drag-zone" {...handleProps}>
              <div className="clientes-modal-handle" />
            </div>
            <h3 className="clientes-modal-title">Nova Cliente</h3>
            <p className="clientes-modal-desc">Cadastre uma nova cliente no Bella Nails</p>

            <form onSubmit={handleAddClient} className="clientes-modal-form">
              <label className="clientes-modal-label">
                Nome completo
                <input
                  type="text"
                  required
                  placeholder="Ex: Amanda Silva"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="clientes-modal-input"
                  autoFocus
                />
              </label>

              <label className="clientes-modal-label">
                WhatsApp / Telefone
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="clientes-modal-input"
                />
              </label>

              <label className="clientes-modal-label">
                Categoria
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="clientes-modal-select"
                >
                  <option value="VIP">VIP</option>
                  <option value="Frequente">Frequente</option>
                  <option value="Nova">Nova</option>
                </select>
              </label>

              <div className="clientes-modal-actions">
                <button
                  type="button"
                  className="clientes-modal-btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="clientes-modal-btn-save">
                  Salvar cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior Flutuante */}
      <AppBottomNav activeTab="clientes" onNavigateTab={onNavigateTab} />
    </main>
  )
}
