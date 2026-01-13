// Define telemetry snapshot structure
export type TelemetrySnapshot = {
  cpuUsage: number;
  memoryUsage: number;
  totalMemoryMB: number;
  freeMemoryMB: number;
  timestamp: number;
  networkAdapters?: NetworkAdapter[];
}

export type NetworkAdapter = {
  name: string;
  mac?: string;
  family?: string;
  internal: boolean;
  address?: string;
  deviceVersion?: null; // explicitly unsupported
}