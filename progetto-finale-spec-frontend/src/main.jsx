import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ComparatorProvider } from './context/ComparatorContext'
import { FavoritesProvider } from './context/FavoritesContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <ComparatorProvider>
          <App />
        </ComparatorProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
