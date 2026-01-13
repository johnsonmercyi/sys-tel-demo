"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectTelemetry = collectTelemetry;
exports.getLatestTelemetrySnapshot = getLatestTelemetrySnapshot;
const os_1 = __importDefault(require("os"));
// Define telemetry snapshot cache
let latestSnapshot = null;
// Function to calculate CPU usage
function calculateCpuUsage() {
    const cpus = os_1.default.cpus(); // Get CPU info
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
function collectTelemetry() {
    const totalMem = os_1.default.totalmem(); // Total memory
    const freeMem = os_1.default.freemem(); // Free memory
    const snapshot = {
        cpuUsage: calculateCpuUsage(),
        memoryUsage: Math.round(((totalMem - freeMem) / totalMem) * 100), // Memory usage percentage
        totalMemoryMB: Math.round(totalMem / (1024 * 1024)), // Total memory in MB
        freeMemoryMB: Math.round(freeMem / (1024 * 1024)), // Free memory in MB
        timestamp: Date.now(), // Current timestamp
    };
    latestSnapshot = snapshot; // Update latest snapshot
    return snapshot;
}
// Get latest telemetry snapshot
function getLatestTelemetrySnapshot() {
    if (!latestSnapshot) {
        // Lazy initialization in case UI requests telemetry
        // before the background loop has run
        return collectTelemetry(); // Collect if not available
    }
    return latestSnapshot; // Return cached snapshot
}
