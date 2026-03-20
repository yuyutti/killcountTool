// electron-src/index.ts

import { app, BrowserWindow, Menu, ipcMain, shell, clipboard } from "electron";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

let baseDir: string;

app.whenReady().then(() => {

    // Documents配下に作る
    baseDir = join(app.getPath("documents"), "killCountTool");

    if (!existsSync(baseDir)) {
        mkdirSync(baseDir, { recursive: true });
    }

    const win = new BrowserWindow({
        width: 400,
        height: 500,
        resizable: false,
        minWidth: 400,
        minHeight: 500,
        maxWidth: 400,
        maxHeight: 500,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            contextIsolation: true,
            sandbox: false,
        },
    });

    win.loadFile(join(__dirname, "../renderer/index.html"));

    // メニュー作成
    const menu = Menu.buildFromTemplate([
        {
            label: "ファイル",
            submenu: [
                {
                    label: "保存先を開く",
                    click: () => {
                        shell.openPath(baseDir);
                    }
                },
                {
                    label: "保存先のパスをコピー",
                    click: () => {
                        clipboard.writeText(baseDir);
                    }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);
});

// preloadにパス渡す
ipcMain.handle("get-base-dir", () => baseDir);