import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { db, auth } from './config.js'

// =============================================================================
// 1. AUTENTICAÇÃO DA MANICURE (ADMIN)
// =============================================================================

export async function loginManicure(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    // Salva sessão local para persistência garantida
    localStorage.setItem('bella_manicure_session', JSON.stringify({
      uid: cred.user.uid,
      email: cred.user.email,
    }))
    return { success: true, user: cred.user }
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return { success: false, error: error.message }
  }
}

export async function registerManicureAccount(email, password, salonData = {}) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    
    // Salva perfil inicial no Firestore
    const profileRef = doc(db, 'settings', 'salon_profile')
    const initialProfile = {
      uid: cred.user.uid,
      email: cred.user.email,
      salonName: salonData.salonName || 'Bella Nails',
      ownerName: salonData.ownerName || 'Ana Paula',
      phone: salonData.phone || '(11) 98765-4321',
      address: salonData.address || 'Rua das Flores, 123 - Centro',
      openTime: salonData.openTime || '08:00',
      closeTime: salonData.closeTime || '19:30',
      slotInterval: 30,
      allowNextDayBooking: true,
      workDays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      blockedSlots: {},
      createdAt: serverTimestamp(),
    }
    await setDoc(profileRef, initialProfile, { merge: true })

    localStorage.setItem('bella_manicure_session', JSON.stringify({
      uid: cred.user.uid,
      email: cred.user.email,
    }))

    return { success: true, user: cred.user }
  } catch (error) {
    console.error('Erro ao cadastrar manicure:', error)
    return { success: false, error: error.message }
  }
}

export async function logoutManicure() {
  try {
    await signOut(auth)
    localStorage.removeItem('bella_manicure_session')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem('bella_manicure_session', JSON.stringify({
        uid: user.uid,
        email: user.email,
      }))
    }
    callback(user)
  })
}

// =============================================================================
// 2. CONFIGURAÇÕES DO SALÃO E HORÁRIOS DA MANICURE
// =============================================================================

export async function getSalonSettings() {
  try {
    const docRef = doc(db, 'settings', 'salon_profile')
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return snapshot.data()
    }
    // Cria padrão se ainda não existir
    const defaultData = {
      salonName: 'Bella Nails',
      ownerName: 'Ana Paula',
      phone: '(11) 98765-4321',
      address: 'Rua das Flores, 123 - Centro',
      openTime: '08:00',
      closeTime: '19:30',
      slotInterval: 30,
      allowNextDayBooking: true,
      workDays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      blockedSlots: {},
    }
    await setDoc(docRef, defaultData)
    return defaultData
  } catch (error) {
    console.warn('Usando fallback local para configurações:', error)
    return {
      salonName: 'Bella Nails',
      ownerName: 'Ana Paula',
      phone: '(11) 98765-4321',
      address: 'Rua das Flores, 123 - Centro',
      openTime: '08:00',
      closeTime: '19:30',
      slotInterval: 30,
      allowNextDayBooking: true,
      workDays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      blockedSlots: {},
    }
  }
}

export function subscribeToSalonSettings(callback) {
  const docRef = doc(db, 'settings', 'salon_profile')
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data())
    }
  }, (err) => {
    console.warn('Snapshot settings error:', err)
  })
}

export async function updateSalonSettings(data) {
  try {
    const docRef = doc(db, 'settings', 'salon_profile')
    await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true })
    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error)
    return { success: false, error: error.message }
  }
}

// Alterna bloqueio de um horário específico em um dia
export async function toggleSlotBlocked(dateKey, timeSlot) {
  try {
    const current = await getSalonSettings()
    const blockedSlots = current.blockedSlots || {}
    const dayBlocked = blockedSlots[dateKey] || []

    let updatedDayBlocked = []
    if (dayBlocked.includes(timeSlot)) {
      // Reativa
      updatedDayBlocked = dayBlocked.filter((t) => t !== timeSlot)
    } else {
      // Bloqueia / Desativa
      updatedDayBlocked = [...dayBlocked, timeSlot]
    }

    const updatedBlocked = {
      ...blockedSlots,
      [dateKey]: updatedDayBlocked,
    }

    await updateSalonSettings({ blockedSlots: updatedBlocked })
    return { success: true, isBlocked: updatedDayBlocked.includes(timeSlot) }
  } catch (error) {
    console.error('Erro ao alternar horário:', error)
    return { success: false, error: error.message }
  }
}

// Configura se permite ou não agendamentos para o dia seguinte
export async function setNextDayBookingAllowed(allowed) {
  return updateSalonSettings({ allowNextDayBooking: Boolean(allowed) })
}

// =============================================================================
// 3. CLIENTES (SALVAR NOME, NÚMERO E GERAR LINK WHATSAPP)
// =============================================================================

