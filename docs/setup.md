# Development Setup Guide

## 📌 Prerequisites

Make sure you have the following installed:

- **Node.js 20 LTS** → [Download](https://nodejs.org/en/download)
- **npm 10+** (comes with Node.js)
- **Git** ([Install Git](https://git-scm.com/downloads))

Check your versions:

```sh
node -v  # Should return 20.x.x
npm -v   # Should return 10.x.x
git --version  # Should return a valid version
```

## run the project

```sh
git clone git@github.com:sean-d/dude.git
cd dude
npm install
npm start
```

✔ This will: 1. Start Vite (http://localhost:5173) 2. Wait for Vite to be ready 3. Launch Electron 4. Open the game window

### If vite complains at your face about ports in use

> Port 5173 is in use, trying another one...

just get a new port for vite and then run electron

```sh
npm run dev
npm run electron
```

### if you get vite not found/electron shows a blank screen

```sh
rm -rf node_modules package-lock.json
npm install
npm start
```

### if the app keeps reloading

1. Check which files are changing unexpectedly:

```sh
ls -lt --full-time src/ index.html
```

2. Add watch: ignored in vite.config.js:

```sh
export default {
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/package-lock.json']
    }
  }
};
```
