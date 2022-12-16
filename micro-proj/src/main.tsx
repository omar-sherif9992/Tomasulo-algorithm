import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Bootstrap is already included in main.scss, do not include it again
import './main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
