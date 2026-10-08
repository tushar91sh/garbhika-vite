import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

/**
 * Animates a number counting up from 0 once it scrolls into view. Used for
 * the trust/stats bars across the site (e.g. "12,000+ Mothers Supported").
 */
export default function CountUp({ value, suffix = '', prefix = '', duration = 1.6, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, value, duration])

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </motion.span>
  )
}
