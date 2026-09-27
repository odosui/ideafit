import * as React from 'react'
import api from '../../api'
import { describeImport, isImportSummary } from './importResult'

type ImportState =
  | { status: 'idle' | 'importing' }
  | { status: 'done' | 'failed'; message: string }

export const useBoardImport = (pid: string) => {
  const [state, setState] = React.useState<ImportState>({ status: 'idle' })

  const importFile = async (file: File) => {
    setState({ status: 'importing' })
    const result = await api.boards
      .import(pid, await file.text())
      .catch(() => null)

    setState(
      isImportSummary(result)
        ? { status: 'done', message: describeImport(result) }
        : {
            status: 'failed',
            message: `Nothing was imported: ${result?.error ?? 'something went wrong.'}`,
          },
    )
  }

  return { state, importFile }
}
