# google-photos-screensaver

## Developer Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Install dependencies
```bash
npm install
```

### Build the project
#### 1. Build the renderer (React/TypeScript)
```bash
npx webpack --config webpack.renderer.config.js
```
#### 2. Build the main process (Electron/TypeScript)
```bash
npx tsc
```

### Run the app
```bash
npm start
```
or
```bash
npx electron .
```

### Debugging
- Use `console.log` in both main and renderer processes for output.
- To debug the renderer, open DevTools from the Electron window (View > Toggle Developer Tools).
- For main process debugging, run Electron with the `--inspect` flag:
  ```bash
  npx electron --inspect .
  ```
- You can set breakpoints in VS Code if you use the "Attach to Process" debug configuration.

### Common Issues
- If you see `ERR_FILE_NOT_FOUND`, ensure the main process loads `dist/index.html`.
- If you see sandbox errors on Linux, run:
  ```bash
  sudo chown root node_modules/electron/dist/chrome-sandbox
  sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
  ```