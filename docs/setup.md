# Twin-Stick Shooter Setup Guide

## Decision: Using Vite Over Webpack

For this project, we have decided to use **Vite** instead of **Webpack** for the following reasons:

- **Faster Development**: Vite provides **instant updates** with Hot Module Replacement (HMR).
- **Built-in TypeScript Support**: No need for extra loaders or configuration.
- **Faster Build Times**: Optimized for **small, fast-loading games**.
- **Simpler Configuration**: Less setup compared to Webpack.

Vite allows for a **more efficient development workflow** when integrating **Electron, Phaser, and TypeScript**.

---

## Development Environment

We will be using the following versions of **Node.js** and **npm**:

- **Node.js:** v20 LTS (**Currently installed: 20.18.3**)
- **npm:** v10 (**Currently installed: 10.8.2**)

📌 **Note:** While the minor and patch versions may update over time, we will stick to **Node v20 LTS** and **npm v10** as our baseline.

---

## **Project Initialization Steps**

Follow these steps to set up the project:

### **1. Create the Project Directory**
```sh
mkdir twin-stick-shooter && cd twin-stick-shooter
```

### **2. Initialize npm**
```sh
npm init -y
```

### **3. Install Vite, Electron, and Phaser**
```sh
npm install --save-dev vite electron electron-builder electron-packager typescript @types/node
npm install phaser
```

### **4. Configure TypeScript**
Create a `tsconfig.json` file in the root directory:
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "esnext",
    "strict": true,
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

### **5. Set Up Electron Main Process**
Create a `src/main.ts` file:
```ts
import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
  app.quit();
});
```

### **6. Set Up Phaser in Renderer Process**
Create a `src/game.ts` file:
```ts
import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload() {
      this.load.image('logo', 'logo.png');
    },
    create() {
      this.add.image(400, 300, 'logo');
    }
  }
};

new Phaser.Game(config);
```

### **7. Set Up HTML File**
Create `index.html` in the root directory:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Phaser + Electron</title>
</head>
<body>
  <script src="./dist/game.js"></script>
</body>
</html>
```

### **8. Running the Project**
#### **Set Up `npm start` for Easier Launch**
Modify the `scripts` section of `package.json`:
```json
"scripts": {
  "dev": "vite", 
  "electron": "electron .",
  "start": "vite & electron ."
}
```

#### **To Start Development Mode**
Run:
```sh
npm start
```
This will start both **Vite** and **Electron** in parallel.

#### **To Build the Project for Production**
```sh
npm run build
```

---

## **Next Steps**
- **Set up Vite for better Electron integration.**
- **Configure Electron's renderer to properly work with Vite.**
- **Ensure asset handling works correctly with Phaser.**

---

This document will be updated as we refine our setup process.
