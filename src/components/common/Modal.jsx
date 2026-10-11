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
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-[rgba(26,22,28,0.55)] backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-[520px] max-h-[calc(100vh-32px)] overflow-y-auto rounded-[28px] bg-[#fff7fd] p-8 shadow-[0_30px_90px_rgba(15,0,20,0.35)]"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <h3 className="m-0 pr-4 font-['Playfair_Display',serif] text-[28px] font-medium leading-[1.2] text-[#0f0014]">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 flex-none cursor-pointer place-items-center rounded-full border-0 bg-[#efe5ee] text-[#0f0014] transition-colors hover:bg-[#e2ddf5]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
