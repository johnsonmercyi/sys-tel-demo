"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDialogAPI = exports.createFileAPI = void 0;
const electron_1 = require("electron");
const exampleRendererAPI = {
    exampleMethod: async (message) => electron_1.ipcRenderer.invoke("example:ping", message),
};
exports.default = exampleRendererAPI;
const createFileAPI = async (fileName, content) => electron_1.ipcRenderer.invoke("file:create", fileName, content);
exports.createFileAPI = createFileAPI;
const openDialogAPI = async () => electron_1.ipcRenderer.invoke("dialog:openFile");
exports.openDialogAPI = openDialogAPI;
