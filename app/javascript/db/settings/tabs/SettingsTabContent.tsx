import * as React from 'react'
import { Board } from '../../types'
import DeleteBoardSection from '../danger/DeleteBoardSection'
import GeneralSettingsForm from '../general/GeneralSettingsForm'
import TransferSection from '../transfer/TransferSection'
import { SettingsTabKey } from './settingsTabs'

interface Props {
  board: Board
  tab: SettingsTabKey
}

const SettingsTabContent: React.FC<Props> = ({ board, tab }) => {
  if (tab === 'import') return <TransferSection board={board} />
  if (tab === 'danger') return <DeleteBoardSection board={board} />
  return <GeneralSettingsForm board={board} />
}

export default SettingsTabContent
