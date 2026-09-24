import * as React from 'react'

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
}

const EmailUpdatesField: React.FC<Props> = ({ checked, onChange }) => (
  <label className="field field--check">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span>
      Email updates
      <span className="field__hint">
        Status changes on items you created, voted for, or follow
      </span>
    </span>
  </label>
)

export default EmailUpdatesField
