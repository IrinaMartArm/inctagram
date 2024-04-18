export const ru = {
  favorites: {
    title: "Страница",
  },
  general: {
    title: "Страница",
  },
  policy: {
    title: "Политика конфиденциальности",
  },
  signIn: {
    errors: {
      email:
        "Электронная почта должна соответствовать формату\n" +
        "example@example.com",
      invalidPassword: "Пароль должен содержать",
      loginError:
        "Указан неверный адрес электронной почты или пароль. Попробуйте еще раз, пожалуйста",
      passwordMax: "Максимальное количество символов 20",
      passwordMin: "Минимальное количество символов 6",
      required: "Обязательное поле",
      unknownError: "Unknown error",
    },
    forgotPassword: "Забыли пароль",
    password: "Пароль",
    question: "У вас нет учетной записи?",
    signUp: "Зарегистрироваться",
    title: "Войти",
  },
  signup: {
    1: "Условиями обслуживания",
    2: "Политикой конфиденциальности",
    agree: "Я согласен с  <1></1> и <2></2>",
    name: "Имя пользователя",
    password: "Пароль",
    password2: "Подтверждение пароля",
    question: "У вас уже есть аккаунт?",
    signIn: "Войти",
    title: "Зарегистрироваться",
  },
};

export type LocaleType = typeof ru;
