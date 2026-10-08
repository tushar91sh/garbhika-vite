import CountUp from '../motion/CountUp.jsx'
import { StaggerGrid, StaggerItem } from '../motion/StaggerGrid.jsx'

export default function StatsBar({ stats, variant = 'light' }) {
  const isDark = variant === 'dark'
  return (
    <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-gutter">
      {stats.map((stat) => (
        <StaggerItem key={stat.label} className="text-center space-y-2">
          <CountUp
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
            className={`block font-display-lg text-[40px] md:text-[48px] font-semibold ${
              isDark ? 'text-surface-bright' : 'text-primary'
            }`}
          />
          <span
            className={`block font-label-caps text-label-caps tracking-widest uppercase ${
              isDark ? 'text-surface-bright/70' : 'text-on-surface-variant'
            }`}
          >
            {stat.label}
          </span>
        </StaggerItem>
      ))}
    </StaggerGrid>
  )
}
