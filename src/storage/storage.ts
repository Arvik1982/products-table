export const STORAGE_KEYS = {
  SAVED_USERNAME: "@savedUsername" as const,
  SAVED_PASSWORD: "@savedPassword" as const,
  AUTH_TOKEN: "@authToken" as const,
  USER_DATA: "@user" as const,
  REMEMBER_ME: "@remember" as const,
  COLUMN_WIDTHS: "productsColumnWidths",
  SORTING_STATE: "productsSorting",
} as const;

type StorageKeysType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const storage = {
  saveLoginData: (username: string, password: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_USERNAME, username);
      localStorage.setItem(STORAGE_KEYS.SAVED_PASSWORD, password);
    } catch (error) {
      console.error("Ошибка сохранения логина:", error);
    }
  },

  loadLoginData: (): { username: string; password: string } => {
    try {
      const username = localStorage.getItem(STORAGE_KEYS.SAVED_USERNAME) || "";
      const password = localStorage.getItem(STORAGE_KEYS.SAVED_PASSWORD) || "";
      return { username, password };
    } catch (error) {
      console.error("Ошибка загрузки логина:", error);
      return { username: "", password: "" };
    }
  },

  clearLoginData: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SAVED_USERNAME);
      localStorage.removeItem(STORAGE_KEYS.SAVED_PASSWORD);
    } catch (error) {
      console.error("Ошибка очистки логина:", error);
    }
  },

  save: <T>(key: StorageKeysType | string, data: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Ошибка сохранения ${key}:`, error);
    }
  },

  load: <T>(key: StorageKeysType | string, defaultValue: T): T => {
    try {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue) as T;
      }
      return defaultValue;
    } catch (error) {
      console.error(`Ошибка загрузки ${key}:`, error);
      return defaultValue;
    }
  },

  remove: (key: StorageKeysType | string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Ошибка удаления ${key}:`, error);
    }
  },

  clearAll: (): void => {
    try {
      localStorage.clear();
      console.warn("localStorage полностью очищен");
    } catch (error) {
      console.error("Ошибка очистки localStorage:", error);
    }
  },
} as const;

export default storage;
