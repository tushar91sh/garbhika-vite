export default function TeamContactCard({ name, role, email, image }) {
  return (
    <div className="bg-surface-container-low rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
      <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" loading="lazy" />
      <div className="min-w-0">
        <h4 className="font-headline-md text-[18px] text-primary truncate">{name}</h4>
        <p className="font-label-caps text-label-caps text-secondary mb-1">{role}</p>
        <a href={`mailto:${email}`} className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors truncate block">
          {email}
        </a>
      </div>
    </div>
  )
}
