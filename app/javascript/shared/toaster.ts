const AUTO_REMOVE_IN = 50000

// toaster that is used instead of alertify
export default function showToast(
  message: string,
  type: 'success' | 'error' = 'success',
) {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.classList.add(`toast-${type}`)
  toast.textContent = message

  const closeBtn = document.createElement('button')
  closeBtn.className = 'toast-close transparent mini'

  const closeIcon = document.createElement('i')
  closeIcon.className = 'ti-close'
  closeBtn.appendChild(closeIcon)

  closeBtn.addEventListener('click', () => {
    close()
  })
  toast.appendChild(closeBtn)

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('toast-show')
  }, 0)

  setTimeout(() => {
    close()
  }, AUTO_REMOVE_IN)

  function close() {
    toast.classList.remove('toast-show')
    setTimeout(() => {
      toast.remove()
    }, 500)
  }
}

;(window as any).showToast = showToast
