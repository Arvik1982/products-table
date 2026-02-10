import type { ProductFormData } from "../types";

export const TABLE_COLUMNS = {
  PRODUCT_NAME: "productName",
  BRAND: "brand",
  SKU: "sku",
  RATING: "rating",
  PRICE: "price",
  STOCK: "stock",
  ACTIONS: "actions",
} as const;

export const INITIAL_COLUMN_WIDTHS: Record<string, number> = {
  [TABLE_COLUMNS.PRODUCT_NAME]: 350,
  [TABLE_COLUMNS.BRAND]: 125,
  [TABLE_COLUMNS.SKU]: 150,
  [TABLE_COLUMNS.RATING]: 140,
  [TABLE_COLUMNS.PRICE]: 155,
  [TABLE_COLUMNS.STOCK]: 125,
  [TABLE_COLUMNS.ACTIONS]: 133,
};

export const MINIMUM_COLUMN_WIDTHS: Record<string, number> = {
  [TABLE_COLUMNS.PRODUCT_NAME]: 200,
  [TABLE_COLUMNS.BRAND]: 80,
  [TABLE_COLUMNS.SKU]: 80,
  [TABLE_COLUMNS.RATING]: 80,
  [TABLE_COLUMNS.PRICE]: 80,
  [TABLE_COLUMNS.STOCK]: 80,
  [TABLE_COLUMNS.ACTIONS]: 80,
};

export const TABLE_TEXTS = {
  HEADER: "Все позиции",
  ADD_PRODUCT: "Добавить",
  LOADING: "Загрузка товаров...",
  NO_PRODUCTS: "Товары не найдены",
  COLUMN_HEADERS: {
    PRODUCT_NAME: "Наименование",
    BRAND: "Вендор",
    SKU: "Артикул",
    RATING: "Оценка",
    PRICE: "Цена, ₽",
    STOCK: "Количество",
  },
  ACTIONS: {
    SAVE: "Сохранить",
    CANCEL: "Отмена",
    EDIT: "Редактировать",
    INCREASE_QUANTITY: "Увеличить количество",
  },
} as const;

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  DEFAULT_SKIP: 0,
} as const;

export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 500, // мс
} as const;

export const EDIT_CONFIG = {
  LOW_RATING_THRESHOLD: 3,
  RATING_MAX: 5,
  RATING_MIN: 0,
  PRICE_MIN: 0,
  STOCK_MIN: 0,
} as const;

export const DEFAULT_NEW_PRODUCT: ProductFormData = {
  title: "",
  brand: "",
  sku: "",
  price: 0,
  stock: 0,
  category: "",
};

export const FIELD_TYPES = {
  TEXT: "text",
  NUMBER: "number",
  CURRENCY: "currency",
} as const;

export const COLUMN_CONFIGS = {
  brand: {
    header: "Вендор",
    type: FIELD_TYPES.TEXT,
    maxWidth: 200,
  },
  sku: {
    header: "Артикул",
    type: FIELD_TYPES.TEXT,
    maxWidth: 150,
  },
  rating: {
    header: "Оценка",
    type: FIELD_TYPES.NUMBER,
    shouldShowLowRatingWarning: true,
    maxWidth: 120,
  },
  price: {
    header: "Цена, Р",
    type: FIELD_TYPES.CURRENCY,
    maxWidth: 120,
  },
  stock: {
    header: "Коичество",
    type: FIELD_TYPES.NUMBER,
    maxWidth: 100,
  },
};
