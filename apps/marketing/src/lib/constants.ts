export const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.sniptube.tech/api'
    : 'http://localhost:3000/api'

export const invalidStartOrEndTimeMessage = 'Invalid start or end time. Please try again.'
