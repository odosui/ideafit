import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from '../board/App'
import '../styles/board.scss'
import readServerData from '../shared/server'
import showToast from '../shared/toaster'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app')!).render(<App />)
})

window.addEventListener('load', () => {
  const { flash } = readServerData()
  if (flash?.notice) {
    showToast(flash.notice)
  } else if (flash?.error) {
    showToast(flash.error, 'error')
  }
})
