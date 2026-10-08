export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl space-y-4 ${alignClasses}`}>
      {eyebrow && (
        <span className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-headline-lg text-headline-lg text-primary">{title}</h2>
      {description && <p className="font-body-lg text-body-lg text-on-surface-variant">{description}</p>}
    </div>
  )
}
