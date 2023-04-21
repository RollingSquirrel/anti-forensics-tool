const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs/promises");

let normPath = ""
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.on("originalFile", async (event, arg) => {
    normPath = path.normalize(arg);

    let textValue, creationDate, lastChanged, lastUsed;

    try {
      textValue = await fs.readFile(normPath, "utf8");
      const stats = await fs.stat(normPath);
      creationDate = stats.birthtime;
      lastChanged = stats.mtime;
      lastUsed = stats.atime;
    } catch (err) {
      console.error(err);
      event.reply("originalFileReply", { error: err.message });
      return;
    }

    event.reply("originalFileReply", {
      textValue,
      creationDate,
      lastChanged,
      lastUsed,
    });
  });
};

ipcMain.on("modifiedFiles" , async(event, arg) => {
  console.log(arg)
  try {
    if (arg.textValue) {
      await fs.writeFile(normPath, arg.textValue, 'utf8', (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Successfully updated ${filePath} with ${newText}`);
      });
    }
  } catch (err) {
    console.error(err)
    return
  }
  
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
