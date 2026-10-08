import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Wraps a grid/list of cards so children animate in with a staggered
 * cascade the first time they scroll into view. Use <StaggerItem> for each
 * direct child that should participate in the stagger.
 */
export function StaggerGrid({ children, className = '', amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}
