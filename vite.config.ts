import { defineConfig } from "vite"
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
	server: {
		host: true,
		port: 3000,
	},
	define: {
		__APP_VERSION__: JSON.stringify(version),
		__LIB_VERSION__: JSON.stringify(dependencies["libwhatsthis"]),
	},
})
