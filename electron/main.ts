import { BrowserWindow, dialog } from "electron";
import { app, ipcMain } from "electron";
import { isDev, getNextAppPath } from "./utils/paths";
import fs from "fs/promises";
import fsSync from "fs";
import { collectTelemetry, getLatestTelemetrySnapshot } from "./api/telemetry";

const path = require("path");

let mainWindow: BrowserWindow | null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  const startURL = getNextAppPath();
  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createMainWindow();

  // Start background telemetry collection loop (every 30 seconds)
  setInterval(() => {
    const snapshot = collectTelemetry();
    console.log("Telemetry Snapshot:", snapshot); // Log snapshot for debugging
  }, 30_000);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  mainWindow = null;
  if (process.platform !== "darwin") app.quit();
});

// IPC ping
ipcMain.handle("ping", async (_, message: string): Promise<string> => {
  return `Electron received your ping message: ${message}`;
});

// IPC telemetry retrieval
ipcMain.handle("telemetry:get", async () => {
  return getLatestTelemetrySnapshot();
});