export function cleanPhoneNumber(phone) {
  if (!phone) return ''
  return phone.replace(/\D/g, '')
}

export function getWhatsAppUrl(phone, clientName = '') {
  const clean = cleanPhoneNumber(phone)
  if (!clean) return ''
  const number = clean.length <= 11 ? `55${clean}` : clean
  const text = encodeURIComponent(
    `Olá ${clientName ? clientName : ''}, tudo bem? Aqui é do Studio Bella Nails!`
  )
  return `https://wa.me/${number}?text=${text}`
}

export async function saveClient(clientData) {
  try {
    const cleanPhone = cleanPhoneNumber(clientData.phone)
    if (!cleanPhone) throw new Error('Telefone inválido')

    const clientRef = doc(db, 'clients', cleanPhone)
    const existing = await getDoc(clientRef)

    const payload = {
      name: clientData.name || 'Cliente',
      phone: clientData.phone,
      cleanPhone: cleanPhone,
      updatedAt: serverTimestamp(),
    }

    if (!existing.exists()) {
      payload.createdAt = serverTimestamp()
      payload.appointmentsCount = 1
      payload.totalSpent = 0
    } else {
      const current = existing.data()
      payload.appointmentsCount = (current.appointmentsCount || 0) + 1
    }

    await setDoc(clientRef, payload, { merge: true })

    // Mantém conectado no navegador do cliente
    localStorage.setItem('bella_client_user', JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      cleanPhone: cleanPhone,
    }))

    return { success: true, client: payload }
  } catch (error) {
    console.error('Erro ao salvar cliente:', error)
    return { success: false, error: error.message }
  }
}

export function subscribeToClients(callback) {
  const colRef = collection(db, 'clients')
  return onSnapshot(colRef, (snapshot) => {
    const list = []
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    callback(list)
  }, (err) => {
    console.warn('Erro ao carregar clientes:', err)
  })
}

// =============================================================================
// 4. AGENDAMENTOS (APPOINTMENTS)
// =============================================================================

export async function createAppointment(apptData) {
  try {
    const colRef = collection(db, 'appointments')
    const payload = {
      clientName: apptData.clientName || 'Cliente',
      clientPhone: apptData.clientPhone || '',
      cleanPhone: cleanPhoneNumber(apptData.clientPhone),
      serviceTitle: apptData.serviceTitle || 'Alongamento em gel',
      serviceId: apptData.serviceId || 'alongamento',
      price: apptData.price || 'R$ 90,00',
      priceValue: parsePriceValue(apptData.price),
      duration: apptData.duration || '1h 30 min',
      professionalName: apptData.professionalName || 'Ana Paula',
      date: apptData.date || new Date().toISOString().split('T')[0],
      dateLabel: apptData.dateLabel || 'Ter, 06 de out de 2026',
      time: apptData.time || '14:00',
      observation: apptData.observation || '',
      status: 'confirmado', // 'confirmado' | 'finalizado' | 'cancelado'
      createdAt: serverTimestamp(),
    }

    const docRef = await addDoc(colRef, payload)
    
    // Salva/Atualiza cliente no banco automaticamente
    if (payload.clientPhone) {
      await saveClient({
        name: payload.clientName,
        phone: payload.clientPhone,
      })
    }

    // Salva localmente para a sessão do cliente
    localStorage.setItem('bella_client_confirmed_appointment', JSON.stringify({
      id: docRef.id,
      ...payload,
    }))

    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    return { success: false, error: error.message }
  }
}

export function subscribeToAppointments(callback) {
  const colRef = collection(db, 'appointments')
  return onSnapshot(colRef, (snapshot) => {
    const list = []
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    callback(list)
  }, (err) => {
    console.warn('Erro ao carregar agendamentos:', err)
  })
}

