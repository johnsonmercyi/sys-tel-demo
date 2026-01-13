"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTelemetry = exports.ping = void 0;
const electron_1 = require("electron");
// Ping function
const ping = async (message) => electron_1.ipcRenderer.invoke("ping", message);
exports.ping = ping;
// Telemetry retrieval function
const getTelemetry = async () => electron_1.ipcRenderer.invoke("telemetry:get");
exports.getTelemetry = getTelemetry;
