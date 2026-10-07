import { useEffect, useMemo, useState } from 'react'
import {
  BanknoteIcon,
  BuildingIcon,
  CalculatorIcon,
  CalendarBadgeIcon,
  CalendarIcon,
  CheckCircleFilledIcon,
  ChevronDownIcon,
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  ClockIcon,
  CreditCardIcon,
  DebitCardIcon,
  ExchangeArrowsIcon,
  FilterSlidersIcon,
  FinanceBarsIcon,
  FlameIcon,
  LightbulbIcon,
  PackageIcon,
  PencilIcon,
  PixIcon,
  PlusIcon,
  PriceTagIcon,
  ScaleIcon,
  SparklesIcon,
  TargetIcon,
  TrashIcon,
  TrendingUpIcon,
  TrophyIcon,
  UsersIcon,
} from '../icons.jsx'
import AppBottomNav from '../components/AppBottomNav.jsx'
import { useBottomSheetDrag } from '../hooks/useBottomSheetDrag.js'
import {
  subscribeToFinancial,
  addFinancialTransaction,
  deleteFinancialTransaction,
  parsePriceValue,
} from '../firebase/services.js'
import './Financeiro.css'

const MONTHS = [
  'Janeiro de 2025',
  'Fevereiro de 2025',
  'Março de 2025',
  'Abril de 2025',
  'Maio de 2025',
  'Junho de 2025',
  'Julho de 2025',
  'Agosto de 2025',
  'Setembro de 2025',
  'Outubro de 2025',
  'Novembro de 2025',
  'Dezembro de 2025',
]

// Produtos cadastrados pela manicure com valores unitários
const initialProducts = [
  { id: 1, name: 'Gel Construtor Vòlia (24g)', category: 'Géis', price: 65.0 },
  { id: 2, name: 'Top Coat Brilho Diamante', category: 'Finalizadores', price: 35.0 },
  { id: 3, name: 'Primer Ácido Adesivador', category: 'Preparadores', price: 32.0 },
  { id: 4, name: 'Esmalte em Gel Renda Francesinha', category: 'Esmaltes', price: 28.0 },
  { id: 5, name: 'Esmalte em Gel Vermelho Carmim', category: 'Esmaltes', price: 28.0 },
  { id: 6, name: 'Prep Higienizador Spray (500ml)', category: 'Preparadores', price: 29.0 },
  { id: 7, name: 'Kit Lixas 100/180 (Pacote c/ 50)', category: 'Descartáveis', price: 22.0 },
  { id: 8, name: 'Tips Curvatura C Transparente (500un)', category: 'Tips & Moldes', price: 38.0 },
  { id: 9, name: 'Algodão Prensado Sem Fiapos', category: 'Descartáveis', price: 16.0 },
  { id: 10, name: 'Óleo Hidratante de Cutículas (30ml)', category: 'Finalizadores', price: 18.0 },
]

// Sem dados simulados - tudo vem do Firebase Firestore em tempo real
const initialExpenses = []
const initialInflows = []

const servicesData = [
  { name: 'Alongamento em gel', percent: 38, value: 'R$ 1.641,60' },
  { name: 'Manicure', percent: 25, value: 'R$ 1.080,00' },
  { name: 'Pedicure', percent: 18, value: 'R$ 777,60' },
  { name: 'Banho de gel', percent: 12, value: 'R$ 518,40' },
  { name: 'Nail art', percent: 7, value: 'R$ 302,40' },
]

const weeklyBars = [
  { day: 'Seg', revenue: 'R$ 680,00', primaryHeight: 68, secondaryHeight: 46 },
  { day: 'Ter', revenue: 'R$ 410,00', primaryHeight: 48, secondaryHeight: 24, invertOrder: true },
  { day: 'Qua', revenue: 'R$ 720,00', primaryHeight: 62, secondaryHeight: 18 },
  { day: 'Qui', revenue: 'R$ 530,00', primaryHeight: 58, secondaryHeight: null },
  { day: 'Sex', revenue: 'R$ 890,00', primaryHeight: 68, secondaryHeight: null },
  { day: 'Sáb', revenue: 'R$ 760,00', primaryHeight: 64, secondaryHeight: null },
  { day: 'Dom', revenue: 'R$ 330,00', primaryHeight: 48, secondaryHeight: null, isHighlight: true },
]

