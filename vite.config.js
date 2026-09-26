import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/myProject/' : '/',
  plugins: [
    react(),
    ...(command === 'build' ? [{
      name: 'github-pages-spa-fallback',
      async closeBundle() {
        const outputDir = resolve('dist')
        await copyFile(resolve(outputDir, 'index.html'), resolve(outputDir, '404.html'))
      },
    }] : []),
  ],
}))
