import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				app: './main.html', // default
			},
		},
	},
	server: {
		open: '/main.html',
	},
	plugins: [react()],
});
