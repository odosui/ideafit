import * as React from 'react'
import EmbedEmailsForm from './EmbedEmailsForm'
import { useEmbedEmails } from './useEmbedEmails'

interface Props {
  pid: string
}

const EmbedEmailsCard: React.FC<Props> = ({ pid }) => {
  const settings = useEmbedEmails(pid)

  return (
    <div className="share-card">
      <div>
        <h3>Email your signed-in users</h3>
        <p>
          Your users follow items too, but Ideafit can't confirm the email in
          their token, so it doesn't email them unless you say so. Turn this on
          only if your site sends verified emails. Each user is then asked once
          whether they want emails, and nothing is sent until they say yes.
        </p>
      </div>
      {settings && <EmbedEmailsForm pid={pid} settings={settings} />}
    </div>
  )
}

export default EmbedEmailsCard
