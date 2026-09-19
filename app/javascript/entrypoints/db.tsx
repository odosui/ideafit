import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from '../db/App'
import '../styles/db.scss'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('div'))
  ReactDOM.render(<App />, el)
})
