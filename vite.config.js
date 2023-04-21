import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
			plugins: [
				{
					name: 'wrap-in-iife',
					generateBundle(outputOptions, bundle) {
						Object.keys(bundle).forEach(fileName => {
							const file = bundle[fileName]
							if (fileName.slice(-3) === '.js' && 'code' in file) {
								file.code = `(() => {\n${file.code}})()`
							}
						})
					},
				},
			],
		},
	},
})
