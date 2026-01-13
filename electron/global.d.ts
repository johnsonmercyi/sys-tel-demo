import { PingFn, GetTelemetryFn } from "./api/ipc.types";

declare global {
  interface Window {
    // Extend the Window interface to include Electron IPC APIs
    electron: {
      ping: PingFn, // IPC ping function
      getTelemetry: GetTelemetryFn, // IPC telemetry retrieval function
    };
  }
}

export { };