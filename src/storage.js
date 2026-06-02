export const STORE_PREFIX = 'foodos:v1:';
export const STORAGE_SCHEMA_VERSION = 1;

const STORAGE_VERSION_KEY = STORE_PREFIX + 'storageVersion';
const UPDATE_BACKUP_KEY = STORE_PREFIX + 'lastUpdateBackup';

function storageKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) keys.push(key);
  }
  return keys;
}

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(STORE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function writeJSON(key, value) {
  localStorage.setItem(STORE_PREFIX + key, JSON.stringify(value));
}

export function snapshotUserData(reason = 'manual') {
  const items = {};
  storageKeys()
    .filter(key => key.startsWith(STORE_PREFIX) && key !== UPDATE_BACKUP_KEY)
    .forEach(key => { items[key.slice(STORE_PREFIX.length)] = localStorage.getItem(key); });
  return {version: STORAGE_SCHEMA_VERSION, reason, exportedAt: new Date().toISOString(), items};
}

export function ensureUserDataPersisted() {
  try {
    const storedVersion = Number(localStorage.getItem(STORAGE_VERSION_KEY) || 0);
    if (storedVersion === STORAGE_SCHEMA_VERSION) return;
    const backup = snapshotUserData(`before storage schema ${storedVersion || 'new'} -> ${STORAGE_SCHEMA_VERSION}`);
    if (Object.keys(backup.items).length) {
      localStorage.setItem(UPDATE_BACKUP_KEY, JSON.stringify(backup));
    }
    localStorage.setItem(STORAGE_VERSION_KEY, String(STORAGE_SCHEMA_VERSION));
  } catch (err) {
    console.warn('Storage update guard skipped', err);
  }
}
