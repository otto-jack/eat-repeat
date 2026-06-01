export const STORE_PREFIX = 'foodos:v1:';

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
