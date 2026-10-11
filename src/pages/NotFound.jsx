import { Link } from 'react-router-dom'
import { serif } from '../components/common/DesignKit.jsx'

export default function NotFound() {
  return (
    <section className="relative grid min-h-[calc(100vh-96px)] place-items-center overflow-hidden px-6 pb-20 pt-[44px] text-center">
      <div className="pointer-events-none absolute left-1/2 top-[40%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(233,181,237,0.3)] blur-[90px]" />
      <div className="relative flex max-w-[560px] flex-col items-center gap-5">
        <span className={`${serif} text-[clamp(96px,16vw,160px)] italic leading-none text-[#e9b5ed]`}>404</span>
        <h1 className={`${serif} m-0 text-[clamp(32px,4vw,44px)] font-medium leading-[1.15] text-[#0f0014]`}>
          This page wandered off the path.
        </h1>
        <p className="m-0 text-[18px] leading-[1.65] text-[#4d444c]">
          We couldn't find the page you were looking for. Let's guide you back to the sanctuary.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#0f0014] px-7 py-4 text-base font-medium text-white no-underline transition-colors hover:bg-[#330d3b] hover:text-white"
        >
          Return Home
          <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}
