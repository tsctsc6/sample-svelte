import { readFileSync, writeFileSync } from 'fs';

const config = JSON.parse(readFileSync('src-tauri/tauri.conf.json'));

config.identifier = "com.tsctsc6.sample-svelte";
config.build.frontendDist = "../dist";

writeFileSync('src-tauri/tauri.conf.json', JSON.stringify(config, null, 2));