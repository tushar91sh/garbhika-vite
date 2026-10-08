import { motion } from 'framer-motion'

const directionOffsets = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered fade/slide reveal. Wrap any section or card in this to
 * get a consistent entrance animation across the site without repeating
 * IntersectionObserver boilerplate everywhere.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
  once = true,
  amount = 0.2,
  as = 'div',
}) {
  const offset = directionOffsets[direction] || directionOffsets.up
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
