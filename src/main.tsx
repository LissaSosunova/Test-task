import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './shared/AuthContext/AuthContext'
import { Toaster } from 'react-hot-toast'
import { DictionaryProvider } from './providers/DictionaryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DictionaryProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontSize: '14px',
                border: '1px solid #ffffffff',
                padding: '16px',
                color: '#ffffffff',
                background: '#000000ff'
              },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </DictionaryProvider>
  </StrictMode>,
)
