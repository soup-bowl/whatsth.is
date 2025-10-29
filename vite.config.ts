import { defineConfig } from "vite"
import path from "path"
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react-swc"
import { version, dependencies } from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
			manifest: {
				short_name: "whatsth.is",
				name: "What's this?",
				icons: [
					{
						src: "favicon.ico",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "logo-mask-192.png",
						type: "image/png",
						sizes: "192x192",
					},
					{
						src: "logo-mask-512.png",
						type: "image/png",
						sizes: "512x512",
					},
				],
				start_url: ".",
				display: "standalone",
				theme_color: "#000000",
				background_color: "#ffffff",
			},
		}),
	],
	resolve: {
		alias: [
			// crypto-es uses internal subpath imports that aren't exposed via package.json "exports".
			// Map the subpath specifiers to the actual files on disk so Vite/esbuild can resolve them.
			{ find: 'crypto-es/lib/aes', replacement: path.resolve(process.cwd(), 'node_modules', 'crypto-es', 'dist', 'aes.mjs') },
			{ find: 'crypto-es/lib/tripledes', replacement: path.resolve(process.cwd(), 'node_modules', 'crypto-es', 'dist', 'tripledes.mjs') },
		],
	},
	server: {
		host: true,
		port: 3000,
	},
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
})
