import { readFileSync, writeFileSync } from 'fs';

const config = JSON.parse(readFileSync('src-tauri/tauri.conf.json'));

// basic
config.identifier = "com.tsctsc6.sample-svelte";
config.build.frontendDist = "../dist";

// windows-msi
config.bundle.targets = ["msi"];
if(config.bundle.windows === undefined)
{
    config.bundle.windows = {};
}
if (config.bundle.windows.wix === undefined)
{
    config.bundle.windows.wix = {};
}
config.bundle.windows.wix.upgradeCode = "833ad97c-91d0-47cb-83b2-2e71181c0585";

writeFileSync('src-tauri/tauri.conf.json', JSON.stringify(config, null, 2));