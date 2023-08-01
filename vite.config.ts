import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 3000
	},
	define: {
		'process.env': {
			REACT_APP_VERSION: JSON.stringify(require('./package.json').version),
		},
	},
})
