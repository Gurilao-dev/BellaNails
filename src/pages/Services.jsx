import { useMemo, useState } from 'react'
import manicureImg from '../assets/services/manicure.png'
import pedicureImg from '../assets/services/pedicure.png'
import alongamentoImg from '../assets/services/alongamento.png'
import banhoImg from '../assets/services/banho.png'
import nailartImg from '../assets/services/nailart.png'
import logoImg from '../assets/logo.png'
import AppBottomNav from '../components/AppBottomNav.jsx'
import {
  BlossomIcon,
  CameraIcon,
  ClockIcon,
  FilterSlidersIcon,
  Grid2x2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  PriceTagIcon,
  SearchIcon,
} from '../icons.jsx'
import { useBottomSheetDrag } from '../hooks/useBottomSheetDrag.js'
import './Services.css'

const PRESET_IMAGES = [
  { name: 'Manicure', img: manicureImg },
  { name: 'Pedicure', img: pedicureImg },
  { name: 'Alongamento', img: alongamentoImg },
  { name: 'Banho de gel', img: banhoImg },
  { name: 'Nail art', img: nailartImg },
]



const initialServices = [
  {
    id: 1,
    name: 'Manicure',
    description: 'Cuidado das suas unhas com muito mais brilho.',
    duration: '45 min',
    price: 'R$ 30,00',
    image: manicureImg,
    active: true,
  },
  {
    id: 2,
    name: 'Pedicure',
    description: 'Bem-estar e beleza dos pés.',
    duration: '50 min',
    price: 'R$ 35,00',
    image: pedicureImg,
    active: true,
  },
  {
    id: 3,
    name: 'Alongamento em gel',
    description: 'Unhas mais fortes e duradouras.',
    duration: '1h 30 min',
    price: 'R$ 90,00',
    image: alongamentoImg,
    active: true,
  },
  {
    id: 4,
    name: 'Banho de gel',
    description: 'Brilho e resistência para suas unhas.',
    duration: '1h 00 min',
    price: 'R$ 70,00',
    image: banhoImg,
    active: true,
  },
  {
    id: 5,
    name: 'Nail art',
    description: 'Detalhes que fazem a diferença.',
    duration: '15 min',
    price: 'R$ 10,00',
    image: nailartImg,
    active: true,
  },
]

