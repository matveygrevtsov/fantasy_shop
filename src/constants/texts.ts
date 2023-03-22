import {
  FirebaseErrors,
  SignInFormInput,
  SignUpFormInput,
} from "../types/auth";
import { ProductCategory, ProductsSortType } from "../types/product";
import { RoutePath } from "../types/routing";

export const texts = {
  FirebaseErrors: {
    [FirebaseErrors.AuthUserNotFound]: "Пользователь с таким email не найден.",
    [FirebaseErrors.AuthWrongPassword]: "Невалидный пароль.",
    [FirebaseErrors.AuthEmailAlreadyInUse]:
      "Предоставленный адрес электронной почты уже используется существующим пользователем.",
    defaultErrorText: "Произошла ошибка. Повторите попытку позже",
  },
  SignUpPage: {
    title: "Зарегистрироваться",
    alreadyHasAccountText: "Уже есть аккаунт ? Авторизуйтесь.",
    SignUpForm: {
      labels: {
        [SignUpFormInput.Email]: "Почта",
        [SignUpFormInput.Password]: "Пароль",
        [SignUpFormInput.RepeatPassword]: "Повторите пароль",
      },
      validationErrors: {
        emptyEmail: "Email не указан",
        invalidEmail: "Невалидный email",
        emptyPassword: "Пароль не указан",
        shortPassword: "Длина пароля должна быть не менее 4 символа",
        passwordsMismatch: "Пароли не совпадают",
      },
      submitButtonText: "Зарегистрироваться",
    },
  },
  SignInPage: {
    title: "Авторизоваться",
    SignInForm: {
      labels: {
        [SignInFormInput.Email]: "Почта",
        [SignInFormInput.Password]: "Пароль",
      },
      validationErrors: {
        emptyEmail: "Email не указан",
        invalidEmail: "Невалидный email",
        emptyPassword: "Пароль не указан",
        invalidPassword: "Невалидный пароль",
      },
      submitButtonText: "Войти",
    },
  },
  CreateProductPage: {
    title: "Создать продукт",
    CreateProductForm: {
      labels: {
        name: "Наименование",
        description: "Описание",
        price: "Цена",
        amount: "Количество в наличии",
        productCategories: "Категории",
      },
      validationErrors: {
        emptyName: "Наименование не должно быть пустым",
        emptyDescription: "Описание не должно быть пустым",
        invalidPrice: "Невалидное значение цены",
        emptyPrice: "Цена не указана",
        invalidAmount: "Невалидное количество товара в наличии",
        emptyAmount: "Количество товара в наличии не указано",
      },
      submitButtonText: "Создать",
    },
    createProductFailText:
      "К сожалению, не удалось создать продукт. Попробуйте позже.",
    createProductSuccessText: "Продукт успешно создан.",
  },
  Header: {
    logoutText: "Выйти",
    guestRoutes: [
      {
        title: "Главная",
        path: RoutePath.MainPage,
      },
      {
        title: "Регистрация",
        path: RoutePath.SignUpPage,
      },
      {
        title: "Вход",
        path: RoutePath.SignInPage,
      },
    ],
    clientRoutes: [
      {
        title: "Главная",
        path: RoutePath.MainPage,
      },
      {
        title: "Корзина",
        path: RoutePath.CartPage,
      },
    ],
    adminRoutes: [
      {
        title: "Главная",
        path: RoutePath.MainPage,
      },
      {
        title: "Создать продукт",
        path: RoutePath.CreateProductPage,
      },
    ],
  },
  Footer: {
    copyright: "© 2023 Copyright: Fantasy Shop",
  },
  ProductsSearchForm: {
    searchInputPlaceholder: "Введите название продукта",
    searchProductsParamsTitle: "Фильтры",
    ProductSortTypeSelect: {
      title: "Сортировка",
      options: [
        {
          value: ProductsSortType.DescendingOrderPrice,
          label: "По убыванию цены",
        },
        {
          value: ProductsSortType.AscendingOrderPrice,
          label: "По возрастанию цены",
        },
      ],
    },
  },
  ImagesUploader: {
    placeholder:
      "Перетяните несколько картинок, либо нажмите, чтобы выбрать их с вашего устройства.",
  },
  ProductActions: {
    addToCartText: "Добавить в корзину",
    addToCartSuccessText: "Товар успешно добавлен в корзину.",
    addToCartErrorText:
      "Не удалось добавить товар в корзину. Повторите попытку позже.",
    editText: "Редактировать",
    currency: "₽",
    productIsOutOfStock: "К сожалению, товар закончился",
    productInvalidAmount: "Введено невалидное количество товара",
    productAmountLimit: "К сожалению, в наличии нет такого количества товара",
  },
  ProductCategorySelect: {
    title: "Категории",
    placeholder: "Выбрать категории",
    options: [
      {
        value: ProductCategory.Goblins,
        label: "Гоблины",
      },
      {
        value: ProductCategory.Orks,
        label: "Орки",
      },
      {
        value: ProductCategory.Dwarfs,
        label: "Гномы",
      },
    ],
  },
};
