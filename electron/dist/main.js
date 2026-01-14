"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_2 = require("electron");
const paths_1 = require("./utils/paths");
const telemetry_1 = require("./api/telemetry");
const path = require("path");
let mainWindow;
function createMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 800,
        backgroundColor: "#ffffff",
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
        },
    });
    const startURL = (0, paths_1.getNextAppPath)();
    mainWindow.loadURL(startURL);
    // if (isDev) {
    //   mainWindow.webContents.openDevTools();
    // }
}
electron_2.app.whenReady().then(() => {
    createMainWindow();
    // Start background telemetry collection loop (every 30 seconds)
    setInterval(() => {
        const snapshot = (0, telemetry_1.collectTelemetry)();
        console.log("Telemetry Snapshot:", snapshot); // Log snapshot for debugging
    }, 30000);
    electron_2.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createMainWindow();
    });
});
electron_2.app.on("window-all-closed", () => {
    mainWindow = null;
    if (process.platform !== "darwin")
        electron_2.app.quit();
});
// IPC ping
electron_2.ipcMain.handle("ping", async (_, message) => {
    return `Electron received your ping message: ${message}`;
});
// IPC telemetry retrieval
electron_2.ipcMain.handle("telemetry:get", async () => {
    return (0, telemetry_1.getLatestTelemetrySnapshot)();
});
