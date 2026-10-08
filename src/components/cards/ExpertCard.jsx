import Button from '../common/Button.jsx'

export default function ExpertCard({ expert, onBook }) {
  return (
    <div className="bg-surface-bright rounded-[24px] overflow-hidden border border-outline-variant/50 shadow-[0_10px_35px_rgba(51,13,59,0.05)] hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(51,13,59,0.12)] transition-all duration-300 flex flex-col group">
      <div className="h-72 relative overflow-hidden bg-surface-container-high">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={expert.image}
          alt={`${expert.name}, ${expert.role}`}
          loading="lazy"
        />
      </div>
      <div className="p-7 flex-grow flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
            {expert.tag}
          </span>
          <span className="bg-surface text-primary text-xs px-2 py-1 rounded border border-surface-variant font-label-caps">
            {expert.role}
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md text-primary">{expert.name}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{expert.bio}</p>
        {expert.bookable && (
          <Button variant="secondary" className="w-full !rounded-full !py-3 mt-4" onClick={() => onBook(expert)}>
            Book a Session
          </Button>
        )}
      </div>
    </div>
  )
}
