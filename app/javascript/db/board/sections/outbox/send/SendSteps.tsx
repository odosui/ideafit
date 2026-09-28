import * as React from 'react'
import Button from '../../../../../shared/Button'
import ConfirmStep from './ConfirmStep'
import { SendCopy } from './sendCopy'
import { SendStep } from './sendStep'

interface Props {
  step: SendStep
  copy: SendCopy
  sending: boolean
  onStep: (step: SendStep) => void
  onSend: () => void
}

const SendSteps: React.FC<Props> = ({
  step,
  copy,
  sending,
  onStep,
  onSend,
}) => {
  const cancel = () => onStep('idle')

  if (step === 'confirm') {
    return (
      <ConfirmStep
        message={copy.question}
        confirmLabel="Yes, continue"
        onConfirm={() => onStep('final')}
        onCancel={cancel}
      />
    )
  }
  if (step === 'final') {
    return (
      <ConfirmStep
        message={copy.warning}
        confirmLabel={copy.finish}
        loading={sending}
        onConfirm={onSend}
        onCancel={cancel}
      />
    )
  }
  return (
    <div className="outbox-send__actions">
      <Button className="btn--primary" onClick={() => onStep('confirm')}>
        <i className="fas fa-paper-plane" aria-hidden="true" />
        {copy.start}
      </Button>
    </div>
  )
}

export default SendSteps
