import * as React from 'react'
import { createRoot } from 'react-dom/client'

import App from '../db/App'
import '../styles/db.scss'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('div'))
  createRoot(el).render(<App />)
})
