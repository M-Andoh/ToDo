import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; 

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/ts/app.tsx', // ts/app.tsxに変更 ※tsディレクトリは後ほど作成する
                'resources/js/app.js'], 
            refresh: true,
        }),
        react(),
    ],
});