import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('container') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
