export default function FAQAccordion({ faqs }) {
  return (
    <div className="divide-y divide-surface-variant">
      {faqs.map((faq) => (
        <details key={faq.id} className="py-6 group">
          <summary className="flex justify-between items-center gap-4 cursor-pointer list-none">
            <h3 className="font-headline-md text-[20px] text-primary m-0">{faq.question}</h3>
            <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
              add
            </span>
          </summary>
          <p className="mt-4 font-body-md text-body-md text-on-surface-variant max-w-3xl">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
