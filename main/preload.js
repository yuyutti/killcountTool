"use strict";
// electron-src/preload.ts
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs_1 = require("fs");
const path_1 = require("path");
let baseDir = "";
// 初期化
async function init() {
    baseDir = await electron_1.ipcRenderer.invoke("get-base-dir");
}
function getPaths() {
    const dir = baseDir;
    if (!(0, fs_1.existsSync)(dir)) {
        (0, fs_1.mkdirSync)(dir, { recursive: true });
    }
    return {
        storePath: (0, path_1.join)(dir, "store.json"),
        obsPath: (0, path_1.join)(dir, "kill.txt"),
        countPath: (0, path_1.join)(dir, "killcount.txt"),
    };
}
const defaultData = {
    kill: 0,
    rate: 10,
};
function load() {
    const { storePath, obsPath, countPath } = getPaths();
    if (!(0, fs_1.existsSync)(storePath)) {
        (0, fs_1.writeFileSync)(storePath, JSON.stringify(defaultData));
        (0, fs_1.writeFileSync)(obsPath, `残り${defaultData.kill}キル`);
        (0, fs_1.writeFileSync)(countPath, String(defaultData.kill));
        return defaultData;
    }
    try {
        const data = JSON.parse((0, fs_1.readFileSync)(storePath, "utf-8"));
        if (typeof data.rate !== "number") {
            data.rate = 10;
        }
        (0, fs_1.writeFileSync)(obsPath, `残り${data.kill}キル`);
        (0, fs_1.writeFileSync)(countPath, String(data.kill));
        return data;
    }
    catch (_a) {
        return defaultData;
    }
}
function save(data) {
    const { storePath, obsPath, countPath } = getPaths();
    (0, fs_1.writeFileSync)(storePath, JSON.stringify(data));
    (0, fs_1.writeFileSync)(obsPath, `残り${data.kill}キル`);
    (0, fs_1.writeFileSync)(countPath, String(data.kill));
}
// init実行
init();
electron_1.contextBridge.exposeInMainWorld("api", {
    getKill: () => load().kill,
    getRate: () => load().rate,
    setRate: (v) => {
        const data = load();
        data.rate = v;
        save(data);
    },
    setKill: (v) => {
        const data = load();
        data.kill = v;
        save(data);
    },
    addKill: (v) => {
        const data = load();
        data.kill += v;
        save(data);
    },
    subKill: (v) => {
        const data = load();
        data.kill = Math.max(0, data.kill - v);
        save(data);
    },
});
