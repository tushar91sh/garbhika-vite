import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Modal from '../common/Modal.jsx'
import { get } from '../../api/client.js'
import { DcField, PrimaryButton, fieldClass } from '../common/DesignKit.jsx'
import {
  closeBookingModal,
  submitBooking,
} from '../../features/booking/bookingSlice.js'
import { validateBookingForm } from '../../utils/validators.js'

const initialForm = {
  name: '',
  email: '',
  preferredDate: '',
  timeSlot: '',
  notes: '',
}

export default function BookingModal() {
  const dispatch = useDispatch()
  const { isModalOpen, activeExpert, status } = useSelector(
    (state) => state.booking,
  )
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [slots, setSlots] = useState([])
  const [slotError, setSlotError] = useState('')
  useEffect(() => {
    setSlots([])
    setSlotError('')
    setForm((prev) => ({ ...prev, timeSlot: '' }))
    if (!isModalOpen || !form.preferredDate) return
    let active = true
    get(
      `/bookings/availability?date=${encodeURIComponent(form.preferredDate)}&expertId=${encodeURIComponent(activeExpert?.id || '')}`,
    )
      .then((data) => {
        if (active) setSlots(data.slots)
      })
      .catch((e) => {
        if (active) setSlotError(e.message)
      })
    return () => {
      active = false
    }
  }, [isModalOpen, form.preferredDate, activeExpert?.id])

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
        submitBooking({
          ...form,
          expertId: activeExpert?.id,
          expertName: activeExpert?.name,
        }),
      ).unwrap()
      toast.success(
        `Session request sent to ${activeExpert?.name}. We'll confirm by email shortly.`,
      )
      handleClose()
    } catch {
      toast.error(
        'Something went wrong sending your request. Please try again.',
      )
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title={`Book a Session with ${activeExpert?.name || ''}`}
    >
      <p className="m-0 mb-6 text-sm font-semibold text-[#7a4f80]">
        {activeExpert?.role}
      </p>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <DcField
          label="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Full name"
        />
        <DcField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
        <DcField
          label="Preferred Date"
          name="preferredDate"
          type="date"
          value={form.preferredDate}
          onChange={handleChange}
          error={errors.preferredDate}
        />
        {slotError && (
          <p role="alert" className="text-red-700">
            {slotError}
          </p>
        )}
        <label className="flex flex-col gap-2">
          Preferred time
          <select
            className={fieldClass}
            value={form.timeSlot}
            name="timeSlot"
            onChange={handleChange}
            disabled={!slots.length}
          >
            <option value="">Choose an available time</option>
            {slots.map((slot) => (
              <option
                key={slot.time}
                value={slot.time}
                disabled={!slot.available}
              >
                {slot.time}
                {slot.available ? '' : ' (booked)'}
              </option>
            ))}
          </select>
          {errors.timeSlot && (
            <span role="alert" className="text-red-700">
              {errors.timeSlot}
            </span>
          )}
        </label>
        <DcField
          label="Anything you'd like to share (optional)"
          name="notes"
          textarea
          value={form.notes}
          onChange={handleChange}
          placeholder="A little context helps your expert prepare."
        />
        <PrimaryButton
          type="submit"
          className="w-full"
          isLoading={status === 'loading'}
        >
          {status === 'loading'
            ? 'Sending Request...'
            : 'Confirm Session Request'}
        </PrimaryButton>
      </form>
    </Modal>
  )
}
