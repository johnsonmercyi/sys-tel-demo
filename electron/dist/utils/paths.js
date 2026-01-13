"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextAppPath = exports.isDev = void 0;
const path = require('path');
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
exports.isDev = !electron_1.app.isPackaged;
const getNextAppPath = () => {
    if (exports.isDev) {
        return "http://localhost:3000"; // Dev server URL
    }
    // In production, Electron loads the NEXT export inside its own folder
    const prodPath = path.join(process.resourcesPath, "frontend");
    const indexHtml = path.join(prodPath, "index.html");
    if (fs_1.default.existsSync(indexHtml)) {
        return `file://${indexHtml}`;
    }
    console.error("❌ Next.js build not found at:", indexHtml);
    throw new Error("Could not find production build of the Next.js app");
};
exports.getNextAppPath = getNextAppPath;
