import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { patch } from '../../api/client.js'
import { fetchMe } from '../../features/auth/authSlice.js'
import { DcField, PrimaryButton, fieldClass } from '../common/DesignKit.jsx'
const services = [
  'Garbh Sanskar',
  'Pregnancy yoga',
  'Pregnancy nutrition',
  'Psychological support',
  'Mental wellness',
  'Pregnancy guidance',
  'Community support',
  'Help me choose',
]
export default function JourneyForm({ onSaved }) {
  const user = useSelector((s) => s.auth.user),
    dispatch = useDispatch()
  const [form, setForm] = useState({
      stage: '',
      dueDate: '',
      services: [],
      language: '',
      context: '',
      ...user?.profile,
    }),
    [error, setError] = useState(''),
    [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false)
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (!form.stage || !form.language || !form.services.length)
      return setError(
        'Choose your stage, at least one service and a preferred language.',
      )
    setBusy(true)
    try {
      await patch('/me/journey', form)
      await dispatch(fetchMe()).unwrap()
      setMessage('Your journey preferences are saved.')
      onSaved?.()
    } catch (e) {
      setError(e.message || 'Could not save preferences.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
      {error && (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      )}
      {message && <p role="status">{message}</p>}
      <label className="flex flex-col gap-2">
        Current journey stage *
        <select
          className={fieldClass}
          name="stage"
          value={form.stage}
          onChange={change}
        >
          <option value="">Choose your stage</option>
          {[
            'Planning pregnancy',
            'Pregnant',
            'Postpartum',
            'Exploring support',
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      {form.stage === 'Pregnant' && (
        <DcField
          label="Expected due date (optional; leave blank if unknown)"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={change}
        />
      )}
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 font-semibold">
          Services you are interested in *
        </legend>
        {services.map((x) => (
          <label key={x} className="text-sm">
            <input
              type="checkbox"
              checked={form.services.includes(x)}
              onChange={(e) =>
                setForm({
                  ...form,
                  services: e.target.checked
                    ? [...form.services, x]
                    : form.services.filter((y) => y !== x),
                })
              }
            />{' '}
            {x}
          </label>
        ))}
      </fieldset>
      <label className="flex flex-col gap-2">
        Preferred language *
        <select
          className={fieldClass}
          name="language"
          value={form.language}
          onChange={change}
        >
          <option value="">Choose a language</option>
          {['Hindi', 'English', 'Both'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <DcField
        label="Anything you want us to understand? (optional)"
        name="context"
        textarea
        maxLength={1000}
        value={form.context}
        onChange={change}
      />
      <p className="text-sm text-[#665c6b]">
        Please avoid medical reports or sensitive medical details here. Maximum
        1,000 characters.
      </p>
      <PrimaryButton type="submit" isLoading={busy}>
        Save my journey
      </PrimaryButton>
    </form>
  )
}
