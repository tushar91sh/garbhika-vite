import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api/client.js'
import { Eyebrow, serif } from '../components/common/DesignKit.jsx'

export default function Unsubscribe() {
  const [params] = useSearchParams()
  const [state, setState] = useState({ loading: true, message: '', ok: false })

  useEffect(() => {
    const token = params.get('token') || ''
    if (!token) {
      setState({ loading: false, ok: false, message: 'This unsubscribe link is incomplete.' })
      return
    }
    api(`/newsletter/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((data) => setState({ loading: false, ok: true, message: data.message }))
      .catch((error) => setState({ loading: false, ok: false, message: error.message }))
  }, [params])

  return (
    <main className="mx-auto flex max-w-[640px] flex-col gap-5 px-6 py-24">
      <Eyebrow>Newsletter</Eyebrow>
      <h1 className={`${serif} m-0 text-[clamp(36px,5vw,52px)] font-medium text-[#0f0014]`}>
        {state.loading ? 'One moment...' : state.ok ? 'You are unsubscribed' : 'Something went wrong'}
      </h1>
      <p className="m-0 text-[17px] leading-[1.6] text-[#4d444c]">{state.loading ? 'Updating your preferences.' : state.message}</p>
    </main>
  )
}