export default function Financeiro({ onNavigateTab }) {
  const [activeSegment, setActiveSegment] = useState('resumo')
  const [monthIndex, setMonthIndex] = useState(9) // Outubro de 2025
  const [hoveredDay, setHoveredDay] = useState(null)
  const [hoveredService, setHoveredService] = useState(null)

  // Estados de Despesas e Produtos
  const [products, setProducts] = useState(initialProducts)
  const [expenses, setExpenses] = useState(initialExpenses)
  const [expenseFilter, setExpenseFilter] = useState('todas') // 'todas' | 'fixas' | 'variaveis' | 'produtos'

  // Estados de Entradas
  const [inflows, setInflows] = useState(initialInflows)
  const [inflowFilter, setInflowFilter] = useState('todas') // 'todas' | 'pix' | 'card' | 'money'

  // Modais
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showInflowModal, setShowInflowModal] = useState(false)

  // Arrastar para fechar modais
  const expenseDrag = useBottomSheetDrag(() => setShowExpenseModal(false))
  const productDrag = useBottomSheetDrag(() => setShowProductModal(false))
  const inflowDrag = useBottomSheetDrag(() => setShowInflowModal(false))


  // Formulário de Nova Despesa
  const [expType, setExpType] = useState('variable') // 'variable' | 'fixed'
  const [expProductId, setExpProductId] = useState(1)
  const [expQty, setExpQty] = useState(1)
  const [expFixedTitle, setExpFixedTitle] = useState('')
  const [expFixedCategory, setExpFixedCategory] = useState('Aluguel da mesa')
  const [expFixedAmount, setExpFixedAmount] = useState('150,00')
  const [expDate, setExpDate] = useState('Hoje, 04/10')

  // Formulário de Novo Produto
  const [prodName, setProdName] = useState('')
  const [prodCategory, setProdCategory] = useState('Géis')
  const [prodPrice, setProdPrice] = useState('45,00')

  // Formulário de Nova Entrada (Atendimento de Unha)
  const [infService, setInfService] = useState('Alongamento em gel')
  const [infClient, setInfClient] = useState('')
  const [infAmount, setInfAmount] = useState('90,00')
  const [infMethod, setInfMethod] = useState('pix')
  const [infDate, setInfDate] = useState('Hoje, 04/10')
  const [infNotes, setInfNotes] = useState('')

  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev > 0 ? prev - 1 : MONTHS.length - 1))
  }

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev < MONTHS.length - 1 ? prev + 1 : 0))
  }

  // Totais calculados dinamicamente
  const totalInflowsAmount = useMemo(() => {
    return inflows.reduce((acc, curr) => acc + curr.amount, 0)
  }, [inflows])

  const totalFixedExpenses = useMemo(() => {
    return expenses
      .filter((e) => e.type === 'fixed')
      .reduce((acc, curr) => acc + curr.amount, 0)
  }, [expenses])

  const totalVariableExpenses = useMemo(() => {
    return expenses
      .filter((e) => e.type === 'variable')
      .reduce((acc, curr) => acc + curr.amount, 0)
  }, [expenses])

  const totalExpensesAmount = useMemo(() => {
    return totalFixedExpenses + totalVariableExpenses
  }, [totalFixedExpenses, totalVariableExpenses])

  const netProfit = totalInflowsAmount - totalExpensesAmount

  // Estados da Calculadora de Ponto de Equilíbrio
  const [beCustomFixed, setBeCustomFixed] = useState(false)
  const [beFixedInput, setBeFixedInput] = useState('')
  const [beAvgVarCost, setBeAvgVarCost] = useState(15) // Custo médio de materiais e descartáveis por atendimento (R$)
  const [beAvgPrice, setBeAvgPrice] = useState(75) // Preço médio cobrado por unha (R$)
  const [beWorkingDays, setBeWorkingDays] = useState(22) // Dias úteis trabalhados no mês
  const [beTargetProfit, setBeTargetProfit] = useState(3500) // Meta de pró-labore / salário livre desejado (R$)
  const [beSimPriceExtra, setBeSimPriceExtra] = useState(0) // Simulador de reajuste de preço (+R$ 0, +10, +15, +20, +30)

  // Cálculos do Ponto de Equilíbrio & Metas para Manicure
  const breakEvenStats = useMemo(() => {
    // 1. Custo Fixo Total (automático do sistema ou personalizado)
    const effectiveFixed = beCustomFixed && beFixedInput !== ''
      ? Math.max(0, parseFloat(String(beFixedInput).replace(',', '.')) || 0)
      : totalFixedExpenses

    // 2. Preço Médio Efetivo com Simulador de Reajuste
    const basePrice = Math.max(1, Number(beAvgPrice) || 75)
    const effectivePrice = Math.max(1, basePrice + (Number(beSimPriceExtra) || 0))

    // 3. Custo Variável Médio por Procedimento (materiais e descartáveis)
    const effectiveVarCost = Math.max(0, Number(beAvgVarCost) || 0)

    // 4. Margem de Contribuição Unitária (R$)
    const unitMargin = Math.max(0.01, effectivePrice - effectiveVarCost)
    const marginPercent = Math.min(100, Math.max(0, (unitMargin / effectivePrice) * 100))

    // 5. Ponto de Equilíbrio em Quantidade de Atendimentos (Unhas)
    // Q = Custo Fixo / Margem de Contribuição
    const breakEvenNails = effectiveFixed > 0 ? Math.ceil(effectiveFixed / unitMargin) : 0

    // 6. Ponto de Equilíbrio em Faturamento Mínimo (R$)
    const breakEvenRevenue = breakEvenNails * effectivePrice

    // 7. Ritmo Diário e Semanal
    const safeDays = Math.max(1, Number(beWorkingDays) || 22)
    const dailyTargetNails = breakEvenNails > 0 ? (breakEvenNails / safeDays).toFixed(1) : '0.0'
    const weeklyTargetNails = breakEvenNails > 0 ? (breakEvenNails / (safeDays / 5 * 4.33)).toFixed(1) : '0.0'

    // 8. Meta de Pró-labore / Lucro Líquido Desejado (Salário dos Sonhos)
    const targetProfit = Math.max(0, Number(beTargetProfit) || 0)
    const profitTargetNails = Math.ceil((effectiveFixed + targetProfit) / unitMargin)
    const profitTargetRevenue = profitTargetNails * effectivePrice
    const profitDailyNails = (profitTargetNails / safeDays).toFixed(1)

    // 9. Progresso no Mês Atual (Quantas unhas feitas até agora)
    const currentNailsDone = inflows.length
    const currentRevenue = totalInflowsAmount
    const progressPercent = breakEvenNails > 0 
      ? Math.min(100, Math.round((currentNailsDone / breakEvenNails) * 100)) 
      : 100
    const nailsRemaining = Math.max(0, breakEvenNails - currentNailsDone)
    const isBreakEvenReached = currentNailsDone >= breakEvenNails

    // 10. Matriz de Capacidade / Atendimentos por Dia
    const dailyScenarios = [1, 2, 3, 4].map((dailyNails) => {
      const monthlyNails = dailyNails * safeDays
      const monthlyRevenue = monthlyNails * effectivePrice
      const totalVarCosts = monthlyNails * effectiveVarCost
      const netTakeHome = monthlyRevenue - effectiveFixed - totalVarCosts
      return {
        dailyNails,
        monthlyNails,
        monthlyRevenue,
        totalVarCosts,
        netTakeHome,
      }
    })

    return {
      effectiveFixed,
      effectivePrice,
      basePrice,
      effectiveVarCost,
      unitMargin,
      marginPercent,
      breakEvenNails,
      breakEvenRevenue,
      dailyTargetNails,
      weeklyTargetNails,
      targetProfit,
      profitTargetNails,
      profitTargetRevenue,
      profitDailyNails,
      currentNailsDone,
      currentRevenue,
      progressPercent,
      nailsRemaining,
      isBreakEvenReached,
      dailyScenarios,
      safeDays,
    }
  }, [
    beCustomFixed,
    beFixedInput,
    totalFixedExpenses,
    beAvgPrice,
    beSimPriceExtra,
    beAvgVarCost,
    beWorkingDays,
    beTargetProfit,
    inflows.length,
    totalInflowsAmount,
  ])

  // Filtragem de Despesas
  const filteredExpenses = useMemo(() => {
    if (expenseFilter === 'fixas') return expenses.filter((e) => e.type === 'fixed')
    if (expenseFilter === 'variaveis') return expenses.filter((e) => e.type === 'variable')
    return expenses
  }, [expenses, expenseFilter])

  // Filtragem de Entradas
  const filteredInflows = useMemo(() => {
    if (inflowFilter === 'pix') return inflows.filter((i) => i.method === 'pix')
    if (inflowFilter === 'card') return inflows.filter((i) => i.method === 'card_credit' || i.method === 'card_debit')
    if (inflowFilter === 'money') return inflows.filter((i) => i.method === 'money')
    return inflows
  }, [inflows, inflowFilter])

  // Escuta transações financeiras reais no Firestore
  useEffect(() => {
    const unsubscribe = subscribeToFinancial((realTransactions) => {
      const mappedInflows = []
      const mappedExpenses = []

      realTransactions.forEach((t) => {
        const type = t.type || 'entrada'
        const amt = typeof t.amount === 'number' ? t.amount : parsePriceValue(t.amount)
        let dateFormatted = t.date || 'Hoje'
        if (t.date && typeof t.date === 'string' && t.date.includes('T')) {
          try {
            dateFormatted = new Date(t.date).toLocaleDateString('pt-BR')
          } catch (e) {}
        }

        if (type === 'entrada') {
          mappedInflows.push({
            id: t.id,
            serviceName: t.description || 'Atendimento de Unha',
            clientName: t.clientName || 'Cliente',
            amount: amt,
            method: t.method || 'pix',
            date: dateFormatted,
            time: t.time || (t.date && typeof t.date === 'string' && t.date.includes('T') ? new Date(t.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''),
            notes: t.notes || '',
          })
        } else {
          mappedExpenses.push({
            id: t.id,
            type: t.expenseType || 'fixed',
            title: t.description || 'Gasto Geral',
            amount: amt,
            category: t.category || 'Geral',
            date: dateFormatted,
            time: t.time || '',
          })
        }
      })

      setInflows(mappedInflows)
      setExpenses(mappedExpenses)
    })

    return () => unsubscribe()
  }, [])

  // Submissão de Despesa com salvamento no Firebase
  const handleSaveExpense = async (e) => {
    e.preventDefault()
    if (expType === 'variable') {
      const selectedProd = products.find((p) => p.id === Number(expProductId)) || products[0]
      const qty = Math.max(1, Number(expQty) || 1)
      const total = selectedProd.price * qty

      await addFinancialTransaction({
        type: 'saida',
        amount: total,
        description: `${selectedProd.name} (${qty}x)`,
        category: selectedProd.category || 'Produtos',
        expenseType: 'variable',
        date: new Date().toISOString(),
      })
    } else {
      const parsedAmount = parseFloat(expFixedAmount.replace(/\./g, '').replace(',', '.')) || 0
      await addFinancialTransaction({
        type: 'saida',
        amount: parsedAmount,
        description: expFixedTitle || expFixedCategory,
        category: expFixedCategory || 'Custo Mensal Fixo',
        expenseType: 'fixed',
        date: new Date().toISOString(),
      })
    }
    setShowExpenseModal(false)
  }

  // Submissão de Produto
  const handleSaveProduct = (e) => {
    e.preventDefault()
    if (!prodName.trim()) return
    const parsedPrice = parseFloat(prodPrice.replace(/\./g, '').replace(',', '.')) || 0
    const newProd = {
      id: Date.now(),
      name: prodName.trim(),
      category: prodCategory,
      price: parsedPrice,
    }
    setProducts((prev) => [...prev, newProd])
    setProdName('')
    setProdPrice('40,00')
    setShowProductModal(false)
  }

  // Submissão de Entrada (Atendimento Manual) com salvamento no Firebase
  const handleSaveInflow = async (e) => {
    e.preventDefault()
    const parsedAmount = parseFloat(infAmount.replace(/\./g, '').replace(',', '.')) || 0
    await addFinancialTransaction({
      type: 'entrada',
      amount: parsedAmount,
      description: infService,
      clientName: infClient.trim() || 'Cliente Avulsa',
      method: infMethod,
      notes: infNotes.trim(),
      date: new Date().toISOString(),
    })
    setInfClient('')
    setInfNotes('')
    setShowInflowModal(false)
  }

  // Excluir despesa do Firebase
  const handleDeleteExpense = async (id) => {
    if (window.confirm('Deseja excluir esta despesa?')) {
      await deleteFinancialTransaction(id)
    }
  }

  // Excluir entrada do Firebase
  const handleDeleteInflow = async (id) => {
    if (window.confirm('Deseja excluir esta entrada?')) {
      await deleteFinancialTransaction(id)
    }
  }

  // Abrir modal de despesa já com produto pré-selecionado
  const handleQuickBuyProduct = (product) => {
    setExpType('variable')
    setExpProductId(product.id)
    setExpQty(1)
    setShowExpenseModal(true)
  }

  return (
    <main className="screen fin-screen">
      {/* ===================================================================
          Header e Filtros Fixos no Topo (Sticky Header)
          =================================================================== */}
      <div className="fin-sticky-top">
        <header className="fin-header fin-anim-item fin-stagger-1">
          <div className="fin-header-left">
            <div className="fin-header-icon-wrap" aria-hidden="true">
              <FinanceBarsIcon className="fin-header-icon" />
            </div>
            <h1 className="fin-header-title">Financeiro</h1>
          </div>
        </header>

        {/* Segmented Control: Resumo | Entradas | Despesas | Ponto de Equilíbrio */}
        <section
          className="fin-segments fin-anim-item fin-stagger-2"
          aria-label="Filtro de visualização financeira"
        >
          <button
            id="tab-resumo"
            type="button"
            className={`fin-segment-btn ${activeSegment === 'resumo' ? 'is-active' : ''}`}
            onClick={() => setActiveSegment('resumo')}
          >
            Resumo
          </button>
          <button
            id="tab-entradas"
            type="button"
            className={`fin-segment-btn ${activeSegment === 'entradas' ? 'is-active' : ''}`}
            onClick={() => setActiveSegment('entradas')}
          >
            Entradas ({inflows.length})
          </button>
          <button
            id="tab-despesas"
            type="button"
            className={`fin-segment-btn ${activeSegment === 'despesas' ? 'is-active' : ''}`}
            onClick={() => setActiveSegment('despesas')}
          >
            Despesas ({expenses.length})
          </button>
          <button
            id="tab-equilibrio"
            type="button"
            className={`fin-segment-btn ${activeSegment === 'equilibrio' ? 'is-active' : ''}`}
            onClick={() => setActiveSegment('equilibrio')}
          >
            <ScaleIcon className="fin-tab-icon" />
            <span>Equilíbrio</span>
          </button>
        </section>

        {/* Month Selector Bar: < Outubro de 2025 > */}
        <div className="fin-month-selector fin-anim-item fin-stagger-3">
          <button
            id="btn-prev-month"
            type="button"
            className="fin-month-nav-btn"
            onClick={handlePrevMonth}
            aria-label="Mês anterior"
          >
            <ChevronLeftSmallIcon />
          </button>
          <span className="fin-month-label">{MONTHS[monthIndex]}</span>
          <button
            id="btn-next-month"
            type="button"
            className="fin-month-nav-btn"
            onClick={handleNextMonth}
            aria-label="Próximo mês"
          >
            <ChevronRightSmallIcon />
          </button>
        </div>
      </div>

      {/* Conteúdo com Rolagem Fluida */}
      <div className="fin-content-body">
        {activeSegment === 'resumo' ? (
          <>
            {/* ===================================================================
                Bloco 1: Faturamento do Mês + Badge de Crescimento
                =================================================================== */}
            <section
              className="fin-card fin-revenue-hero fin-anim-item fin-stagger-4"
              aria-label="Resumo do faturamento"
            >
              <div className="fin-rev-top-row">
                <span className="fin-rev-label">Faturamento do Mês</span>
                <span className="fin-growth-badge">
                  <TrendingUpIcon className="fin-trend-icon" />
                  +18%
                </span>
              </div>

              <div className="fin-rev-main-row">
                <h2 className="fin-rev-amount">
                  R$ {totalInflowsAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h2>
                <div className="fin-calendar-badge-wrap" aria-hidden="true">
                  <CalendarBadgeIcon className="fin-cal-badge-icon" />
                </div>
              </div>

              <p className="fin-rev-sub">
                {inflows.length} atendimentos registrados este mês
              </p>

              {/* Mini cards: Entradas x Despesas x Lucro */}
              <div className="fin-metric-chips-row">
                <div className="fin-metric-chip is-inflow">
                  <span className="fin-chip-label">Entradas</span>
                  <strong className="fin-chip-val">
                    + R$ {totalInflowsAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                <div className="fin-metric-chip is-expense">
                  <span className="fin-chip-label">Saídas</span>
                  <strong className="fin-chip-val">
                    - R$ {totalExpensesAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                <div className="fin-metric-chip is-profit">
                  <span className="fin-chip-label">Lucro Líquido</span>
                  <strong className="fin-chip-val">
                    R$ {netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
              </div>
            </section>

            {/* ===================================================================
                Bloco 2: Gráfico Semanal Interativo
                =================================================================== */}
            <section
              className="fin-card fin-anim-item fin-stagger-5"
              aria-label="Gráfico de faturamento semanal"
            >
              <div className="fin-chart-header">
                <h3 className="fin-chart-title">Desempenho Semanal</h3>
                <span className="fin-chart-hint">Toque nas barras para ver</span>
              </div>

              <div className="fin-bars-container">
                {weeklyBars.map((item, index) => {
                  const isHovered = hoveredDay === index
                  return (
                    <div
                      key={item.day}
                      className="fin-bar-column"
                      onMouseEnter={() => setHoveredDay(index)}
                      onMouseLeave={() => setHoveredDay(null)}
                      onClick={() => setHoveredDay(isHovered ? null : index)}
                    >
                      {isHovered && (
                        <div className="fin-bar-tooltip" role="tooltip">
                          {item.revenue}
                        </div>
                      )}

                      <div className="fin-bar-track">
                        {item.secondaryHeight ? (
                          item.invertOrder ? (
                            <>
                              <div
                                className="fin-bar-fill is-dark"
                                style={{ height: `${item.secondaryHeight}%` }}
                              />
                              <div
                                className="fin-bar-fill is-light"
                                style={{ height: `${item.primaryHeight - item.secondaryHeight}%` }}
                              />
                            </>
                          ) : (
                            <>
                              <div
                                className="fin-bar-fill is-light"
                                style={{ height: `${item.primaryHeight - item.secondaryHeight}%` }}
                              />
                              <div
                                className="fin-bar-fill is-dark"
                                style={{ height: `${item.secondaryHeight}%` }}
                              />
                            </>
                          )
                        ) : (
                          <div
                            className={`fin-bar-fill ${item.isHighlight ? 'is-highlight' : 'is-solid'}`}
                            style={{ height: `${item.primaryHeight}%` }}
                          />
                        )}
                      </div>
                      <span className="fin-bar-day">{item.day}</span>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* ===================================================================
                Bloco 3: Serviços Mais Rentáveis (Ranking)
                =================================================================== */}
            <section
              className="fin-card fin-anim-item fin-stagger-6"
              aria-label="Serviços mais rentáveis"
            >
              <div className="fin-breakdown-header">
                <div className="fin-breakdown-title-wrap">
                  <TrophyIcon className="fin-trophy-icon" />
                  <h3 className="fin-breakdown-title">Serviços Mais Rentáveis</h3>
                </div>
              </div>

              <div className="fin-services-list">
                {servicesData.map((svc, idx) => {
                  const isHovered = hoveredService === idx
                  return (
                    <div
                      key={svc.name}
                      className={`fin-service-row ${isHovered ? 'is-active' : ''}`}
                      onMouseEnter={() => setHoveredService(idx)}
                      onMouseLeave={() => setHoveredService(null)}
                    >
                      <div className="fin-service-left">
                        <span className="fin-service-rank">{idx + 1}º</span>
                        <div className="fin-service-info">
                          <span className="fin-service-name">{svc.name}</span>
                          <div className="fin-service-bar-wrap">
                            <div
                              className="fin-service-bar-fill"
                              style={{ width: `${svc.percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="fin-service-right">
                        <span className="fin-service-value">{svc.value}</span>
                        <span className="fin-service-pct">{svc.percent}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        ) : activeSegment === 'entradas' ? (
          /* ===================================================================
              Aba ENTRADAS: Cada atendimento de unha realizado no valor definido
              =================================================================== */
          <div className="fin-subtab-container fin-anim-item fin-stagger-4">
            {/* Header com Ações e Total */}
            <div className="fin-tab-actions-header">
              <div className="fin-tab-title-group">
                <h2 className="fin-tab-heading">Atendimentos de Unhas</h2>
                <span className="fin-tab-subheading">
                  Total recebido: <strong>R$ {totalInflowsAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                </span>
              </div>

              <button
                type="button"
                className="fin-action-pill-btn"
                onClick={() => setShowInflowModal(true)}
              >
                <PlusIcon className="fin-pill-btn-icon" />
                <span>Nova entrada</span>
              </button>
            </div>

            {/* Chips de Métricas de Entradas */}
            <div className="fin-overview-cards-grid">
              <div className="fin-stat-card">
                <span className="fin-stat-caption">Total do Mês</span>
                <strong className="fin-stat-val is-green">
                  R$ {totalInflowsAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
                <span className="fin-stat-sub">Receitas confirmadas</span>
              </div>
              <div className="fin-stat-card">
                <span className="fin-stat-caption">Unhas Feitas</span>
                <strong className="fin-stat-val">
                  {inflows.length} atendimentos
                </strong>
                <span className="fin-stat-sub">Serviços executados</span>
              </div>
              <div className="fin-stat-card">
                <span className="fin-stat-caption">Ticket Médio</span>
                <strong className="fin-stat-val is-wine">
                  R$ {(inflows.length ? totalInflowsAmount / inflows.length : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </strong>
                <span className="fin-stat-sub">Por procedimento</span>
              </div>
            </div>

            {/* Filtros de Forma de Pagamento */}
            <div className="fin-filter-pills-row" role="tablist">
              <button
                type="button"
                className={`fin-filter-pill ${inflowFilter === 'todas' ? 'is-active' : ''}`}
                onClick={() => setInflowFilter('todas')}
              >
                Todas ({inflows.length})
              </button>
              <button
                type="button"
                className={`fin-filter-pill ${inflowFilter === 'pix' ? 'is-active' : ''}`}
                onClick={() => setInflowFilter('pix')}
              >
                <PixIcon className="fin-mini-icon" />
                Pix
              </button>
              <button
                type="button"
                className={`fin-filter-pill ${inflowFilter === 'card' ? 'is-active' : ''}`}
                onClick={() => setInflowFilter('card')}
              >
                <CreditCardIcon className="fin-mini-icon" />
                Cartão
              </button>
              <button
                type="button"
                className={`fin-filter-pill ${inflowFilter === 'money' ? 'is-active' : ''}`}
                onClick={() => setInflowFilter('money')}
              >
                <BanknoteIcon className="fin-mini-icon" />
                Dinheiro
              </button>
            </div>

            {/* Lista Estilizada de Entradas de Unhas */}
            <div className="fin-inflows-list">
              {filteredInflows.length === 0 ? (
                <div className="fin-empty-state">
                  <div className="fin-empty-icon">💅</div>
                  <h4>Nenhum atendimento recebido ainda</h4>
                  <p>
                    Quando você finalizar um agendamento na sua Agenda ou tocar em "+ Nova entrada", ele aparecerá aqui automaticamente no seu faturamento em tempo real.
                  </p>
                </div>
              ) : (
                filteredInflows.map((item) => {
                  const isPix = item.method === 'pix'
                  const isMoney = item.method === 'money'
                  const methodLabel = isPix ? 'Pix' : isMoney ? 'Dinheiro' : item.method === 'card_debit' ? 'Débito' : 'Crédito'

                  return (
                    <div key={item.id} className="fin-inflow-card">
                      <div className="fin-inflow-left">
                        <div className={`fin-method-icon-wrap ${item.method}`}>
                          {isPix ? (
                            <PixIcon className="fin-method-icon" />
                          ) : isMoney ? (
                            <BanknoteIcon className="fin-method-icon" />
                          ) : (
                            <CreditCardIcon className="fin-method-icon" />
                          )}
                        </div>

                        <div className="fin-inflow-details">
                          <div className="fin-inflow-top-line">
                            <strong className="fin-client-name">{item.clientName}</strong>
                            <span className="fin-service-badge">{item.serviceName}</span>
                          </div>

                          {item.notes && <p className="fin-inflow-notes">{item.notes}</p>}

                          <div className="fin-inflow-meta">
                            <span className="fin-inflow-date">
                              <ClockIcon className="fin-meta-clock" />
                              {item.date} {item.time ? `às ${item.time}` : ''}
                            </span>
                            <span className="fin-inflow-dot">•</span>
                            <span className="fin-inflow-pay-tag">{methodLabel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="fin-inflow-right">
                        <span className="fin-inflow-amount">
                          + R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <button
                          type="button"
                          className="fin-item-delete-btn"
                          onClick={() => handleDeleteInflow(item.id)}
                          aria-label="Excluir entrada"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        ) : activeSegment === 'despesas' ? (
          /* ===================================================================
              Aba DESPESAS: Custo Mensal (Fixo), Custo Variável e Cadastro de Produtos
              =================================================================== */
          <div className="fin-subtab-container fin-anim-item fin-stagger-4">
            {/* Header com Ações e Total */}
            <div className="fin-tab-actions-header">
              <div className="fin-tab-title-group">
                <h2 className="fin-tab-heading">Controle de Despesas</h2>
                <span className="fin-tab-subheading">
                  Total de saídas: <strong>R$ {totalExpensesAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                </span>
              </div>

              <div className="fin-header-buttons-pair">
                <button
                  type="button"
                  className="fin-action-pill-btn is-secondary"
                  onClick={() => setShowProductModal(true)}
                  title="Cadastrar novo produto com valor"
                >
                  <PackageIcon className="fin-pill-btn-icon" />
                  <span>Novo produto</span>
                </button>

                <button
                  type="button"
                  className="fin-action-pill-btn"
                  onClick={() => {
                    setExpType('variable')
                    setShowExpenseModal(true)
                  }}
                >
                  <PlusIcon className="fin-pill-btn-icon" />
                  <span>Novo gasto</span>
                </button>
              </div>
            </div>

            {/* Chips de Métricas de Despesas */}
            <div className="fin-overview-cards-grid">
              <div className="fin-stat-card">
                <span className="fin-stat-caption">Total Despesas</span>
                <strong className="fin-stat-val is-expense">
                  R$ {totalExpensesAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
                <span className="fin-stat-sub">Fixos + Variáveis</span>
              </div>
              <div className="fin-stat-card">
                <span className="fin-stat-caption">Custo Mensal (Fixo)</span>
                <strong className="fin-stat-val is-amber">
                  R$ {totalFixedExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
                <span className="fin-stat-sub">Aluguel, luz, MEI</span>
              </div>
              <div className="fin-stat-card">
                <span className="fin-stat-caption">Custo Variável</span>
                <strong className="fin-stat-val is-purple">
                  R$ {totalVariableExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
                <span className="fin-stat-sub">Géis, esmaltes, lixas</span>
              </div>
            </div>

            {/* Filtros em Pílula */}
            <div className="fin-filter-pills-row" role="tablist">
              <button
                type="button"
                className={`fin-filter-pill ${expenseFilter === 'todas' ? 'is-active' : ''}`}
                onClick={() => setExpenseFilter('todas')}
              >
                Todas ({expenses.length})
              </button>
              <button
                type="button"
                className={`fin-filter-pill ${expenseFilter === 'fixas' ? 'is-active' : ''}`}
                onClick={() => setExpenseFilter('fixas')}
              >
                <BuildingIcon className="fin-mini-icon" />
                Custos Fixos
              </button>
              <button
                type="button"
                className={`fin-filter-pill ${expenseFilter === 'variaveis' ? 'is-active' : ''}`}
                onClick={() => setExpenseFilter('variaveis')}
              >
                <SparklesIcon className="fin-mini-icon" />
                Custos Variáveis
              </button>
              <button
                type="button"
                className={`fin-filter-pill ${expenseFilter === 'produtos' ? 'is-active' : ''}`}
                onClick={() => setExpenseFilter('produtos')}
              >
                <PackageIcon className="fin-mini-icon" />
                Meus Produtos ({products.length})
              </button>
            </div>

            {/* Visualização de Gastos OU Catálogo de Produtos */}
            {expenseFilter === 'produtos' ? (
              /* Catálogo de Produtos da Manicure com Valores */
              <div className="fin-products-catalog-section">
                <div className="fin-catalog-intro">
                  <div className="fin-catalog-intro-text">
                    <strong>Tabela de Produtos Cadastrados</strong>
                    <p>Cadastre seus esmaltes e materiais para lançar compras em 1 clique.</p>
                  </div>
                  <button
                    type="button"
                    className="fin-mini-add-btn"
                    onClick={() => setShowProductModal(true)}
                  >
                    <PlusIcon />
                    <span>Adicionar produto</span>
                  </button>
                </div>

                <div className="fin-products-grid">
                  {products.map((prod) => (
                    <div key={prod.id} className="fin-product-card">
                      <div className="fin-product-card-top">
                        <span className="fin-product-cat-tag">{prod.category}</span>
                        <strong className="fin-product-price">
                          R$ {prod.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </strong>
                      </div>

                      <h4 className="fin-product-name">{prod.name}</h4>

                      <button
                        type="button"
                        className="fin-product-buy-btn"
                        onClick={() => handleQuickBuyProduct(prod)}
                      >
                        <PlusIcon className="fin-mini-icon" />
                        <span>Lançar gasto</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Lista de Gastos Registrados */
              <div className="fin-expenses-list">
                {filteredExpenses.map((exp) => {
                  const isFixed = exp.type === 'fixed'

                  return (
                    <div key={exp.id} className={`fin-expense-card ${isFixed ? 'is-fixed' : 'is-variable'}`}>
                      <div className="fin-expense-left">
                        <div className={`fin-expense-icon-wrap ${isFixed ? 'is-fixed' : 'is-variable'}`}>
                          {isFixed ? <BuildingIcon /> : <PackageIcon />}
                        </div>

                        <div className="fin-expense-details">
                          <div className="fin-expense-title-row">
                            <strong className="fin-expense-name">{exp.title}</strong>
                            <span className={`fin-type-pill ${isFixed ? 'is-fixed' : 'is-variable'}`}>
                              {isFixed ? 'Custo Fixo' : 'Custo Variável'}
                            </span>
                          </div>

                          <div className="fin-expense-meta">
                            <span className="fin-expense-date">
                              <CalendarIcon className="fin-meta-clock" />
                              {exp.date} {exp.time ? `às ${exp.time}` : ''}
                            </span>

                            {exp.quantity && (
                              <>
                                <span className="fin-inflow-dot">•</span>
                                <span className="fin-expense-qty">
                                  {exp.quantity}x de R$ {exp.unitPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                              </>
                            )}

                            <span className="fin-inflow-dot">•</span>
                            <span className="fin-expense-category">{exp.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="fin-expense-right">
                        <span className="fin-expense-amount">
                          - R$ {exp.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <button
                          type="button"
                          className="fin-item-delete-btn"
                          onClick={() => handleDeleteExpense(exp.id)}
                          aria-label="Excluir despesa"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          /* ===================================================================
              Aba EQUILÍBRIO: Calculadora de Ponto de Equilíbrio & Metas para Manicure
              =================================================================== */
          <div className="fin-subtab-container fin-be-container fin-anim-item fin-stagger-4">
            {/* Header da Aba */}
            <div className="fin-tab-actions-header">
              <div className="fin-tab-title-group">
                <div className="fin-tab-title-badge-row">
                  <h2 className="fin-tab-heading">Ponto de Equilíbrio</h2>
                  <span className="fin-be-badge-pill">Zero Prejuízo</span>
                </div>
                <span className="fin-tab-subheading">
                  Descubra quantas unhas cobrem 100% dos seus custos e comece a lucrar
                </span>
              </div>
            </div>

            {/* HERO CARD: Ponto de Equilíbrio em Destaque */}
            <section className="fin-be-hero-card">
              <div className="fin-be-hero-header">
                <div className="fin-be-icon-badge">
                  <ScaleIcon className="fin-be-hero-icon" />
                </div>
                <div className="fin-be-hero-titles">
                  <span className="fin-be-hero-label">Meta de Sobrevivência do Mês</span>
                  <span className="fin-be-hero-sublabel">Custos Fixos + Custos Variáveis</span>
                </div>
              </div>

              <div className="fin-be-target-number-row">
                <span className="fin-be-target-huge">
                  {breakEvenStats.breakEvenNails}
                </span>
                <div className="fin-be-target-text-wrap">
                  <span className="fin-be-target-unit">unhas / mês</span>
                  <span className="fin-be-target-hint">
                    Para faturar no mínimo <strong>R$ {breakEvenStats.breakEvenRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                  </span>
                </div>
              </div>

              {/* Badges de Ritmo Diário e Semanal */}
              <div className="fin-be-paces-grid">
                <div className="fin-be-pace-item">
                  <ClockIcon className="fin-pace-icon" />
                  <div className="fin-pace-texts">
                    <span className="fin-pace-val">{breakEvenStats.dailyTargetNails} unhas</span>
                    <span className="fin-pace-lbl">por dia útil ({breakEvenStats.safeDays}d)</span>
                  </div>
                </div>

                <div className="fin-be-pace-item">
                  <CalendarIcon className="fin-pace-icon" />
                  <div className="fin-pace-texts">
                    <span className="fin-pace-val">~{breakEvenStats.weeklyTargetNails} unhas</span>
                    <span className="fin-pace-lbl">por semana</span>
                  </div>
                </div>

                <div className="fin-be-pace-item">
                  <PriceTagIcon className="fin-pace-icon" />
                  <div className="fin-pace-texts">
                    <span className="fin-pace-val">R$ {breakEvenStats.unitMargin.toFixed(2)}</span>
                    <span className="fin-pace-lbl">lucro limpo por unha</span>
                  </div>
                </div>
              </div>

              {/* Termômetro do Mês Atual */}
              <div className="fin-be-progress-box">
                <div className="fin-be-prog-header">
                  <span className="fin-be-prog-title">
                    Progresso em {MONTHS[monthIndex]}
                  </span>
                  <span className="fin-be-prog-pct">
                    {breakEvenStats.progressPercent}% batido
                  </span>
                </div>

                <div className="fin-be-prog-bar-track">
                  <div
                    className={`fin-be-prog-bar-fill ${breakEvenStats.isBreakEvenReached ? 'is-complete' : ''}`}
                    style={{ width: `${breakEvenStats.progressPercent}%` }}
                  />
                </div>

                <div className="fin-be-prog-footer">
                  <span className="fin-be-prog-done">
                    <strong>{breakEvenStats.currentNailsDone}</strong> de {breakEvenStats.breakEvenNails} unhas feitas
                  </span>
                  <span className="fin-be-prog-money">
                    Faturado: R$ {breakEvenStats.currentRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className={`fin-be-message-banner ${breakEvenStats.isBreakEvenReached ? 'is-success' : 'is-pending'}`}>
                  {breakEvenStats.isBreakEvenReached ? (
                    <>
                      <SparklesIcon className="fin-banner-icon" />
                      <span>
                        <strong>Parabéns! Ponto de equilíbrio superado!</strong> Todas as suas contas fixas já estão pagas este mês. Cada nova unha agora é <strong>lucro livre no seu bolso!</strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <TargetIcon className="fin-banner-icon" />
                      <span>
                        Faltam apenas <strong>{breakEvenStats.nailsRemaining} {breakEvenStats.nailsRemaining === 1 ? 'unha' : 'unhas'}</strong> para você pagar 100% dos custos deste mês e começar a lucrar livre!
                      </span>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* SEÇÃO 1: ESTRUTURA DE CUSTOS (Fixos e Variáveis) */}
            <section className="fin-be-card">
              <div className="fin-be-card-head">
                <div className="fin-be-card-title-row">
                  <CalculatorIcon className="fin-be-card-icon" />
                  <h3 className="fin-be-card-title">1. Estrutura dos Seus Custos</h3>
                </div>
                <p className="fin-be-card-desc">
                  Personalize seus dados abaixo para a calculadora recalcular suas metas automaticamente:
                </p>
              </div>

              {/* Custos Fixos Mensais */}
              <div className="fin-be-field-block">
                <div className="fin-be-field-top">
                  <label className="fin-be-field-label">
                    <BuildingIcon className="fin-field-ico" />
                    <span>Custo Fixo Mensal (R$)</span>
                  </label>
                  <span className="fin-be-field-tag">Aluguel, Luz, MEI, Net</span>
                </div>

                <div className="fin-be-fixed-toggle-row">
                  <button
                    type="button"
                    className={`fin-be-toggle-btn ${!beCustomFixed ? 'is-active' : ''}`}
                    onClick={() => {
                      setBeCustomFixed(false)
                      setBeFixedInput('')
                    }}
                  >
                    Usar custos fixos cadastrados (R$ {totalFixedExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                  </button>
                  <button
                    type="button"
                    className={`fin-be-toggle-btn ${beCustomFixed ? 'is-active' : ''}`}
                    onClick={() => {
                      setBeCustomFixed(true)
                      if (!beFixedInput) setBeFixedInput(totalFixedExpenses.toFixed(2))
                    }}
                  >
                    Digitar outro valor
                  </button>
                </div>

                {beCustomFixed && (
                  <div className="fin-be-custom-input-wrap">
                    <span className="fin-input-prefix">R$</span>
                    <input
                      type="text"
                      className="fin-be-text-input"
                      value={beFixedInput}
                      onChange={(e) => setBeFixedInput(e.target.value)}
                      placeholder="Ex: 850,00"
                    />
                  </div>
                )}

                {/* Lista rápida de custos fixos do sistema */}
                <div className="fin-be-fixed-items-pills">
                  {expenses.filter(e => e.type === 'fixed').map(fe => (
                    <span key={fe.id} className="fin-be-fixed-pill">
                      {fe.title}: <strong>R$ {fe.amount.toFixed(2)}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Custos Variáveis por Procedimento */}
              <div className="fin-be-field-block">
                <div className="fin-be-field-top">
                  <label className="fin-be-field-label">
                    <SparklesIcon className="fin-field-ico" />
                    <span>Custo Variável Médio por Unha (R$)</span>
                  </label>
                  <span className="fin-be-field-tag">Materiais gastos na cliente</span>
                </div>

                <div className="fin-be-stepper-row">
                  <div className="fin-be-chips-selector">
                    {[10, 12, 15, 18, 22].map((val) => (
                      <button
                        key={val}
                        type="button"
                        className={`fin-be-chip ${beAvgVarCost === val ? 'is-active' : ''}`}
                        onClick={() => setBeAvgVarCost(val)}
                      >
                        R$ {val},00
                      </button>
                    ))}
                  </div>

                  <div className="fin-be-custom-number-input">
                    <span className="fin-input-prefix">R$</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      className="fin-be-small-input"
                      value={beAvgVarCost}
                      onChange={(e) => setBeAvgVarCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    />
                  </div>
                </div>

                {/* Exemplo de composição de custos variáveis de manicure */}
                <div className="fin-be-breakdown-box">
                  <span className="fin-be-breakdown-title">Composição média estimada por atendimento:</span>
                  <div className="fin-be-breakdown-grid">
                    <span className="fin-be-bd-chip">💅 Gel & Base (~R$ 6,00)</span>
                    <span className="fin-be-bd-chip">🧴 Prep & Top Coat (~R$ 4,50)</span>
                    <span className="fin-be-bd-chip">🧽 Lixas & Luvas (~R$ 4,50)</span>
                  </div>
                </div>
              </div>

              {/* Preço Médio Cobrado (Ticket Médio) */}
              <div className="fin-be-field-block">
                <div className="fin-be-field-top">
                  <label className="fin-be-field-label">
                    <PriceTagIcon className="fin-field-ico" />
                    <span>Preço Médio Cobrado por Procedimento (R$)</span>
                  </label>
                  <span className="fin-be-field-tag">Ticket Médio</span>
                </div>

                <div className="fin-be-stepper-row">
                  <div className="fin-be-chips-selector">
                    {[45, 60, 75, 90, 110].map((priceVal) => (
                      <button
                        key={priceVal}
                        type="button"
                        className={`fin-be-chip ${beAvgPrice === priceVal ? 'is-active' : ''}`}
                        onClick={() => setBeAvgPrice(priceVal)}
                      >
                        R$ {priceVal},00
                      </button>
                    ))}
                  </div>

                  <div className="fin-be-custom-number-input">
                    <span className="fin-input-prefix">R$</span>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      className="fin-be-small-input"
                      value={beAvgPrice}
                      onChange={(e) => setBeAvgPrice(Math.max(1, parseFloat(e.target.value) || 1))}
                    />
                  </div>
                </div>
              </div>

              {/* Dias Trabalhados no Mês */}
              <div className="fin-be-field-block">
                <div className="fin-be-field-top">
                  <label className="fin-be-field-label">
                    <CalendarBadgeIcon className="fin-field-ico" />
                    <span>Dias Trabalhados no Mês</span>
                  </label>
                  <span className="fin-be-field-tag">Sua Rotina</span>
                </div>

                <div className="fin-be-chips-selector">
                  {[18, 20, 22, 24, 26].map((daysVal) => (
                    <button
                      key={daysVal}
                      type="button"
                      className={`fin-be-chip ${beWorkingDays === daysVal ? 'is-active' : ''}`}
                      onClick={() => setBeWorkingDays(daysVal)}
                    >
                      {daysVal} dias {daysVal === 22 ? '(Padrão)' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: MARGEM DE CONTRIBUIÇÃO (Didático e Visual) */}
            <section className="fin-be-card">
              <div className="fin-be-card-head">
                <div className="fin-be-card-title-row">
                  <TrendingUpIcon className="fin-be-card-icon" />
                  <h3 className="fin-be-card-title">2. Margem de Contribuição</h3>
                </div>
                <p className="fin-be-card-desc">
                  Quanto sobra limpo de cada cliente para cobrir seus custos fixos e virar lucro:
                </p>
              </div>

              {/* Comparador Visual em Barra */}
              <div className="fin-be-margin-visual">
                <div className="fin-be-margin-bar-wrap">
                  <div
                    className="fin-be-margin-bar-fill is-var"
                    style={{ width: `${Math.max(8, 100 - breakEvenStats.marginPercent)}%` }}
                    title="Custo de materiais"
                  >
                    <span>Materiais: R$ {breakEvenStats.effectiveVarCost.toFixed(2)}</span>
                  </div>
                  <div
                    className="fin-be-margin-bar-fill is-margin"
                    style={{ width: `${Math.max(15, breakEvenStats.marginPercent)}%` }}
                    title="Margem de contribuição limpa"
                  >
                    <span>Sobra: R$ {breakEvenStats.unitMargin.toFixed(2)}</span>
                  </div>
                </div>

                <div className="fin-be-margin-breakdown-row">
                  <div className="fin-be-mb-col">
                    <span className="fin-be-mb-label">Preço Cobrado</span>
                    <strong className="fin-be-mb-val">
                      R$ {breakEvenStats.effectivePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                    <span className="fin-be-mb-sub">100% da receita</span>
                  </div>

                  <div className="fin-be-mb-sign">-</div>

                  <div className="fin-be-mb-col">
                    <span className="fin-be-mb-label">Custo Materiais</span>
                    <strong className="fin-be-mb-val is-expense">
                      R$ {breakEvenStats.effectiveVarCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                    <span className="fin-be-mb-sub">{Math.round(100 - breakEvenStats.marginPercent)}% do valor</span>
                  </div>

                  <div className="fin-be-mb-sign">=</div>

                  <div className="fin-be-mb-col is-highlight">
                    <span className="fin-be-mb-label">Sobra Limpa (MC)</span>
                    <strong className="fin-be-mb-val is-green">
                      R$ {breakEvenStats.unitMargin.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                    <span className="fin-be-mb-sub">{Math.round(breakEvenStats.marginPercent)}% de margem</span>
                  </div>
                </div>
              </div>

              <div className="fin-be-tip-box">
                <LightbulbIcon className="fin-tip-icon" />
                <p>
                  <strong>Dica de Ouro:</strong> A cada unha que você faz por <strong>R$ {breakEvenStats.effectivePrice.toFixed(2)}</strong>, você guarda <strong>R$ {breakEvenStats.unitMargin.toFixed(2)}</strong> para pagar o aluguel e despesas. Assim que atinge {breakEvenStats.breakEvenNails} unhas no mês, todos esses R$ {breakEvenStats.unitMargin.toFixed(2)} viram <strong>seu lucro limpo!</strong>
                </p>
              </div>
            </section>

            {/* SEÇÃO 3: SIMULADOR DE SALÁRIO DOS SONHOS (Pró-labore Desejado) */}
            <section className="fin-be-card">
              <div className="fin-be-card-head">
                <div className="fin-be-card-title-row">
                  <FlameIcon className="fin-be-card-icon is-flame" />
                  <h3 className="fin-be-card-title">3. Simulador de Salário dos Sonhos</h3>
                </div>
                <p className="fin-be-card-desc">
                  Quanto você quer levar limpo para casa no mês depois de pagar todas as contas?
                </p>
              </div>

              <div className="fin-be-target-presets-row">
                {[2500, 3500, 5000, 7000, 10000].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    className={`fin-be-goal-chip ${beTargetProfit === goal ? 'is-active' : ''}`}
                    onClick={() => setBeTargetProfit(goal)}
                  >
                    R$ {goal.toLocaleString('pt-BR')}
                  </button>
                ))}
              </div>

              <div className="fin-be-custom-goal-input-row">
                <span className="fin-input-prefix">Ou digite sua meta: R$</span>
                <input
                  type="number"
                  step="100"
                  min="500"
                  max="50000"
                  className="fin-be-goal-input"
                  value={beTargetProfit}
                  onChange={(e) => setBeTargetProfit(Math.max(0, parseFloat(e.target.value) || 0))}
                />
              </div>

              {/* Resultado do Salário dos Sonhos */}
              <div className="fin-be-dream-result-card">
                <div className="fin-be-dream-top">
                  <TrophyIcon className="fin-dream-trophy-icon" />
                  <div className="fin-be-dream-texts">
                    <span className="fin-dream-title">
                      Meta: R$ {breakEvenStats.targetProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} livres no bolso
                    </span>
                    <span className="fin-dream-sub">
                      Custos Fixos (R$ {breakEvenStats.effectiveFixed.toFixed(2)}) + Salário Limpo
                    </span>
                  </div>
                </div>

                <div className="fin-be-dream-metrics-row">
                  <div className="fin-dream-metric-card">
                    <span className="fin-dream-metric-label">Total de Unhas no Mês</span>
                    <strong className="fin-dream-metric-val is-wine">
                      {breakEvenStats.profitTargetNails} unhas
                    </strong>
                    <span className="fin-dream-metric-hint">no mês completo</span>
                  </div>

                  <div className="fin-dream-metric-card">
                    <span className="fin-dream-metric-label">Ritmo Diário</span>
                    <strong className="fin-dream-metric-val">
                      {breakEvenStats.profitDailyNails} unhas
                    </strong>
                    <span className="fin-dream-metric-hint">por dia útil ({breakEvenStats.safeDays}d)</span>
                  </div>

                  <div className="fin-dream-metric-card">
                    <span className="fin-dream-metric-label">Faturamento Total</span>
                    <strong className="fin-dream-metric-val is-green">
                      R$ {breakEvenStats.profitTargetRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                    <span className="fin-dream-metric-hint">bruto necessário</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 4: SIMULADOR DE REAJUSTE DE PREÇO (O Poder de Cobrar Mais) */}
            <section className="fin-be-card">
              <div className="fin-be-card-head">
                <div className="fin-be-card-title-row">
                  <TrendingUpIcon className="fin-be-card-icon" />
                  <h3 className="fin-be-card-title">4. O Poder de Cobrar um Pouco Mais</h3>
                </div>
                <p className="fin-be-card-desc">
                  Simule aumentar R$ 10, R$ 15 ou R$ 20 no preço do serviço e veja o ponto de equilíbrio despencar:
                </p>
              </div>

              <div className="fin-be-reajuste-chips-row">
                {[0, 10, 15, 20, 30].map((bump) => (
                  <button
                    key={bump}
                    type="button"
                    className={`fin-be-reajuste-chip ${beSimPriceExtra === bump ? 'is-active' : ''}`}
                    onClick={() => setBeSimPriceExtra(bump)}
                  >
                    {bump === 0 ? 'Preço Atual' : `+ R$ ${bump},00`}
                    <small>({`R$ ${breakEvenStats.basePrice + bump}`})</small>
                  </button>
                ))}
              </div>

              <div className="fin-be-reajuste-insight-card">
                {beSimPriceExtra > 0 ? (
                  <>
                    <SparklesIcon className="fin-reajuste-icon is-active" />
                    <div className="fin-reajuste-insight-text">
                      <strong>Excelente impacto!</strong>
                      <p>
                        Cobrando <strong>R$ {breakEvenStats.effectivePrice},00</strong> por atendimento (+R$ {beSimPriceExtra}), seu ponto de equilíbrio cai para <strong>{breakEvenStats.breakEvenNails} unhas</strong>! Você precisa de <strong>menos atendimentos</strong> para pagar os custos e ganha <strong>R$ {(beSimPriceExtra * breakEvenStats.safeDays * 2).toFixed(2)} a mais de lucro</strong> no mesmo período.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <LightbulbIcon className="fin-reajuste-icon" />
                    <div className="fin-reajuste-insight-text">
                      <strong>Toque nos botões acima</strong> para simular reajustes de R$ 10 ou R$ 15 no preço e descubra quantas horas a menos de trabalho você precisará para lucrar a mesma coisa!
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* SEÇÃO 5: TABELA DE CAPACIDADE DE ATENDIMENTOS POR DIA */}
            <section className="fin-be-card">
              <div className="fin-be-card-head">
                <div className="fin-be-card-title-row">
                  <UsersIcon className="fin-be-card-icon" />
                  <h3 className="fin-be-card-title">5. Tabela de Projeção Mensal</h3>
                </div>
                <p className="fin-be-card-desc">
                  Veja quanto você fatura e quanto sobra no bolso conforme a quantidade de clientes atendidas por dia:
                </p>
              </div>

              <div className="fin-be-capacity-grid">
                {breakEvenStats.dailyScenarios.map((scen) => (
                  <div
                    key={scen.dailyNails}
                    className={`fin-be-capacity-card ${scen.netTakeHome >= breakEvenStats.targetProfit ? 'is-target-achieved' : ''}`}
                  >
                    <div className="fin-cap-top">
                      <span className="fin-cap-daily-badge">
                        {scen.dailyNails} {scen.dailyNails === 1 ? 'cliente' : 'clientes'} / dia
                      </span>
                      <span className="fin-cap-month-count">
                        {scen.monthlyNails} unhas/mês
                      </span>
                    </div>

                    <div className="fin-cap-fin-row">
                      <div className="fin-cap-fin-item">
                        <span className="fin-cap-fin-lbl">Faturamento</span>
                        <strong className="fin-cap-fin-val">
                          R$ {scen.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                        </strong>
                      </div>

                      <div className="fin-cap-fin-item is-profit">
                        <span className="fin-cap-fin-lbl">Lucro Líquido</span>
                        <strong className="fin-cap-fin-val is-green">
                          R$ {scen.netTakeHome.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                        </strong>
                      </div>
                    </div>

                    {scen.netTakeHome >= breakEvenStats.targetProfit && (
                      <div className="fin-cap-badge-goal">
                        <CheckCircleFilledIcon className="fin-mini-goal-ico" />
                        <span>Bate sua meta de R$ {breakEvenStats.targetProfit.toLocaleString('pt-BR')}!</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* ===================================================================
          MODAL 1: Registrar Despesa (Produto Selecionado ou Custo Fixo)
          =================================================================== */}
      {showExpenseModal && (
        <div className="fin-modal-backdrop" onClick={() => setShowExpenseModal(false)}>
          <div className="fin-modal-sheet" style={expenseDrag.sheetStyle} onClick={(e) => e.stopPropagation()}>
            <div className="fin-modal-drag-zone" {...expenseDrag.handleProps}>
              <div className="fin-sheet-handle" />
            </div>
            <div className="fin-modal-header">
              <h3 className="fin-modal-title">Registrar Despesa</h3>
              <p className="fin-modal-sub">Lance compras de produtos ou seus custos mensais</p>
            </div>

            {/* Alternador de Tipo de Custo */}
            <div className="fin-toggle-cost-type">
              <button
                type="button"
                className={`fin-cost-type-btn ${expType === 'variable' ? 'is-active' : ''}`}
                onClick={() => setExpType('variable')}
              >
                <PackageIcon className="fin-btn-ico" />
                <span>Custo Variável (Produto)</span>
              </button>
              <button
                type="button"
                className={`fin-cost-type-btn ${expType === 'fixed' ? 'is-active' : ''}`}
                onClick={() => setExpType('fixed')}
              >
                <BuildingIcon className="fin-btn-ico" />
                <span>Custo Mensal (Fixo)</span>
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="fin-modal-form">
              {expType === 'variable' ? (
                <>
                  <div className="fin-form-group">
                    <label className="fin-form-label">
                      Selecionar Produto Cadastrado
                    </label>
                    <div className="fin-select-row">
                      <select
                        className="fin-select-input"
                        value={expProductId}
                        onChange={(e) => setExpProductId(Number(e.target.value))}
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      className="fin-quick-link-btn"
                      onClick={() => {
                        setShowExpenseModal(false)
                        setShowProductModal(true)
                      }}
                    >
                      + Cadastrar outro produto na lista
                    </button>
                  </div>

                  <div className="fin-form-row-2">
                    <div className="fin-form-group">
                      <label className="fin-form-label">Quantidade</label>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        className="fin-text-input"
                        value={expQty}
                        onChange={(e) => setExpQty(Math.max(1, parseInt(e.target.value) || 1))}
                        required
                      />
                    </div>

                    <div className="fin-form-group">
                      <label className="fin-form-label">Data do Gasto</label>
                      <input
                        type="text"
                        className="fin-text-input"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        placeholder="Ex: Hoje, 04/10"
                        required
                      />
                    </div>
                  </div>

                  {/* Valor Total Calculado */}
                  {(() => {
                    const prod = products.find((p) => p.id === Number(expProductId)) || products[0]
                    const total = (prod ? prod.price : 0) * (Number(expQty) || 1)
                    return (
                      <div className="fin-calc-summary-box">
                        <span className="fin-calc-label">Total a registrar:</span>
                        <strong className="fin-calc-value">
                          R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </strong>
                      </div>
                    )
                  })()}
                </>
              ) : (
                <>
                  <div className="fin-form-group">
                    <label className="fin-form-label">Categoria de Custo Fixo</label>
                    <select
                      className="fin-select-input"
                      value={expFixedCategory}
                      onChange={(e) => {
                        setExpFixedCategory(e.target.value)
                        setExpFixedTitle(e.target.value)
                      }}
                    >
                      <option value="Aluguel da mesa / espaço">Aluguel da mesa / espaço</option>
                      <option value="Energia e Água">Energia e Água</option>
                      <option value="Internet Studio">Internet Studio</option>
                      <option value="Guia MEI (DAS)">Guia MEI (DAS)</option>
                      <option value="Software Bella Nails">Software Bella Nails</option>
                      <option value="Taxa Maquininha">Taxa Maquininha</option>
                      <option value="Outro Custo Fixo">Outro Custo Fixo</option>
                    </select>
                  </div>

                  <div className="fin-form-group">
                    <label className="fin-form-label">Descrição / Nome do Custo</label>
                    <input
                      type="text"
                      className="fin-text-input"
                      value={expFixedTitle}
                      onChange={(e) => setExpFixedTitle(e.target.value)}
                      placeholder="Ex: Aluguel da mesa - Outubro"
                      required
                    />
                  </div>

                  <div className="fin-form-row-2">
                    <div className="fin-form-group">
                      <label className="fin-form-label">Valor (R$)</label>
                      <input
                        type="text"
                        className="fin-text-input"
                        value={expFixedAmount}
                        onChange={(e) => setExpFixedAmount(e.target.value)}
                        placeholder="Ex: 450,00"
                        required
                      />
                    </div>

                    <div className="fin-form-group">
                      <label className="fin-form-label">Data</label>
                      <input
                        type="text"
                        className="fin-text-input"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        placeholder="Ex: 05/10/2025"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="fin-modal-actions">
                <button
                  type="button"
                  className="fin-cancel-btn"
                  onClick={() => setShowExpenseModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="fin-submit-btn">
                  Registrar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: Cadastrar Produto com Preço
          =================================================================== */}
      {showProductModal && (
        <div className="fin-modal-backdrop" onClick={() => setShowProductModal(false)}>
          <div className="fin-modal-sheet" style={productDrag.sheetStyle} onClick={(e) => e.stopPropagation()}>
            <div className="fin-modal-drag-zone" {...productDrag.handleProps}>
              <div className="fin-sheet-handle" />
            </div>
            <div className="fin-modal-header">
              <h3 className="fin-modal-title">Cadastrar Novo Produto</h3>
              <p className="fin-modal-sub">Adicione materiais e esmaltes com seus preços de compra</p>
            </div>

            <form onSubmit={handleSaveProduct} className="fin-modal-form">
              <div className="fin-form-group">
                <label className="fin-form-label">Nome do Produto</label>
                <input
                  type="text"
                  className="fin-text-input"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="Ex: Gel Construtor Hard (30g)"
                  required
                />
              </div>

              <div className="fin-form-row-2">
                <div className="fin-form-group">
                  <label className="fin-form-label">Categoria</label>
                  <select
                    className="fin-select-input"
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                  >
                    <option value="Géis">Géis</option>
                    <option value="Esmaltes">Esmaltes</option>
                    <option value="Preparadores">Preparadores</option>
                    <option value="Finalizadores">Finalizadores</option>
                    <option value="Descartáveis">Descartáveis</option>
                    <option value="Tips & Moldes">Tips & Moldes</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="fin-form-group">
                  <label className="fin-form-label">Preço Unitário (R$)</label>
                  <input
                    type="text"
                    className="fin-text-input"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="Ex: 55,00"
                    required
                  />
                </div>
              </div>

              <div className="fin-modal-actions">
                <button
                  type="button"
                  className="fin-cancel-btn"
                  onClick={() => setShowProductModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="fin-submit-btn">
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: Registrar Entrada (Atendimento de Unha Realizado)
          =================================================================== */}
      {showInflowModal && (
        <div className="fin-modal-backdrop" onClick={() => setShowInflowModal(false)}>
          <div className="fin-modal-sheet" style={inflowDrag.sheetStyle} onClick={(e) => e.stopPropagation()}>
            <div className="fin-modal-drag-zone" {...inflowDrag.handleProps}>
              <div className="fin-sheet-handle" />
            </div>
            <div className="fin-modal-header">
              <h3 className="fin-modal-title">Registrar Atendimento</h3>
              <p className="fin-modal-sub">Lance a unha feita e o valor recebido</p>
            </div>

            <form onSubmit={handleSaveInflow} className="fin-modal-form">
              <div className="fin-form-group">
                <label className="fin-form-label">Serviço de Unha Realizado</label>
                <select
                  className="fin-select-input"
                  value={infService}
                  onChange={(e) => {
                    const svc = e.target.value
                    setInfService(svc)
                    if (svc === 'Manicure') setInfAmount('30,00')
                    else if (svc === 'Pedicure') setInfAmount('35,00')
                    else if (svc === 'Alongamento em gel') setInfAmount('90,00')
                    else if (svc === 'Banho de gel') setInfAmount('70,00')
                    else if (svc === 'Nail art') setInfAmount('10,00')
                  }}
                >
                  <option value="Alongamento em gel">Alongamento em gel (R$ 90,00)</option>
                  <option value="Manicure">Manicure (R$ 30,00)</option>
                  <option value="Pedicure">Pedicure (R$ 35,00)</option>
                  <option value="Banho de gel">Banho de gel (R$ 70,00)</option>
                  <option value="Nail art">Nail art (R$ 10,00)</option>
                  <option value="Combo Manicure + Pedicure">Combo Manicure + Pedicure (R$ 65,00)</option>
                  <option value="Outro Procedimento">Outro Procedimento</option>
                </select>
              </div>

              <div className="fin-form-group">
                <label className="fin-form-label">Nome da Cliente</label>
                <input
                  type="text"
                  className="fin-text-input"
                  value={infClient}
                  onChange={(e) => setInfClient(e.target.value)}
                  placeholder="Ex: Mariana Silva"
                  required
                />
              </div>

              <div className="fin-form-row-2">
                <div className="fin-form-group">
                  <label className="fin-form-label">Valor Recebido (R$)</label>
                  <input
                    type="text"
                    className="fin-text-input"
                    value={infAmount}
                    onChange={(e) => setInfAmount(e.target.value)}
                    placeholder="Ex: 90,00"
                    required
                  />
                </div>

                <div className="fin-form-group">
                  <label className="fin-form-label">Forma de Pagamento</label>
                  <select
                    className="fin-select-input"
                    value={infMethod}
                    onChange={(e) => setInfMethod(e.target.value)}
                  >
                    <option value="pix">Pix</option>
                    <option value="card_credit">Cartão de Crédito</option>
                    <option value="card_debit">Cartão de Débito</option>
                    <option value="money">Dinheiro</option>
                  </select>
                </div>
              </div>

              <div className="fin-form-group">
                <label className="fin-form-label">Data e Hora</label>
                <input
                  type="text"
                  className="fin-text-input"
                  value={infDate}
                  onChange={(e) => setInfDate(e.target.value)}
                  placeholder="Ex: Hoje, 04/10 às 15:00"
                  required
                />
              </div>

              <div className="fin-form-group">
                <label className="fin-form-label">Observações (opcional)</label>
                <input
                  type="text"
                  className="fin-text-input"
                  value={infNotes}
                  onChange={(e) => setInfNotes(e.target.value)}
                  placeholder="Ex: Formato bailarina, francesinha"
                />
              </div>

              <div className="fin-modal-actions">
                <button
                  type="button"
                  className="fin-cancel-btn"
                  onClick={() => setShowInflowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="fin-submit-btn">
                  Registrar Entrada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior Flutuante */}
      <AppBottomNav activeTab="" onNavigateTab={onNavigateTab} />
    </main>
  )
}
