import * as React from 'react'
import BugIcon from './icons/BugIcon'
import IdeaIcon from './icons/IdeaIcon'
import QuestionIcon from './icons/QuestionIcon'
import { ItemKind } from './itemKind'

const ICONS: Record<ItemKind, React.FC> = {
  idea: IdeaIcon,
  bug: BugIcon,
  question: QuestionIcon,
}

const KindIcon: React.FC<{ kind: ItemKind }> = ({ kind }) => {
  const Icon = ICONS[kind]
  return <Icon />
}

export default KindIcon
