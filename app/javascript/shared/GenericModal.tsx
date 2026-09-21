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

const GenericModal: React.FC<
  React.PropsWithChildren<{
    isOpen: boolean
    title: string
    onRequestClose: () => void
  }>
> = ({ children, isOpen, title, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal__header">
        <h1>{title}</h1>
        <button
          type="button"
          className="modal__close"
          aria-label="Close"
          onClick={onRequestClose}
        >
          <i className="ti-close" />
        </button>
      </div>
      <div className="modal__body">{children}</div>
    </Modal>
  )
}

export default GenericModal
