import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MyApp from './MyApp.jsx'

console.log('MAIN.JSX ACTIVE →', new Date().toISOString())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
)
