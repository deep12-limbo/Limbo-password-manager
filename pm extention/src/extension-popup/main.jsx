import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.jsx'
import { GoogleProvider } from '@pm/shared/src/context/google-items/GoogleProvider.jsx'
import { VaultItemProvider } from '@pm/shared/src/context/vault-item/VaultItemProvider.jsx'
import { ThemeProvider } from '@pm/shared/src/context/'
import { AuthProvider } from './src/context/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(


  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <GoogleProvider>
          <VaultItemProvider>
            <App />
          </VaultItemProvider>
        </GoogleProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
