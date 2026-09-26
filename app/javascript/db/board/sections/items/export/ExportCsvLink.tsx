import * as React from 'react'
import { ItemQuery } from '../query/itemQuery'
import { itemsCsvPath } from './itemsCsvPath'

interface Props {
  pid: string
  query: ItemQuery
  onDone: () => void
}

const ExportCsvLink: React.FC<Props> = ({ pid, query, onDone }) => (
  <a
    className="toolbar-menu__action"
    role="menuitem"
    href={itemsCsvPath(pid, query)}
    download
    onClick={onDone}
  >
    <i className="fas fa-file-download" aria-hidden="true" />
    Export CSV
  </a>
)

export default ExportCsvLink
