import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

/*
i temporarily disable strictmode to check real behaviour of my app
<StrictMode>
    
</StrictMode>,
*/
createRoot(document.getElementById('root')!).render(
  
  <App />

)
