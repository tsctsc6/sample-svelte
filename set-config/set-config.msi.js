import { readFileSync, writeFileSync } from 'fs';

const config = JSON.parse(readFileSync('src-tauri/tauri.conf.json'));

config.bundle.targets = ["msi"];
config.app.windows.wix.upgradeCode = "833ad97c-91d0-47cb-83b2-2e71181c0584";

writeFileSync('src-tauri/tauri.conf.json', JSON.stringify(config, null, 2));