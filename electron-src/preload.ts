// electron-src/preload.ts

import { contextBridge, ipcRenderer } from "electron";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

let baseDir = "";

// 初期化
async function init() {
    baseDir = await ipcRenderer.invoke("get-base-dir");
}

function getPaths() {
    const dir = baseDir;

    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    return {
        storePath: join(dir, "store.json"),
        obsPath: join(dir, "kill.txt"),
    };
}

type Store = {
    kill: number;
    rate: number;
};

const defaultData: Store = {
    kill: 0,
    rate: 10,
};

function load(): Store {
    const { storePath, obsPath } = getPaths();

    if (!existsSync(storePath)) {
        writeFileSync(storePath, JSON.stringify(defaultData));
        writeFileSync(obsPath, String(defaultData.kill));
        return defaultData;
    }

    try {
        const data = JSON.parse(readFileSync(storePath, "utf-8"));

        if (typeof data.rate !== "number") {
            data.rate = 10;
        }

        writeFileSync(obsPath, String(data.kill));
        return data;
    } catch {
        return defaultData;
    }
}

function save(data: Store) {
    const { storePath, obsPath } = getPaths();

    writeFileSync(storePath, JSON.stringify(data));
    writeFileSync(obsPath, String(data.kill));
}

// init実行
init();

contextBridge.exposeInMainWorld("api", {
    getKill: () => load().kill,
    getRate: () => load().rate,

    setRate: (v: number) => {
        const data = load();
        data.rate = v;
        save(data);
    },

    setKill: (v: number) => {
        const data = load();
        data.kill = v;
        save(data);
    },

    addKill: (v: number) => {
        const data = load();
        data.kill += v;
        save(data);
    },

    subKill: (v: number) => {
        const data = load();
        data.kill = Math.max(0, data.kill - v);
        save(data);
    },
});