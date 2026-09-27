import * as React from 'react'
import Button from '../../../shared/Button'
import { useBoardImport } from './useBoardImport'

interface Props {
  pid: string
}

const ImportButton: React.FC<Props> = ({ pid }) => {
  const { state, importFile } = useBoardImport(pid)
  const input = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) importFile(file)
  }

  return (
    <>
      <input
        ref={input}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={handleChange}
        aria-label="Ideafit JSON file"
      />
      <Button
        onClick={() => input.current?.click()}
        loading={state.status === 'importing'}
      >
        <i className="fas fa-file-upload" aria-hidden="true" />
        Import JSON
      </Button>
      {state.status === 'done' && <span>{state.message}</span>}
      {state.status === 'failed' && (
        <span className="field__error">{state.message}</span>
      )}
    </>
  )
}

export default ImportButton
