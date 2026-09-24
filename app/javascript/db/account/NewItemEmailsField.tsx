import * as React from 'react'
import { NewItemEmails } from '../../shared/currentUser'

const OPTIONS: { value: NewItemEmails; label: string }[] = [
  { value: 'instant', label: 'Right away' },
  { value: 'daily', label: 'Daily digest' },
  { value: 'off', label: 'Off' },
]

interface Props {
  value: NewItemEmails
  disabled: boolean
  onChange: (value: NewItemEmails) => void
}

const NewItemEmailsField: React.FC<Props> = ({ value, disabled, onChange }) => (
  <fieldset className="field" disabled={disabled}>
    <legend>New items on your boards</legend>
    {OPTIONS.map((option) => (
      <label key={option.value} className="field--check">
        <input
          type="radio"
          name="new_item_emails"
          checked={value === option.value}
          onChange={() => onChange(option.value)}
        />
        {option.label}
      </label>
    ))}
  </fieldset>
)

export default NewItemEmailsField
