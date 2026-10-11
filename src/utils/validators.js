export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateContactForm({ name, email, message }) {
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!email || !isValidEmail(email)) errors.email = 'Please enter a valid email address.'
  if (!message || message.trim().length < 10) errors.message = 'Message should be at least 10 characters.'
  return errors
}

export function validateBookingForm({ name, email, preferredDate, timeSlot }) {
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!email || !isValidEmail(email)) errors.email = 'Please enter a valid email address.'
  if (!preferredDate) errors.preferredDate = 'Please select a preferred date.'
  if (preferredDate && !timeSlot) errors.timeSlot = 'Please choose an available time.'
  return errors
}

export function validateAuthForm({ name, email, password, isSignup }) {
  const errors = {}
  if (isSignup && (!name || name.trim().length < 2)) errors.name = 'Please enter your full name.'
  if (!email || !isValidEmail(email)) errors.email = 'Please enter a valid email address.'
  if (!password || password.length < 8) errors.password = 'Password must be at least 8 characters.'
  else if (password.length > 72) errors.password = 'Password must be 72 characters or fewer.'
  return errors
}

export function validateNewPassword({ password, confirm }) {
  const errors = {}
  if (!password || password.length < 8) errors.password = 'Password must be at least 8 characters.'
  else if (password.length > 72) errors.password = 'Password must be 72 characters or fewer.'
  if (password !== confirm) errors.confirm = 'Passwords do not match.'
  return errors
}
