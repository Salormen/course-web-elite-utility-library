import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'course-react-utilities',
        },
        sourcemap: true,
        target: 'es6',
        minify: false,
    },
    plugins: [
        dts({
            outDir: 'dist',
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
