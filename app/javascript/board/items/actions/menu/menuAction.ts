import * as React from 'react'

export interface MenuAction {
  label: string
  icon: React.ReactNode
  danger?: boolean
  onSelect: () => void
}
