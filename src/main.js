const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280, // ✅ Set exact width
    height: 720, // ✅ Set exact height
    useContentSize: true, // ✅ Ensures the inner content is 1280x720
    resizable: false, // ✅ Prevents resizing (optional)
    fullscreenable: false, // ✅ Prevents accidental fullscreen (optional)
    center: true, // ✅ Opens in the center of the screen
    autoHideMenuBar: true, // ✅ Hides the menu bar for a clean look
    backgroundColor: "#000000", // ✅ Ensures no extra white space
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173");
});

app.on("window-all-closed", () => {
  app.quit();
});
