export default function VoiceBubble({ author, quote, relating }) {
  return (
    <div className="bg-surface-bright p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full border border-surface-container-high">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">
            {author.charAt(0)}
          </div>
          <span className="font-body-md text-body-md text-on-surface-variant">{author}</span>
        </div>
        <p className="font-headline-md text-headline-md text-primary italic leading-relaxed">"{quote}"</p>
      </div>
      <div className="pt-6 mt-6 border-t border-surface-container-high flex items-center gap-2 text-surface-tint">
        <span className="material-symbols-outlined icon-fill">favorite</span>
        <span className="font-label-caps text-label-caps">{relating} Mothers relating</span>
      </div>
    </div>
  )
}
