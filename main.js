// Басовое космическое сыроварение — настольная обёртка.
// Прозрачное окно без рамки: на рабочем столе видна только колба.
const { app, BrowserWindow, ipcMain, session, screen } = require('electron');
const path = require('path');

let win;
function createWindow() {
  const { workArea } = screen.getPrimaryDisplay();
  const w = 460, h = 720;
  win = new BrowserWindow({
    width: w, height: h,
    x: workArea.x + workArea.width - w - 24,
    y: workArea.y + workArea.height - h - 8,
    transparent: true, frame: false, hasShadow: false, resizable: true,
    backgroundColor: '#00000000',
    title: 'Басовое космическое сыроварение',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, backgroundThrottling: false }
  });
  // Пустые места окна пропускают клики на рабочий стол; колба и панель ловят мышь.
  win.setIgnoreMouseEvents(true, { forward: true });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  // Звук и MIDI разрешены сразу, без вопросов браузера.
  session.defaultSession.setPermissionRequestHandler((wc, permission, cb) => {
    cb(['media', 'midi', 'midiSysex'].includes(permission));
  });
  session.defaultSession.setPermissionCheckHandler((wc, permission) => ['media', 'midi', 'midiSysex'].includes(permission));
  createWindow();
});

ipcMain.on('click-through', (e, on) => { if (win) win.setIgnoreMouseEvents(!!on, { forward: true }); });
ipcMain.on('on-top', (e, on) => { if (win) win.setAlwaysOnTop(!!on, 'floating'); });
ipcMain.on('minimize', () => { if (win) win.minimize(); });
ipcMain.on('close', () => app.quit());
app.on('window-all-closed', () => app.quit());
