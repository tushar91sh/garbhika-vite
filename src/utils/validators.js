export function isValidEmail(value) {
  if (typeof value !== 'string') return false
  const email = value.trim().toLowerCase(),
    [local = '', domain = ''] = email.split('@')
  return (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/.test(
      email,
    ) &&
    email.length <= 254 &&
    local.length <= 64 &&
    !local.startsWith('.') &&
    !local.endsWith('.') &&
    !local.includes('..') &&
    domain.split('.').every((label) => label.length <= 63)
  )
}

export function validateContactForm({ name, email, message }) {
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!email || !isValidEmail(email))
    errors.email = 'Please enter a valid email address.'
  if (!message || message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'
  return errors
}

export function validateBookingForm({ name, email, preferredDate, timeSlot }) {
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!email || !isValidEmail(email))
    errors.email = 'Please enter a valid email address.'
  if (!preferredDate) errors.preferredDate = 'Please select a preferred date.'
  if (preferredDate && !timeSlot)
    errors.timeSlot = 'Please choose an available time.'
  return errors
}

export function validateAuthForm({ name, email, password, isSignup }) {
  const errors = {}
  if (isSignup && (!name || name.trim().length < 2 || name.trim().length > 80))
    errors.name = 'Please enter your full name.'
  if (!email || !isValidEmail(email))
    errors.email = 'Please enter a valid email address.'
  if (!password || password.length < 8)
    errors.password = 'Password must be at least 8 characters.'
  else if (new TextEncoder().encode(password).length > 72)
    errors.password = 'Password must be no more than 72 UTF-8 bytes.'
  return errors
}

export function validateNewPassword({ password, confirm }) {
  const errors = {}
  if (!password || password.length < 8)
    errors.password = 'Password must be at least 8 characters.'
  else if (new TextEncoder().encode(password).length > 72)
    errors.password = 'Password must be no more than 72 UTF-8 bytes.'
  if (password !== confirm) errors.confirm = 'Passwords do not match.'
  return errors
}
