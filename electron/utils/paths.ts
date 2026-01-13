const path = require('path');
import { app } from 'electron';
import fs from "fs";

export const isDev = !app.isPackaged;

export const getNextAppPath = () => {

  if (isDev) {
    return "http://localhost:3000"; // Dev server URL
  }

  // In production, Electron loads the NEXT export inside its own folder
  const prodPath = path.join(process.resourcesPath, "frontend");
  const indexHtml = path.join(prodPath, "index.html");

  if (fs.existsSync(indexHtml)) {
    return `file://${indexHtml}`;
  }

  console.error("❌ Next.js build not found at:", indexHtml);
  throw new Error("Could not find production build of the Next.js app");
}