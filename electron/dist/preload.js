"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ipc_renderer_1 = require("./api/ipc.renderer");
console.log("preload.ts loaded"); // Debug log
// Expose APIs to the renderer process
electron_1.contextBridge.exposeInMainWorld('electron', {
    ping: ipc_renderer_1.ping, // Expose ping function
    getTelemetry: // Expose ping function
    ipc_renderer_1.getTelemetry, // Expose telemetry function
});
