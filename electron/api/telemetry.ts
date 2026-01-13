import os from 'os';
import { NetworkAdapter, TelemetrySnapshot } from './telemetry.type';

// Define telemetry snapshot cache
let latestSnapshot: TelemetrySnapshot | null = null;

// Function to calculate CPU usage
function calculateCpuUsage(): number {
  const cpus = os.cpus(); // Get CPU info
  let idle = 0;
  let total = 0;

  // Aggregate CPU times
  for (const cpu of cpus) {
    idle += cpu.times.idle; // Idle time
    total += Object.values(cpu.times).reduce((acc, val) => acc + val, 0); // Total time
  }

  const usage = 100 - Math.floor((idle / total) * 100); // Calculate usage percentage
  return usage;
}

// Function to capture telemetry
export function collectTelemetry(): TelemetrySnapshot {
  const totalMem = os.totalmem(); // Total memory
  const freeMem = os.freemem(); // Free memory

  const snapshot: TelemetrySnapshot = {
    cpuUsage: calculateCpuUsage(),
    memoryUsage: Math.round(((totalMem - freeMem) / totalMem) * 100), // Memory usage percentage
    totalMemoryMB: Math.round(totalMem / (1024 * 1024)), // Total memory in MB
    freeMemoryMB: Math.round(freeMem / (1024 * 1024)), // Free memory in MB
    timestamp: Date.now(), // Current timestamp
    networkAdapters: collectNetworkAdapters(), // Collect network adapters
  }

  latestSnapshot = snapshot; // Update latest snapshot
  return snapshot;
}

/**
 * Collect network adapter information.
 * 
 * ### Network Adapter Telemetry Limitations

 * - Adapter driver versions are not consistently exposed across operating systems.
 * - Node.js does not provide a cross-platform API for driver metadata.
 * - Windows requires registry access (not used).
 * - macOS requires private IOKit bindings (not used).
 * - Linux driver data is distro-specific and unportable.

 * This application intentionally uses Node.js best-effort APIs to ensure
 * cross-platform compatibility and graceful degradation.

 * @returns List of network adapters with limited metadata.
 */
function collectNetworkAdapters(): NetworkAdapter[] {
  const interfaces = os.networkInterfaces();
  const adapters: NetworkAdapter[] = [];

  for (const [name, infos] of Object.entries(interfaces)) {
    if (infos) {
      for (const info of infos) {
        adapters.push({
          name,
          mac: info.mac,
          family: info.family,
          internal: info.internal,
          address: info.address,
          deviceVersion: null, // intentionally unavailable
        });
      }
    }
  }

  return adapters;
}

// Get latest telemetry snapshot
export function getLatestTelemetrySnapshot(): TelemetrySnapshot {
  if (!latestSnapshot) {
    // Lazy initialization in case UI requests telemetry
    // before the background loop has run
    return collectTelemetry(); // Collect if not available
  }
  return latestSnapshot; // Return cached snapshot
}