// Atualiza status do agendamento (Ex: finalizado/recebido -> cai no financeiro)
export async function updateAppointmentStatus(appointmentId, newStatus) {
  try {
    const apptRef = doc(db, 'appointments', appointmentId)
    const apptSnap = await getDoc(apptRef)
    if (!apptSnap.exists()) throw new Error('Agendamento não encontrado')

    const appt = apptSnap.data()
    await updateDoc(apptRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    })

    // Se a manicure marcou como "finalizado", gera entrada automática no financeiro!
    if (newStatus === 'finalizado') {
      await addFinancialTransaction({
        type: 'entrada',
        amount: appt.priceValue || parsePriceValue(appt.price),
        description: `Atendimento: ${appt.serviceTitle} (${appt.clientName})`,
        category: 'Serviços',
        clientName: appt.clientName,
        appointmentId: appointmentId,
        date: new Date().toISOString(),
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar status do agendamento:', error)
    return { success: false, error: error.message }
  }
}

// =============================================================================
// 5. SISTEMA FINANCEIRO (REAL E LIMPO COM ENTRADAS E SAÍDAS)
// =============================================================================

export function parsePriceValue(priceStr) {
  if (typeof priceStr === 'number') return priceStr
  if (!priceStr) return 0
  const clean = priceStr.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.')
  const num = parseFloat(clean)
  return isNaN(num) ? 0 : num
}

export async function addFinancialTransaction(data) {
  try {
    const colRef = collection(db, 'financial')
    const payload = {
      type: data.type || 'entrada', // 'entrada' | 'saida'
      amount: parseFloat(data.amount) || 0,
      description: data.description || 'Receita de Serviço',
      category: data.category || 'Serviços',
      clientName: data.clientName || '',
      date: data.date || new Date().toISOString(),
      appointmentId: data.appointmentId || null,
      createdAt: serverTimestamp(),
    }
    const docRef = await addDoc(colRef, payload)
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Erro ao adicionar transação financeira:', error)
    return { success: false, error: error.message }
  }
}

export function subscribeToFinancial(callback) {
  const colRef = collection(db, 'financial')
  return onSnapshot(colRef, (snapshot) => {
    const list = []
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    callback(list)
  }, (err) => {
    console.warn('Erro ao carregar financeiro:', err)
  })
}

export async function deleteFinancialTransaction(id) {
  try {
    const docRef = doc(db, 'financial', id)
    await deleteDoc(docRef)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// =============================================================================
// 6. SERVIÇOS NO FIRESTORE
// =============================================================================

export async function initializeDefaultServicesIfEmpty() {
  try {
    const colRef = collection(db, 'services')
    const snapshot = await getDocs(colRef)
    if (!snapshot.empty) return

    const defaults = [
      {
        id: 'alongamento',
        name: 'Alongamento em gel',
        description: 'Unhas mais fortes e duradouras.',
        duration: '1h 30 min',
        price: 'R$ 90,00',
        priceValue: 90,
        active: true,
      },
      {
        id: 'banho',
        name: 'Banho de gel',
        description: 'Brilho e resistência para suas unhas.',
        duration: '1h 00 min',
        price: 'R$ 70,00',
        priceValue: 70,
        active: true,
      },
      {
        id: 'manicure',
        name: 'Manicure',
        description: 'Cuide das suas unhas com muito carinho.',
        duration: '45 min',
        price: 'R$ 30,00',
        priceValue: 30,
        active: true,
      },
      {
        id: 'pedicure',
        name: 'Pedicure',
        description: 'Bem-estar e beleza do pé ao coração.',
        duration: '50 min',
        price: 'R$ 35,00',
        priceValue: 35,
        active: true,
      },
      {
        id: 'nailart',
        name: 'Nail art',
        description: 'Arte e detalhes únicos para suas unhas.',
        duration: '15 min',
        price: 'R$ 10,00',
        priceValue: 10,
        active: true,
      },
    ]

    for (const item of defaults) {
      await setDoc(doc(db, 'services', item.id), item)
    }
  } catch (e) {
    console.warn('Erro ao inicializar serviços:', e)
  }
}

export function subscribeToServices(callback) {
  const colRef = collection(db, 'services')
  return onSnapshot(colRef, (snapshot) => {
    const list = []
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    callback(list)
  }, (err) => {
    console.warn('Erro ao escutar serviços:', err)
  })
}

export async function saveService(serviceData) {
  try {
    const id = serviceData.id ? String(serviceData.id) : `svc_${Date.now()}`
    const docRef = doc(db, 'services', id)
    const payload = {
      ...serviceData,
      id,
      updatedAt: serverTimestamp(),
    }
    await setDoc(docRef, payload, { merge: true })
    return { success: true, id }
  } catch (error) {
    console.error('Erro ao salvar serviço:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteService(serviceId) {
  try {
    const docRef = doc(db, 'services', String(serviceId))
    await deleteDoc(docRef)
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir serviço:', error)
    return { success: false, error: error.message }
  }
}

export async function toggleServiceActive(serviceId, active) {
  try {
    const docRef = doc(db, 'services', String(serviceId))
    await updateDoc(docRef, {
      active: Boolean(active),
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    console.error('Erro ao alternar status do serviço:', error)
    return { success: false, error: error.message }
  }
}

// Escuta agendamentos de uma cliente específica por telefone
export function subscribeToClientAppointments(clientPhone, callback) {
  const colRef = collection(db, 'appointments')
  const cleanPhone = cleanPhoneNumber(clientPhone)
  return onSnapshot(colRef, (snapshot) => {
    const list = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      if (!cleanPhone || cleanPhoneNumber(data.clientPhone) === cleanPhone) {
        list.push({ id: doc.id, ...data })
      }
    })
    callback(list)
  }, (err) => {
    console.warn('Erro ao carregar agendamentos da cliente:', err)
  })
}

