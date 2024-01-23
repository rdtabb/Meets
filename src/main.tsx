import React from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './styles/index.scss'

import { ErrorBoundary } from '@components/error-boundary/error-boundary'
import { AuthStateProvider } from '@context/auth-state'
import { store } from '@store/store'

import { App } from './App'

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <AuthStateProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </AuthStateProvider>
                </Provider>
            </QueryClientProvider>
        </ErrorBoundary>
    </React.StrictMode>
)
