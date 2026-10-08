import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-margin-mobile">
      <div
        className="absolute inset-0 bg-charcoal-plum/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative bg-surface-bright rounded-2xl shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-6">
          <h3 className="font-headline-md text-headline-md text-primary pr-4">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
