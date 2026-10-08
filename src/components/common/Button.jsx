const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-body-md text-body-md shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none'

const variants = {
  primary: 'bg-primary text-on-primary px-8 py-4 hover:-translate-y-0.5 hover:shadow-lg',
  secondary: 'bg-surface-container-highest text-primary px-8 py-4 hover:-translate-y-0.5 hover:bg-surface-variant hover:shadow-md',
  outline: 'border border-primary/70 bg-surface-bright text-primary px-8 py-4 hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary hover:shadow-md',
  ghost: 'text-primary px-2 py-2 hover:opacity-70',
}

export default function Button({ variant = 'primary', className = '', children, isLoading, ...props }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading && (
        <span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}
