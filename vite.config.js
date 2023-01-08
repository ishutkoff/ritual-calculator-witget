import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: false,
				inlineDynamicImports: true,
				entryFileNames: '[name].js', // currently does not work for the legacy bundle
				assetFileNames: '[name].[ext]', // currently does not work for images
				// entryFileNames: `assets/[name].js`,
				// chunkFileNames: `assets/[name].js`,
				// assetFileNames: `assets/[name].[ext]`,
			},
		},
	},
})
