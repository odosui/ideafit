const AUTO_REMOVE_IN = 50000

const ICONS = { success: 'ti-check', error: 'ti-alert' }

function createIcon(type: 'success' | 'error') {
  const icon = document.createElement('i')
  icon.className = `toast__icon ${ICONS[type]}`
  icon.setAttribute('aria-hidden', 'true')
  return icon
}

// toaster that is used instead of alertify
export default function showToast(
  message: string,
  type: 'success' | 'error' = 'success',
) {
  const toast = document.createElement('div')
  toast.className = 'toast'
  if (type === 'error') toast.classList.add('toast--error')
  toast.appendChild(createIcon(type))
  toast.appendChild(document.createTextNode(message))

  const closeBtn = document.createElement('button')
  closeBtn.className = 'btn btn--ghost btn--sm'
  closeBtn.setAttribute('aria-label', 'Close')

  const closeIcon = document.createElement('i')
  closeIcon.className = 'ti-close'
  closeBtn.appendChild(closeIcon)

  closeBtn.addEventListener('click', () => {
    close()
  })
  toast.appendChild(closeBtn)

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('toast--visible')
  }, 0)

  setTimeout(() => {
    close()
  }, AUTO_REMOVE_IN)

  function close() {
    toast.classList.remove('toast--visible')
    setTimeout(() => {
      toast.remove()
    }, 500)
  }
}
