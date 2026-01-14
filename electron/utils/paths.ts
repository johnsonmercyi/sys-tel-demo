import path from "path";
import fs from "fs";
import { app } from "electron";

export const isDev = !app.isPackaged;

/**
 * Resolves the correct URL for the frontend
 * - Dev: Next.js dev server
 * - Prod: Static export bundled inside the Electron app
 */
export const getNextAppPath = () => {
  // Development: point to Next dev server
  if (isDev) {
    return "http://localhost:3000";
  }

  /**
   * Production:
   * Electron-builder packages files into:
   *   process.resourcesPath/
   *     └── app.asar
   *
   * We bundle the Next.js export as:
   *   resources/frontend/index.html
   */
  const frontendPath = path.join(
    process.resourcesPath,
    "frontend",
    "index.html"
  );

  if (!fs.existsSync(frontendPath)) {
    console.error("Frontend missing at:", frontendPath);
    console.error("Files in resources:", fs.readdirSync(process.resourcesPath));
  } else {
    return `file://${frontendPath}`;
  }

  // Defensive failure — should never happen in a valid build
  console.error("❌ Next.js production build not found at:", frontendPath);
  throw new Error("Could not locate bundled Next.js frontend");
};
