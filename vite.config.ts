import path from 'path'

import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
    plugins: [react(), eslint(), TanStackRouterVite()],
    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, './src/pages'),
            '@components': path.resolve(__dirname, './src/components'),
            '@features': path.resolve(__dirname, './src/features'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@methods': path.resolve(__dirname, './src/methods'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@context': path.resolve(__dirname, './src/context'),
            '@store': path.resolve(__dirname, './src/store'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@ui': path.resolve(__dirname, './src/components/ui')
        }
    }
})
