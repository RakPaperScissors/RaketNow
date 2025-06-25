import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Footer from './components/Footer.jsx'
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <App />
    <Footer />
    </>

  </StrictMode>,
)
