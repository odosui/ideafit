import * as React from 'react'
import { Outbox } from '../query/outbox'
import { deliverOutbox } from './deliverOutbox'
import OutboxSummary from './OutboxSummary'
import { sendCopy } from './sendCopy'
import { SendStep } from './sendStep'
import SendSteps from './SendSteps'

interface Props {
  pid: string
  outbox: Outbox
  onSettled: () => void
}

const SendPanel: React.FC<Props> = ({ pid, outbox, onSettled }) => {
  const [step, setStep] = React.useState<SendStep>('idle')
  const [sending, setSending] = React.useState(false)

  const send = async () => {
    setSending(true)
    await deliverOutbox(pid, outbox.fingerprint)
    setSending(false)
    setStep('idle')
    onSettled()
  }

  return (
    <section className="outbox-send">
      <OutboxSummary outbox={outbox} />
      <SendSteps
        step={step}
        copy={sendCopy(outbox)}
        sending={sending}
        onStep={setStep}
        onSend={send}
      />
    </section>
  )
}

export default SendPanel
