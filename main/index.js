"use strict";
// electron-src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const fs_1 = require("fs");
let baseDir;
electron_1.app.whenReady().then(() => {
    // Documents配下に作る
    baseDir = (0, path_1.join)(electron_1.app.getPath("documents"), "killCountTool");
    if (!(0, fs_1.existsSync)(baseDir)) {
        (0, fs_1.mkdirSync)(baseDir, { recursive: true });
    }
    const win = new electron_1.BrowserWindow({
        width: 400,
        height: 500,
        resizable: false,
        minWidth: 400,
        minHeight: 500,
        maxWidth: 400,
        maxHeight: 500,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, "preload.js"),
            contextIsolation: true,
            sandbox: false,
        },
    });
    win.loadFile((0, path_1.join)(__dirname, "../renderer/index.html"));
    // メニュー作成
    const menu = electron_1.Menu.buildFromTemplate([
        {
            label: "ファイル",
            submenu: [
                {
                    label: "保存先を開く",
                    click: () => {
                        electron_1.shell.openPath(baseDir);
                    }
                },
                {
                    label: "保存先のパスをコピー",
                    click: () => {
                        electron_1.clipboard.writeText(baseDir);
                    }
                }
            ]
        }
    ]);
    electron_1.Menu.setApplicationMenu(menu);
});
// preloadにパス渡す
electron_1.ipcMain.handle("get-base-dir", () => baseDir);
