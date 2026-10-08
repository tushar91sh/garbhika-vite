import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Modal from '../common/Modal.jsx'
import FormField from './FormField.jsx'
import Button from '../common/Button.jsx'
import { closeBookingModal, submitBooking } from '../../features/booking/bookingSlice.js'
import { validateBookingForm } from '../../utils/validators.js'

const initialForm = { name: '', email: '', preferredDate: '', notes: '' }

export default function BookingModal() {
  const dispatch = useDispatch()
  const { isModalOpen, activeExpert, status } = useSelector((state) => state.booking)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const handleClose = () => {
    dispatch(closeBookingModal())
    setForm(initialForm)
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateBookingForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      await dispatch(
        submitBooking({ ...form, expertId: activeExpert?.id, expertName: activeExpert?.name })
      ).unwrap()
      toast.success(`Session request sent to ${activeExpert?.name}. We'll confirm by email shortly.`)
      handleClose()
    } catch {
      toast.error('Something went wrong sending your request. Please try again.')
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} title={`Book a Session with ${activeExpert?.name || ''}`}>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">{activeExpert?.role}</p>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          label="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Full name"
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
        <FormField
          label="Preferred Date"
          name="preferredDate"
          type="date"
          value={form.preferredDate}
          onChange={handleChange}
          error={errors.preferredDate}
        />
        <FormField
          label="Anything you'd like to share (optional)"
          name="notes"
          textarea
          value={form.notes}
          onChange={handleChange}
          placeholder="A little context helps your expert prepare."
        />
        <Button type="submit" className="w-full" isLoading={status === 'loading'}>
          {status === 'loading' ? 'Sending Request...' : 'Confirm Session Request'}
        </Button>
      </form>
    </Modal>
  )
}
