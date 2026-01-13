import { TelemetrySnapshot } from "./telemetry.type";

// Export callable function types directly
export type PingFn = (message: string) => Promise<string>;

// Telemetry function type
export type GetTelemetryFn = () => Promise<TelemetrySnapshot>;