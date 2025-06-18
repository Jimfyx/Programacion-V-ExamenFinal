import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContactForm from "./components/ContactForm.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactForm />
  </StrictMode>,
)