export default function Services({ onNavigateTab }) {
  const [filter, setFilter] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [services, setServices] = useState(initialServices)

  // Estado do Modal de Criar / Editar
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formDuration, setFormDuration] = useState('45 min')
  const [formPrice, setFormPrice] = useState('R$ 30,00')
  const [formImage, setFormImage] = useState(manicureImg)

  // Arrastar para baixo para fechar modal
  const { sheetStyle, handleProps } = useBottomSheetDrag(() => setShowModal(false))

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Alternar Ativo / Inativo de um serviço
  const handleToggleActive = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    )
  }

  // Abrir modal de criação
  const handleOpenCreateModal = () => {
    setEditingService(null)
    setFormName('')
    setFormDesc('')
    setFormDuration('45 min')
    setFormPrice('R$ 40,00')
    setFormImage(manicureImg)
    setShowModal(true)
  }

  // Abrir modal de edição
  const handleOpenEditModal = (service) => {
    setEditingService(service)
    setFormName(service.name)
    setFormDesc(service.description)
    setFormDuration(service.duration)
    setFormPrice(service.price)
    setFormImage(service.image || manicureImg)
    setShowModal(true)
  }

  // Salvar serviço (criação ou edição)
  const handleSaveService = (e) => {
    e.preventDefault()
    if (!formName.trim()) return

    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                name: formName,
                description: formDesc,
                duration: formDuration,
                price: formPrice,
                image: formImage || s.image || manicureImg,
              }
            : s
        )
      )
    } else {
      const newSvc = {
        id: Date.now(),
        name: formName,
        description: formDesc || 'Cuidado especial para suas unhas.',
        duration: formDuration,
        price: formPrice,
        image: formImage || manicureImg,
        active: true,
      }
      setServices((prev) => [...prev, newSvc])
    }

    setShowModal(false)
  }


  // Contadores
  const totalCount = services.length
  const activeCount = useMemo(() => services.filter((s) => s.active).length, [services])
  const inactiveCount = useMemo(() => services.filter((s) => !s.active).length, [services])

  // Filtragem combinada por busca e aba (Todos, Ativos, Inativos)
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      if (filter === 'ativos') return s.active
      if (filter === 'inativos') return !s.active
      return true
    })
  }, [services, filter, searchQuery])

  return (
    <main className="screen srv-screen">
      {/* ===================================================================
          Header e Controles Fixos no Topo (Sticky)
          =================================================================== */}
      <div className="srv-sticky-top">
        <header className="srv-header anim-stagger-item anim-delay-1">
          <div className="srv-header-left">
            <div className="srv-flower-wrap" aria-hidden="true">
              <img src={logoImg} alt="Logo Bella Nails" className="srv-flower-img" />
            </div>
            <div className="srv-title-group">
              <h1 className="srv-title">Meus Serviços</h1>
              <p className="srv-subtitle">Gerencie seus serviços e organize sua agenda</p>
            </div>
          </div>

          <button
            id="srv-add-button"
            type="button"
            className="srv-new-service-btn"
            aria-label="Cadastrar novo serviço"
            onClick={handleOpenCreateModal}
          >
            <PlusIcon className="srv-plus-icon" />
            <span>Novo serviço</span>
          </button>
        </header>

        {/* Seletor de Abas (Segmented Control com Ícones e Contadores) */}
        <div className="srv-segmented-bar anim-stagger-item anim-delay-2" role="tablist" aria-label="Filtrar status dos serviços">
          {/* Aba Todos */}
          <button
            id="tab-srv-todos"
            type="button"
            role="tab"
            aria-selected={filter === 'todos'}
            className={`srv-segment-item ${filter === 'todos' ? 'is-active' : ''}`}
            onClick={() => setFilter('todos')}
          >
            <Grid2x2Icon className="srv-segment-icon" />
            <span className="srv-segment-text">Todos</span>
            <span className="srv-count-badge is-white">{totalCount}</span>
          </button>

          {/* Aba Ativos */}
          <button
            id="tab-srv-ativos"
            type="button"
            role="tab"
            aria-selected={filter === 'ativos'}
            className={`srv-segment-item ${filter === 'ativos' ? 'is-active' : ''}`}
            onClick={() => setFilter('ativos')}
          >
            <span className="srv-dot is-green" aria-hidden="true" />
            <span className="srv-segment-text">Ativos</span>
            <span className="srv-count-badge is-muted">{activeCount}</span>
          </button>

          {/* Aba Inativos */}
          <button
            id="tab-srv-inativos"
            type="button"
            role="tab"
            aria-selected={filter === 'inativos'}
            className={`srv-segment-item ${filter === 'inativos' ? 'is-active' : ''}`}
            onClick={() => setFilter('inativos')}
          >
            <span className="srv-dot is-grey" aria-hidden="true" />
            <span className="srv-segment-text">Inativos</span>
            <span className="srv-count-badge is-muted">{inactiveCount}</span>
          </button>
        </div>

        {/* Barra de Busca + Botão de Filtro Sliders */}
        <div className="srv-search-row anim-stagger-item anim-delay-3">
          <div className="srv-search-box">
            <SearchIcon className="srv-search-icon" />
            <input
              id="srv-search-input"
              type="search"
              placeholder="Buscar serviço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="srv-search-input"
            />
          </div>

          <button
            type="button"
            className="srv-filter-action-btn"
            aria-label="Opções de filtro"
            onClick={() => setFilter('todos')}
          >
            <FilterSlidersIcon className="srv-sliders-icon" />
          </button>
        </div>
      </div>

      {/* Conteúdo rolável */}
      <div className="srv-content-body">
        {/* ===================================================================
            Lista de Cards dos Serviços (Exatamente como o Design)
            =================================================================== */}
        <section className="srv-cards-list" aria-label="Lista de serviços">
          {filteredServices.map((service, idx) => {
            const { id, name, description, duration, price, image, active } = service

            return (
              <div
                key={id}
                id={`srv-card-${id}`}
                className="srv-card anim-stagger-item"
                style={{ animationDelay: `${0.12 + idx * 0.05}s` }}
              >
                {/* Foto do serviço com cantos arredondados */}
                <div className="srv-thumb-wrap">
                  <img
                    src={image}
                    alt={`Foto de ${name}`}
                    className="srv-thumb-img"
                  />
                </div>

                {/* Conteúdo do meio: Nome + Tag Ativo + Descrição + Duração | Preço */}
                <div className="srv-card-info">
                  <div className="srv-card-top-row">
                    <h2 className="srv-card-name">{name}</h2>
                    {active ? (
                      <span className="srv-status-badge is-active">
                        <span className="srv-status-dot" />
                        <span>Ativo</span>
                      </span>
                    ) : (
                      <span className="srv-status-badge is-inactive">
                        <span className="srv-status-dot is-grey" />
                        <span>Inativo</span>
                      </span>
                    )}
                  </div>

                  <p className="srv-card-desc">{description}</p>

                  <div className="srv-card-meta">
                    <div className="srv-meta-item">
                      <ClockIcon className="srv-meta-icon" />
                      <span className="srv-meta-text">{duration}</span>
                    </div>

                    <span className="srv-meta-divider" aria-hidden="true">|</span>

                    <div className="srv-meta-item">
                      <PriceTagIcon className="srv-meta-icon is-price" />
                      <span className="srv-price-value">{price}</span>
                    </div>
                  </div>
                </div>

                {/* Coluna da Direita: Botões (Editar + Mais) no topo e Switch embaixo */}
                <div className="srv-card-actions-col">
                  <div className="srv-action-btns-row">
                    <button
                      type="button"
                      className="srv-square-action-btn"
                      aria-label={`Editar ${name}`}
                      onClick={() => handleOpenEditModal(service)}
                    >
                      <PencilIcon className="srv-action-icon" />
                    </button>

                    <button
                      type="button"
                      className="srv-square-action-btn"
                      aria-label={`Mais opções para ${name}`}
                      onClick={() => handleOpenEditModal(service)}
                    >
                      <MoreHorizontalIcon className="srv-action-icon" />
                    </button>
                  </div>

                  {/* Toggle Switch em Vinho */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={active}
                    className={`srv-toggle-switch ${active ? 'is-active' : ''}`}
                    aria-label={`${active ? 'Desativar' : 'Ativar'} ${name}`}
                    onClick={() => handleToggleActive(id)}
                  >
                    <span className="srv-toggle-thumb" />
                  </button>
                </div>
              </div>
            )
          })}
        </section>
      </div>

      {/* ===================================================================
          Barra de Navegação Inferior Flutuante Reutilizável
          =================================================================== */}
      <AppBottomNav activeTab="servicos" onNavigateTab={onNavigateTab} />

      {/* ===================================================================
          Modal Bottom Sheet: Cadastrar / Editar Serviço
          =================================================================== */}
      {showModal && (
        <div className="srv-modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="srv-modal-sheet"
            style={sheetStyle}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={editingService ? 'Editar serviço' : 'Novo serviço'}
          >
            <div className="srv-modal-drag-zone" {...handleProps}>
              <div className="srv-sheet-handle" />
            </div>
            <h3 className="srv-modal-title">
              {editingService ? 'Editar Serviço' : 'Novo Serviço'}
            </h3>

            <form onSubmit={handleSaveService} className="srv-form">
              {/* Foto do Serviço: Upload ou Galeria de Modelos */}
              <div className="srv-image-picker-group">
                <span className="srv-label-title">Foto do serviço</span>
                <div className="srv-image-picker-card">
                  <div className="srv-image-preview-wrap">
                    <img src={formImage} alt="Foto do serviço" className="srv-image-preview-thumb" />
                  </div>
                  <div className="srv-image-picker-actions">
                    <label className="srv-file-upload-btn">
                      <CameraIcon className="srv-cam-icon" />
                      <span>{editingService ? 'Trocar foto' : 'Adicionar foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <span className="srv-image-hint">Foto da câmera ou galeria</span>
                  </div>
                </div>

                {/* Modelos rápidos */}
                <div className="srv-presets-row">
                  <span className="srv-presets-label">Ou escolha uma foto padrão:</span>
                  <div className="srv-presets-list">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        className={`srv-preset-chip ${formImage === preset.img ? 'is-selected' : ''}`}
                        onClick={() => setFormImage(preset.img)}
                        title={preset.name}
                      >
                        <img src={preset.img} alt={preset.name} className="srv-preset-img" />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <label className="srv-label">
                <span>Nome do serviço</span>
                <input
                  type="text"
                  placeholder="Ex: Alongamento em fibra"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="srv-input"
                  required
                />
              </label>

              <label className="srv-label">
                <span>Descrição breve</span>
                <input
                  type="text"
                  placeholder="Ex: Unhas alongadas e resistentes"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="srv-input"
                />
              </label>

              <div className="srv-form-row">
                <label className="srv-label">
                  <span>Duração</span>
                  <input
                    type="text"
                    placeholder="Ex: 1h 30 min"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="srv-input"
                    required
                  />
                </label>

                <label className="srv-label">
                  <span>Preço</span>
                  <input
                    type="text"
                    placeholder="Ex: R$ 80,00"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="srv-input"
                    required
                  />
                </label>
              </div>

              <div className="srv-modal-actions">
                <button
                  type="button"
                  className="srv-modal-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="srv-modal-btn-save">
                  {editingService ? 'Salvar alterações' : 'Cadastrar serviço'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
