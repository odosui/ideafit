import * as React from 'react'
import Button from '../../../../../shared/Button'

interface Props {
  message: string
  confirmLabel: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmStep: React.FC<Props> = ({
  message,
  confirmLabel,
  loading = false,
  onConfirm,
  onCancel,
}) => (
  <div className="outbox-send__confirm">
    <p>{message}</p>
    <div className="outbox-send__actions">
      <Button className="btn--primary" loading={loading} onClick={onConfirm}>
        {confirmLabel}
      </Button>
      <Button className="btn--ghost" disabled={loading} onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </div>
)

export default ConfirmStep
