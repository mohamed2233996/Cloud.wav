import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(
  {
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
      cors: true,
    },
    plugins: [
      react(),
      tailwindcss(
        {
          purge: {
            content: ['./src/**/*.{js,jsx}'],
          },
        }
      ),
    ],
  }
)
