import { useRef, useState } from 'react'
import {
  ArrowIcon,
  CameraIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  InstagramIcon,
} from '../icons.jsx'
import './Step1SalonInfo.css'

export default function Step1SalonInfo({ onBack, onContinue }) {
  const [formData, setFormData] = useState({
    salonName: 'Bella Nails Studio',
    ownerName: 'Ana Paula Silva',
    phone: '(11) 91234-5678',
    email: 'contato@bellanails.com',
    address: 'Rua das Flores, 123 - Centro\nSão Paulo - SP',
    instagram: '@bellanails',
  })

  const [previewPhoto, setPreviewPhoto] = useState(null)
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewPhoto(url)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onContinue?.(formData)
  }

  return (
    <main className="screen step1-screen">
      {/* Topo: voltar + Passo 1 de 6 + barra de progresso com 6 segmentos */}
      <header className="step-header">
        <button
          id="step1-back-button"
          className="step-back-btn"
          type="button"
          onClick={onBack}
          aria-label="Voltar"
        >
          <ChevronLeftIcon />
        </button>

        <div className="step-progress-wrap">
          {/* Começando no Passo 1 de 6, conforme solicitado */}
          <span className="step-count-text">Passo 1 de 6</span>
          <div className="step-bars" aria-label="Progresso da configuração: Passo 1 de 6">
            <span className="step-bar active" />
            <span className="step-bar" />
            <span className="step-bar" />
            <span className="step-bar" />
            <span className="step-bar" />
            <span className="step-bar" />
          </div>
        </div>
      </header>

      {/* Título e descrição da etapa */}
      <section className="step-intro">
        <h1 className="step-title">Informações do salão</h1>
        <p className="step-desc">
          Conte um pouco sobre o seu negócio para personalizar sua experiência.
        </p>
      </section>

      {/* Formulário */}
      <form className="step-form" onSubmit={handleSubmit}>
        {/* Foto do salão / logo */}
        <div className="form-group">
          <label className="form-label">Foto do salão / logo</label>

          <div className="photo-row">
            {/* Foto decorativa do salão com letreiro neon Bella Nails */}
            <div className="salon-photo-preview">
              {previewPhoto ? (
                <img src={previewPhoto} alt="Foto do salão" className="uploaded-photo" />
              ) : (
                <div className="salon-neon-card">
                  <div className="neon-wall">
                    <div className="neon-sign">
                      <span className="neon-text">Bella Nails</span>
                      <span className="neon-heart">♡</span>
                    </div>
                  </div>
                  <div className="neon-decor">
                    <span className="plant-left">🌿</span>
                    <span className="chair-center">🛋️</span>
                    <span className="plant-right">🪴</span>
                  </div>
                </div>
              )}
            </div>

            {/* Botão de upload */}
            <button
              type="button"
              className="photo-upload-box"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Adicionar foto ou logo"
            >
              <CameraIcon className="upload-camera-icon" />
              <span>Adicionar foto ou logo</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Nome do salão */}
        <div className="form-group">
          <label className="form-label" htmlFor="salonName">
            Nome do salão <span className="req-asterisk">*</span>
          </label>
          <input
            id="salonName"
            name="salonName"
            type="text"
            className="form-input"
            value={formData.salonName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nome da proprietária */}
        <div className="form-group">
          <label className="form-label" htmlFor="ownerName">
            Nome da proprietária <span className="req-asterisk">*</span>
          </label>
          <input
            id="ownerName"
            name="ownerName"
            type="text"
            className="form-input"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Telefone / WhatsApp */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Telefone / WhatsApp <span className="req-asterisk">*</span>
          </label>
          <div className="phone-input-wrap">
            <div className="country-select">
              <span className="flag-emoji" aria-hidden="true">🇧🇷</span>
              <ChevronDownIcon className="country-chevron" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input phone-field"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* E-mail */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            E-mail <span className="req-asterisk">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Endereço */}
        <div className="form-group">
          <label className="form-label" htmlFor="address">
            Endereço <span className="req-asterisk">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            rows={2}
            className="form-input form-textarea"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Instagram */}
        <div className="form-group">
          <label className="form-label" htmlFor="instagram">
            Instagram
          </label>
          <div className="instagram-input-wrap">
            <InstagramIcon className="instagram-icon" />
            <input
              id="instagram"
              name="instagram"
              type="text"
              className="form-input instagram-field"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@seuinstagram"
            />
          </div>
        </div>

        {/* Botões inferiores: Voltar e Continuar */}
        <div className="step-actions">
          <button
            id="step1-back-action"
            type="button"
            className="step-btn-back"
            onClick={onBack}
          >
            Voltar
          </button>

          <button
            id="step1-continue-action"
            type="submit"
            className="step-btn-continue"
          >
            <span>Continuar</span>
            <ArrowIcon className="step-btn-arrow" />
          </button>
        </div>
      </form>
    </main>
  )
}
