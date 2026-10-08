export default function FormField({ label, name, error, textarea, ...props }) {
  const Field = textarea ? 'textarea' : 'input'
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        rows={textarea ? 5 : undefined}
        className={`w-full rounded-xl border bg-surface px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow ${
          error ? 'border-error' : 'border-surface-variant'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="text-error text-sm font-body-md">
          {error}
        </p>
      )}
    </div>
  )
}
