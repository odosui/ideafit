import * as React from 'react'
import Modal from 'react-modal'

/* const customStyles = { */
/*   content: { */
/*     top: '40%', */
/*     left: '50%', */
/*     right: 'auto', */
/*     bottom: 'auto', */
/*     marginRight: '-50%', */
/*     transform: 'translate(-50%, -50%)', */
/*   }, */
/* } */

Modal.setAppElement('#app')

const GenericModal: React.FC<{
  isOpen: boolean
  title: string
  onRequestClose: () => void
}> = ({ children, isOpen, title, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="generic-modal"
      overlayClassName="Overlay"
    >
      <div className="modal-header">
        <h1>{title}</h1>
        <div className="close-modal">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onRequestClose()
            }}
          >
            <i className="fas fa-times" />
          </a>
        </div>
      </div>
      <div className="modal-body">{children}</div>
    </Modal>
  )
}

export default GenericModal
