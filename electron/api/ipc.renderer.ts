import { ipcRenderer } from "electron";
import { GetTelemetryFn, PingFn } from "./ipc.types";

// Ping function
export const ping: PingFn = async (message: string) => ipcRenderer.invoke("ping", message);

// Telemetry retrieval function
export const getTelemetry: GetTelemetryFn = async () => ipcRenderer.invoke("telemetry:get");