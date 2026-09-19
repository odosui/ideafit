import * as React from 'react'
import { ColorScheme } from '../types'
import { COLOR_SCHEMES } from './colorSchemes'

interface Props {
  value: ColorScheme
  onChange: (scheme: ColorScheme) => void
}

// Each swatch sets data-color-scheme, so it shows the same colors as the board
const ColorSchemePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="scheme-picker" role="radiogroup" aria-label="Color scheme">
    {COLOR_SCHEMES.map(([scheme, label]) => (
      <label
        key={scheme}
        data-color-scheme={scheme}
        className={`scheme-picker__option${value === scheme ? ' scheme-picker__option--selected' : ''}`}
      >
        <input
          type="radio"
          name="color_scheme"
          value={scheme}
          checked={value === scheme}
          onChange={() => onChange(scheme)}
        />
        <span className="scheme-picker__swatch">
          <span className="scheme-picker__accent" />
        </span>
        {label}
      </label>
    ))}
  </div>
)

export default ColorSchemePicker
