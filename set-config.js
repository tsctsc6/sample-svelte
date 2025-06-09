import { readFileSync, writeFileSync } from 'fs';

const config = JSON.parse(readFileSync('src-tauri/tauri.conf.json'));
config.identifier = "com.tsctsc6.sample-svelte";
writeFileSync('config.json', JSON.stringify(config, null, 2));