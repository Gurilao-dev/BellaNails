import { useEffect, useMemo, useState } from 'react'
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
import { subscribeToClients, saveClient, getWhatsAppUrl } from '../firebase/services.js'
import './Clientes.css'

export default function Clientes({ onNavigateTab }) {
  const [activeTab, setActiveTab] = useState('clientes')
  const [activeFilter, setActiveFilter] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newCategory, setNewCategory] = useState('Frequente')
  const [saving, setSaving] = useState(false)

  // Arrastar para baixo para fechar modal
  const { sheetStyle, handleProps } = useBottomSheetDrag(() => setShowAddModal(false))

  // Escuta clientes reais no Firestore
  useEffect(() => {
    setLoading(true)
    const unsubscribe = subscribeToClients((realClients) => {
      setClients(realClients || [])
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Filtragem combinada por busca e categoria
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const name = c.name || ''
      const phone = c.phone || ''
      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.includes(searchQuery)

      if (!matchesSearch) return false

      const tags = Array.isArray(c.tags) ? c.tags : []
      if (activeFilter === 'vip') {
        return tags.some((t) => (typeof t === 'string' ? t.toLowerCase() === 'vip' : t.type === 'vip'))
      }
      if (activeFilter === 'frequentes') {
        return tags.some((t) => (typeof t === 'string' ? t.toLowerCase().includes('freq') : t.type === 'frequente'))
      }
      if (activeFilter === 'novas') {
        return tags.some((t) => (typeof t === 'string' ? t.toLowerCase().includes('nova') : t.type === 'nova'))
      }
      return true
    })
  }, [clients, searchQuery, activeFilter])

  const handleAddClient = async (e) => {
    e.preventDefault()
    if (!newName.trim() || saving) return

    setSaving(true)
    try {
      await saveClient({
        name: newName.trim(),
        phone: newPhone.trim(),
        tags: [
          newCategory === 'VIP'
            ? { label: 'VIP', type: 'vip', isVip: true }
            : { label: newCategory, type: newCategory.toLowerCase() },
        ],
      })
      setNewName('')
      setNewPhone('')
      setShowAddModal(false)
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err)
      alert('Erro ao salvar cliente no banco de dados. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const handleOpenWhatsApp = (phone, name) => {
    if (!phone) {
      alert('Cliente não possui telefone cadastrado.')
      return
    }
    const url = getWhatsAppUrl(phone, `Olá ${name}! Tudo bem? Sou do Bella Nails Studio.`)
    window.open(url, '_blank')
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

        {/* Subtítulo Dinâmico */}
        <div className="clientes-count-row anim-stagger-item anim-delay-4">
          <span className="clientes-count-text">
            {loading ? 'Carregando banco de dados...' : `${clients.length} cliente(s) cadastrada(s)`}
          </span>
        </div>
      </div>

      {/* Conteúdo rolável */}
      <div className="clientes-content-body">
        {loading ? (
          <div className="clientes-empty-state">
            <p>Carregando clientes do Firebase...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="clientes-empty-state">
            <div className="clientes-empty-icon">👥</div>
            <h3>Nenhuma cliente encontrada</h3>
            <p>
              {searchQuery
                ? 'Nenhum resultado para a busca digitada.'
                : 'Suas clientes aparecerão aqui assim que se cadastrarem no link de agendamento ou forem adicionadas manualmente!'}
            </p>
            <button
              type="button"
              className="agenda-modal-btn-save"
              style={{ marginTop: 14 }}
              onClick={() => setShowAddModal(true)}
            >
              + Adicionar Cliente
            </button>
          </div>
        ) : (
          /* ===================================================================
              Lista de Cards de Clientes Reais do Firestore
              =================================================================== */
          <section className="clientes-cards-list" aria-label="Lista de clientes cadastradas">
            {filteredClients.map((client, idx) => {
              const { id, name = 'Cliente', phone = '', avatar, tags = [] } = client
              const initial = name.trim().charAt(0).toUpperCase() || 'C'

              return (
                <div
                  key={id}
                  id={`cliente-card-${id}`}
                  className="clientes-card anim-stagger-item"
                  style={{ animationDelay: `${0.05 + idx * 0.03}s`, cursor: 'pointer' }}
                  onClick={() => handleOpenWhatsApp(phone, name)}
                  title="Clique para abrir WhatsApp da cliente"
                >
                  {/* Foto circular ou Monograma com inicial */}
                  <div className="clientes-avatar-wrap">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={`Foto de ${name}`}
                        className="clientes-avatar-img"
                      />
                    ) : (
                      <div className="clientes-avatar-initial">
                        {initial}
                      </div>
                    )}
                  </div>

                  {/* Informações da cliente (Nome, Telefone e Tags) */}
                  <div className="clientes-info">
                    <h2 className="clientes-name">{name}</h2>
                    <span className="clientes-phone">{phone || 'Sem telefone informado'}</span>

                    <div className="clientes-tags-row">
                      {Array.isArray(tags) && tags.length > 0 ? (
                        tags.map((tag, tIdx) => {
                          const tagLabel = typeof tag === 'string' ? tag : tag.label
                          const tagType = typeof tag === 'string' ? tag.toLowerCase() : tag.type
                          const isVip = typeof tag === 'object' && tag.isVip

                          return (
                            <span
                              key={tIdx}
                              className={`clientes-tag ${tagType || 'frequente'}`}
                            >
                              {isVip && (
                                <span className="clientes-vip-icon" aria-hidden="true">
                                  ✓
                                </span>
                              )}
                              {tagLabel}
                            </span>
                          )
                        })
                      ) : (
                        <span className="clientes-tag frequente">Cliente</span>
                      )}
                    </div>
                  </div>

                  {/* Ações: Ícone do WhatsApp e Seta */}
                  <div className="clientes-card-actions">
                    <button
                      type="button"
                      className="clientes-whatsapp-btn"
                      aria-label={`Conversar com ${name} no WhatsApp`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenWhatsApp(phone, name)
                      }}
                    >
                      <WhatsAppIcon className="clientes-whatsapp-icon" />
                    </button>

                    <button
                      type="button"
                      className="clientes-details-btn"
                      aria-label={`Abrir conversa de ${name}`}
                    >
                      <ChevronRightIcon className="clientes-chevron" />
                    </button>
                  </div>
                </div>
              )
            })}
          </section>
        )}
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
            <p className="clientes-modal-desc">Cadastre uma nova cliente no banco de dados real</p>

            <form onSubmit={handleAddClient} className="clientes-modal-form">
              <label className="clientes-modal-label">
                Nome completo
                <input
                  type="text"
                  placeholder="Ex: Amanda Silva"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="clientes-modal-input"
                  required
                />
              </label>

              <label className="clientes-modal-label">
                WhatsApp com DDD
                <input
                  type="tel"
                  placeholder="Ex: (11) 98765-4321"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="clientes-modal-input"
                  required
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
                  <option value="Nova">Nova Cliente</option>
                </select>
              </label>

              <div className="clientes-modal-actions">
                <button
                  type="button"
                  className="clientes-modal-btn-cancel"
                  onClick={() => setShowAddModal(false)}
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="clientes-modal-btn-save"
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : 'Salvar no Banco'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navegação Inferior Global */}
      <AppBottomNav activeTab="clientes" onTabChange={onNavigateTab} />
    </main>
  )
}
