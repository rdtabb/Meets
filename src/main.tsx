import React from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/index.scss'

import { ErrorBoundary } from '@components/error-boundary/error-boundary'
import { CreatePost } from '@pages/create-post/create-post'

import { App } from './App'
import { ROUTES } from './constants'

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<App />} />
                        <Route path={ROUTES.CREATE_POST} element={<CreatePost />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ErrorBoundary>
    </React.StrictMode>
)
