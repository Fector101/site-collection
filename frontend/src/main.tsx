// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import { UserProvider } from './assets/js/UserContext'; // Import the UserProvider

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>,
)
