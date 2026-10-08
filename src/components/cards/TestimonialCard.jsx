export default function TestimonialCard({ quote, author }) {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding text-center">
      <div className="premium-surface rounded-[32px] px-6 py-14 md:px-14 md:py-20">
      <span
        className="material-symbols-outlined text-surface-tint text-5xl mb-6 opacity-50"
        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
      >
        format_quote
      </span>
      <blockquote className="font-display-lg text-[36px] md:text-[52px] italic text-primary max-w-4xl mx-auto leading-tight mb-8">
        "{quote}"
      </blockquote>
      <cite className="font-body-md text-body-md text-on-surface-variant not-italic">— {author}</cite>
      </div>
    </section>
  )
}
