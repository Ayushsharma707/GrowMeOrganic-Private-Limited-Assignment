import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css';              // Core CSS
import 'primeicons/primeicons.css';                           // Icons CSS


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
