const modalPadding = '48px'

const IdeaFit: {
  host: string
  boardId: string | null
  show: () => void
  setup: () => void
} = {
  host: '',
  boardId: null,
  setup: () => {
    const script = document.getElementById('ideafit')
    if (!script) {
      throw new Error('IdeaFit script tag is not found')
    }

    if (script) {
      const boardId = script.getAttribute('data-board')

      // required options
      if (!boardId) {
        throw new Error('IdeaFit boardId is not set')
      }
      IdeaFit.boardId = boardId

      // optional options, defaults to the origin the script was served from
      IdeaFit.host =
        script.getAttribute('data-host') ||
        new URL((script as HTMLScriptElement).src).origin
    }
  },
  show: () => {
    if (!IdeaFit.boardId) {
      throw new Error('IdeaFit boardId is not set')
    }

    const backdrop = document.createElement('div')
    backdrop.style.display = 'block'
    backdrop.style.position = 'fixed'
    backdrop.style.zIndex = '1000'
    backdrop.style.left = '0'
    backdrop.style.top = '0'
    backdrop.style.width = '100%'
    backdrop.style.height = '100%'
    backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)'
    document.body.appendChild(backdrop)

    // Create modal content
    const modalContent = document.createElement('div')
    modalContent.className = 'modal-content'
    modalContent.style.position = 'fixed'
    modalContent.style.top = modalPadding
    modalContent.style.right = modalPadding
    modalContent.style.bottom = modalPadding
    modalContent.style.left = modalPadding
    modalContent.style.backgroundColor = '#f1f1f1'
    modalContent.style.padding = '20px'
    modalContent.style.borderRadius = '8px'
    backdrop.appendChild(modalContent)

    // Create close button
    const closeButton = document.createElement('span')
    closeButton.className = 'close'
    closeButton.innerHTML = '&times;'
    closeButton.style.position = 'absolute'
    closeButton.style.top = '10px'
    closeButton.style.right = '10px'
    closeButton.style.cursor = 'pointer'
    closeButton.style.fontSize = '24px'
    closeButton.style.color = '#777'
    modalContent.appendChild(closeButton)

    closeButton.addEventListener('click', function () {
      backdrop.style.display = 'none'
    })

    // Create iframe
    const iframe = document.createElement('iframe')
    iframe.frameBorder = '0'
    iframe.style.width = '100%'
    iframe.style.height = 'calc(100% - 50px)'
    iframe.src = `${IdeaFit.host}/b/${IdeaFit.boardId}`
    modalContent.appendChild(iframe)
  },
}

;(window as any).IdeaFit = IdeaFit

document.addEventListener('DOMContentLoaded', function () {
  IdeaFit.setup()
})
