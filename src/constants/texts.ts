import {
  FirebaseErrors,
  ProductCategory,
  ProductsSortType,
  RoutePath,
  SignInFormInput,
  SignUpFormInput,
  UserStatus,
} from "./enums";

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
        productCategories: "Категории",
      },
      validationErrors: {
        emptyName: "Наименование не должно быть пустым",
        emptyDescription: "Описание не должно быть пустым",
        invalidPrice: "Невалидное значение цены",
        emptyPrice: "Цена не указана",
      },
      submitButtonText: "Создать",
    },
    createProductFailText:
      "К сожалению, не удалось создать продукт. Попробуйте позже.",
    createProductSuccessText: "Продукт успешно создан.",
  },
  Header: {
    logoutText: "Выйти",
    navigation: [
      {
        title: "Главная",
        path: RoutePath.MainPage,
        availableFor: {
          [UserStatus.Loading]: true,
          [UserStatus.Error]: true,
          [UserStatus.Guest]: true,
          [UserStatus.Client]: true,
          [UserStatus.Admin]: true,
        },
      },
      {
        title: "Корзина",
        path: RoutePath.CartPage,
        availableFor: {
          [UserStatus.Loading]: false,
          [UserStatus.Error]: false,
          [UserStatus.Guest]: false,
          [UserStatus.Client]: true,
          [UserStatus.Admin]: false,
        },
      },
      {
        title: "Регистрация",
        path: RoutePath.SignUpPage,
        availableFor: {
          [UserStatus.Loading]: true,
          [UserStatus.Error]: true,
          [UserStatus.Guest]: true,
          [UserStatus.Client]: false,
          [UserStatus.Admin]: false,
        },
      },
      {
        title: "Вход",
        path: RoutePath.SignInPage,
        availableFor: {
          [UserStatus.Loading]: true,
          [UserStatus.Error]: true,
          [UserStatus.Guest]: true,
          [UserStatus.Client]: false,
          [UserStatus.Admin]: false,
        },
      },
      {
        title: "Создать продукт",
        path: RoutePath.CreateProductPage,
        availableFor: {
          [UserStatus.Loading]: false,
          [UserStatus.Error]: false,
          [UserStatus.Guest]: false,
          [UserStatus.Client]: false,
          [UserStatus.Admin]: true,
        },
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
