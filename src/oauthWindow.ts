import { BrowserWindow, ipcMain } from 'electron';
import { URL } from 'url';

export function setupOAuthHandler(mainWindow: Electron.BrowserWindow, oauthUrl: string, redirectUri: string) {
  ipcMain.handle('oauth-start', async () => {
    return new Promise<string>((resolve, reject) => {
      const authWindow = new BrowserWindow({
        width: 500,
        height: 700,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
        },
        parent: mainWindow,
        modal: true,
        show: true,
      });

      authWindow.loadURL(oauthUrl);

      const filterUrl = (url: string) => {
        return url.startsWith(redirectUri);
      };

      authWindow.webContents.on('will-redirect', (event, url) => {
        if (filterUrl(url)) {
          const parsed = new URL(url);
          const code = parsed.searchParams.get('code');
          if (code) {
            resolve(code);
            authWindow.close();
          } else {
            reject(new Error('No code found in redirect URL'));
            authWindow.close();
          }
        }
      });

      authWindow.on('closed', () => {
        reject(new Error('OAuth window closed by user'));
      });
    });
  });
}
