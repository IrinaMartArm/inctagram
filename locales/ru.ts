import { accountManagerRU } from '@/locales/profile-settings/accountManager/ru'
import { devicesRU } from '@/locales/profile-settings/devices/ru'
import { myPaymentRU } from '@/locales/profile-settings/myPayments/ru'

export const ru = {
  addPhotoForm: {
    attentionA: 'Вы действительно хотите закрыть создание публикации?',
    close: 'Закрыть',
    cropping: 'Обрезка',
    discard: 'Выйти',
    fileSize: 'Фотография должна быть размером менее 20 Мб',
    filters: 'Фильтры',
    next: 'Далее',
    openDraft: 'Открыть черновик',
    publication: 'Публикация',
    publish: 'Опубликовать',
    saveDraft: 'Сохранить черновик',
    selectInput: 'Выбрать с компьютера',
    title: 'Добавить фото',
    triggerButton: 'Создать',
    warningQ: 'Вы действительно хотите закрыть создание публикации?',
    warningR: 'Если вы закроете, все будет удалено',
  },
  cities: {
    Brest: 'Брест',
    Gomel: 'Гомель',
    Krasnodar: 'Краснодар',
    Minsk: 'Минск',
    Mogilev: 'Могилев',
    Moscow: 'Москва',
    Novopolotsk: 'Новополоцк',
    Sochi: 'Сочи',
    Vitebsk: 'Витебск',
    Volgograd: 'Волгоград',
  },
  common: {
    error: 'Ошибка!',
    no: 'Нет',
    yes: 'Да',
  },
  countText: {
    title: 'Зарегистрированные пользователи:',
  },
  countries: {
    belarus: 'Беларусь',
    notSelected: 'Не выбрано',
    russia: 'Россия',
  },
  emailSent: 'Письмо отправлено',
  logOut: {
    title: 'Выход',
    warning: 'Вы действительно хотите выйти из своей учетной записи',
  },
  menu: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Главная',
    messenger: 'Сообщения',
    myProfile: 'Мой профиль',
    search: 'Поиск',
    statistics: 'Статистика',
  },
  myProfile: {
    accountManagement: 'Управление аккаунтом',
    devices: 'Устройства',
    generalInformation: 'Обшая информация',
    myPayments: 'Мои платежи',
  },
  profileSettingAccountManager: accountManagerRU,
  profileSettingDevices: devicesRU,
  profileSettingMyPayment: myPaymentRU,
  profileSettings: {
    1: 'Политика конфиденциальности',
    aboutMe: 'Обо мне',
    aboutMePlaceholder: 'Расскажите о себе',
    addPhoto: 'Добавить фото',
    dateOfBirth: 'Дата рождения',
    deleteText: 'Вы действительно хотите удалить свою фотографию профиля?',
    deleteTitle: 'Удалить фотографию',
    errors: {
      aboutMe: 'Текст не должен превышать 200 символов',
      child: 'Пользователь младше 13 лет не может создать профиль.',
      dateFormatError: 'Ошибка формата даты!',
      emptyFirstName: 'Имя не может быть пустым',
      emptyLastName: 'Фамилия не может быть пустой',
      emptyUsername: 'Имя пользователя не может быть пустым',
      fell: 'Ошибка! Сервер недоступен!',
      formatFile: 'Формат загружаемой фотографии должен быть PNG и JPEG.',
      invalidAboutMe: 'Поле должно содержать 0-9; A-Z; a-z; А-Я; а-я; спец символы',
      maxCount: 'Максимальное количество символов',
      maxSize: 'Размер фотографии должен быть меньше 10 МБ!',
      success: 'Ваши настройки сохранены!',
    },
    failed: 'Транзакция не удалась, попробуйте еще раз.',
    firstName: 'Имя',
    invalidLastName: 'Фамилия должна содержать',
    invalidLastNameMax: 'Фамилия не должена превышать 50 символов',
    invalidName: 'Имя должно содержать ',
    invalidNameMax: 'Имя не должено превышать 50 символов',
    invalidUsername: 'Имя пользователя должно содержать',
    invalidUsernameMax: 'Имя пользователя не должено превышать 30 символов',
    lastName: 'Фамилия',
    saveChanges: 'Сохранить изменения',
    savePhoto: 'Сохранить',
    selectPhoto: 'Выбрать с компьютера',
    selectYourCity: 'Выберите свой город',
    selectYourCountry: 'Выберите вашу страну',
    success: 'Your settings are saved!',
    successful: 'Платеж прошел успешно!',
    username: 'Имя пользователя',
  },
  showMore: {
    hideText: 'Скрыть',
    showMore: 'Показать больше',
  },
  signIn: 'Войти',
  signUp: 'Зарегистрироваться',
  verification: {
    description:
      'Похоже, срок действия ссылки для подтверждения истек. Не волнуйтесь, мы можем отправить ссылку еще раз.',
    haveSent: 'Мы отправили ссылку для подтверждения вашего адреса электронной почты на',
    title: 'Срок действия ссылки для подтверждения электронной почты истек',
    titleButton: 'Повторно отправить ссылку',
  },
}

export type LocaleType = typeof ru
