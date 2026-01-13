import { contextBridge } from "electron";
import { getTelemetry, ping } from "./api/ipc.renderer";

console.log("preload.ts loaded"); // Debug log

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  ping, // Expose ping function
  getTelemetry, // Expose telemetry function
});