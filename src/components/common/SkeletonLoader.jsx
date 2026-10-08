export function SkeletonLine({ className = '' }) {
  return <div className={`skeleton rounded ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm">
      <div className="skeleton h-64 w-full" />
      <div className="p-8 space-y-4">
        <SkeletonLine className="h-3 w-1/3" />
        <SkeletonLine className="h-6 w-2/3" />
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-5/6" />
        <SkeletonLine className="h-12 w-full rounded-full mt-4" />
      </div>
    </div>
  )
}

export function SkeletonAvatarRow() {
  return (
    <div className="bg-surface-container-high rounded-xl p-6 flex items-center gap-6">
      <div className="skeleton w-24 h-24 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <SkeletonLine className="h-5 w-1/2" />
        <SkeletonLine className="h-3 w-1/3" />
        <SkeletonLine className="h-3 w-2/3" />
      </div>
    </div>
  )
}
