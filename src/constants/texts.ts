export const LOGIN_TEXTS = {
  welcome: "Добро пожаловать!",
  pleaseLogin: "Пожалуйста, авторизируйтесь ",
  usermail: "Почта",
  password: "Пароль",
  remember: "Запомнить данные",
  forgotPassword: "Забыли пароль?",
  signIn: "Войти",
  create: "Создать",
} as const;

export const ERROR_TEXTS = {
  err_retry: "Попробуйте другие данные",
  ADD_PRODUCT: "Ошибка при добавлении товара",
  UPDATE_PRODUCT: "Ошибка при обновлении товара",
  DELETE_PRODUCT: "Ошибка при удалении товара",
  LOAD_PRODUCTS: "Ошибка при загрузке товаров",

  VALIDATION: {
    TITLE_REQUIRED: "Введите наименование товара",
    BRAND_REQUIRED: "Введите вендора",
    SKU_REQUIRED: "Введите артикул",
    PRICE_POSITIVE: "Цена должна быть больше 0",
    ALL_FIELDS_REQUIRED: "Заполните все обязательные поля",
  },

  DELETE_CONFIRMATION: "Вы уверены, что хотите удалить этот товар?",
} as const;

export const SUCCESS_TEXTS = {
  ADD_PRODUCT: "Товар успешно добавлен!",
  UPDATE_PRODUCT: "Товар обновлен!",
  DELETE_PRODUCT: "Товар удален!",
} as const;

export const TOOLTIP_TEXTS = {
  RESIZE_COLUMN: "Перетащите для изменения ширины",
  REFRESH: "Обновить данные",
  FILTER: "Фильтровать",
  ADD_PRODUCT: "Добавить товар",
  EDIT_PRODUCT: "Редактировать товар",
  SAVE_CHANGES: "Сохранить изменения",
  CANCEL_EDIT: "Отменить редактирование",
  INCREASE_QUANTITY: "Увеличить количество",
} as const;
