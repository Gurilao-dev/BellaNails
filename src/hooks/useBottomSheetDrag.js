import { useState, useRef, useCallback } from 'react'

/**
 * Hook para permitir arrastar a barrinha superior do modal (bottom sheet) para baixo e fechar
 * Suporta toque no mobile e mouse drag no desktop.
 */
export function useBottomSheetDrag(onClose, threshold = 75) {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const startYRef = useRef(0)
  const currentYRef = useRef(0)
  const isDraggingRef = useRef(false)

  const handlePointerDown = useCallback((e) => {
    if (e.button && e.button !== 0) return
    isDraggingRef.current = true
    setIsDragging(true)
    startYRef.current = e.clientY
    currentYRef.current = e.clientY

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // fallback safe
    }
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return
    currentYRef.current = e.clientY
    const delta = currentYRef.current - startYRef.current
    if (delta > 0) {
      setDragY(delta)
    } else {
      // Leve resistência para cima
      setDragY(delta * 0.15)
    }
  }, [])

  const handlePointerUp = useCallback((e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // fallback safe
    }

    const delta = currentYRef.current - startYRef.current
    if (delta > threshold) {
      // Anima para baixo e chama onClose
      setIsClosing(true)
      setDragY(500)
      setTimeout(() => {
        onClose?.()
        setIsClosing(false)
        setDragY(0)
      }, 200)
    } else {
      // Volta à posição original
      setDragY(0)
    }
  }, [onClose, threshold])

  const handlePointerCancel = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)
    setDragY(0)
  }, [])

  const sheetStyle = {
    transform: dragY !== 0 ? `translate3d(0, ${dragY}px, 0)` : undefined,
    transition: isDragging
      ? 'none'
      : isClosing
      ? 'transform 0.2s cubic-bezier(0.4, 0, 1, 1)'
      : 'transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1)',
    willChange: 'transform',
  }

  const handleProps = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
    style: {
      touchAction: 'none',
      userSelect: 'none',
      cursor: isDragging ? 'grabbing' : 'grab',
    },
  }

  return {
    dragY,
    isDragging,
    sheetStyle,
    handleProps,
  }
}
