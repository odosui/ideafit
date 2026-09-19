import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '../board/App'
import '../styles/board.scss'
import readServerData from '../shared/server'
import showToast from '../shared/toaster'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'))
})

window.addEventListener('load', () => {
  const { flash } = readServerData()
  if (flash?.notice) {
    showToast(flash.notice)
  } else if (flash?.error) {
    showToast(flash.error, 'error')
  }
})
