import { execSync } from 'node:child_process'
import { readFile, unlink } from 'node:fs/promises'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { version } from './package.json'

export default defineConfig(({ mode }) => {
  const CWD = process.cwd()

  return {
    server: {
      host: '0.0.0.0',
      port: 3000
    },

    root: `src`,
    envDir: CWD,
    envPrefix: 'PUBLIC_',
    publicDir: `${CWD}/public`,

    resolve: {
      alias: {
        assets: `${CWD}/src/assets`,
        components: `${CWD}/src/components`,
        services: `${CWD}/src/services`,
        utils: `${CWD}/src/utils`
      }
    },

    build: {
      outDir: '../out',
      emptyOutDir: true,
      chunkSizeWarningLimit: 700,

      rollupOptions: {
        output: {
          manualChunks(id) {
            // if (id.includes('src/assets/shaders')) console.info(id)

            const chunks = [
              ['shaders', 'src/assets/shaders'],
              ['i18n', 'src/assets/i18n'],
              ['nextia', 'node_modules/nextia/'],
              ['react', 'node_modules/react/'],
              ['react', 'node_modules/react-dom/'],
              ['three', 'node_modules/three/build/'],
              ['three-examples', 'node_modules/three/examples/']
            ]

            return chunks.find(([, path]) => id.includes(path))?.[0]
          }
        }
      }
    },

    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html',
        transformIndexHtml(html) {
          let gitHash = 'unknown'

          try {
            gitHash = execSync('git rev-parse --short HEAD').toString().trim()
          } catch (e) {
            console.error(e)
          }

          return html.replaceAll(
            '%VERSION%',
            `version=${version}, env=${mode}, date=${new Date().toISOString()}, commit=${gitHash}`
          )
        }
      },
      {
        name: 'glsl',
        async load(id) {
          if (!id.endsWith('.glsl')) return

          const raw = await readFile(id, 'utf8')
          const code = raw
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .replace(/\s+/g, ' ')
            .replace(/\s*([=+\-*/{}();,<>])\s*/g, '$1')
            .trim()

          return `export default ${JSON.stringify(code)};`
        }
      },
      {
        name: 'files-to-prod',
        apply: 'build',
        async closeBundle() {
          if (mode === 'prod') return

          await Promise.all(
            ['out/robots.txt', 'out/sitemap.xml'].map((file) =>
              unlink(file).catch(() => {})
            )
          )
        }
      }
    ]
  }
})
