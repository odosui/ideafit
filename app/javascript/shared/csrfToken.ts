export default function csrfToken() {
  const tokenEl = document.querySelector<HTMLMetaElement>(
    'meta[name="csrf-token"]',
  )
  if (!tokenEl) {
    throw new Error('CSRF token not found')
  }
  return tokenEl.content
}
