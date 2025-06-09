import {defineConfig, loadEnv} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
// @ts-ignore
export default defineConfig(({mode}) => {
  console.log('TAURI_ENV_PLATFORM:', process.env.TAURI_ENV_PLATFORM);
  const envFile = loadEnv(mode, process.cwd(), '');
  let host = 'localhost';
  if (process.env.TAURI_ENV_PLATFORM === undefined ||
      process.env.TAURI_ENV_PLATFORM === 'windows' ||
      process.env.TAURI_ENV_PLATFORM === 'linux' ||
      process.env.TAURI_ENV_PLATFORM === 'macOS') {}
  else{
    host = envFile.VITE_Mobile_HOST;
  }
  return {
    plugins: [svelte()],
    server: {
      host: host,
      port: envFile.VITE_PORT,
      strictPort: true
    }
  };
});
