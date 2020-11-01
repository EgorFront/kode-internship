# Kode-intership pokemons

## Первое задание

[Решение первого задания используется в коде проекта](https://github.com/EgorFront/kode-internship/blob/master/src/utils/getObjectProperty.js)

В задании было не совсем очевидно поведение функции, если объявленному свойству присвоено значение `undefined`, я принял решение что в таком случае функция должна вернуть `undefined` вместо `defaultValue`

### Тесты для проверки функции (Jest)

```js
describe('@utils/get-object-property', () => {
  const testObj = {
    pupa: {
      lupa: {
        beep: 'boop',
      },
      foo: 'bar',
    },

    test: undefined,
  }

  it('case 1', () => {
    const result = getObjectProperty(testObj, 'pupa.lupa')
    expect(result).toEqual({ beep: 'boop' })
  })

  it('case 2', () => {
    const result = getObjectProperty(testObj, 'pupa.lupa.beep')
    expect(result).toEqual('boop')
  })

  it('case 3', () => {
    const result = getObjectProperty(testObj, 'pupa.foo')
    expect(result).toEqual('bar')
  })

  it('case 4', () => {
    const result = getObjectProperty(testObj, 'pupa.ne.tuda')
    expect(result).toEqual(undefined)
  })

  it('case 5', () => {
    const result = getObjectProperty(testObj, 'pupa.ne.tuda', true)
    expect(result).toEqual(true)
  })

  it('case 6', () => {
    const result = getObjectProperty(testObj, 'pupa.ne.tuda', 'Default value')
    expect(result).toEqual('Default value')
  })

  it('case 7', () => {
    const result = getObjectProperty(testObj, 'test', 'Default value')
    expect(result).toEqual(undefined)
  })
})
```

## Второе задание

[Демо проекта](https://kode-internship.vercel.app/)

### Декомпозиция

На решение второй задачи ушло около 10 часов. К сожалению я поздно узнал о стажировке, и приступил к заданию за несколько дней до конца срока сдачи, поэтому был сильно ограничен во времени

- Построение архитектуры - 3 часа
- Авторизация - 3 часа
- Основная часть - 4 часа

#### Описание архитектуры

Для построения изначальной архитектуры взял [vue-cli](https://cli.vuejs.org/)

Некоторые архитектурные решения были позаимствованы у [этого репозитория](https://github.com/chrisvfritz/vue-enterprise-boilerplate).

Так же был использован этот [компонентный фреймворк](https://vuetifyjs.com/en/), для сокращения затраченного времени на написание стилей

##### Линтеры

В проекте настроены: **esLint, styleLint, prettier**

##### Дополнительно

Настроены **aliases** для удобного импорта, настройка **precommitHooks** с запуском линтеров

### Авторизация

Данные для авторизации

- Логин — `kode@kode.ru`
- Пароль — `Enk0deng`
- Otp — 123456

Реализовано запоминание сессии через localStorage

#### Валидация форм

Для валидации использутеся [этот плагин](https://vuelidate.js.org/) + небольшой [самописный плагин](https://github.com/EgorFront/kode-internship/blob/master/src/plugins/helperValidate.js)

#### Роутер

Для ограничений роутера использую [очень императивный подход](https://github.com/EgorFront/kode-internship/blob/master/src/router/index.js#L14-L42), хотел написать плагин для ACL (access controller list), но не успел

### Дополнительные задания

- [ ] Компонент «Селект категорий» написан самостоятельно. Макет прототипа
- [x] Пагинация карточек. Макет прототипа
- [x] Любые анимации интерфейса
- [x] Быстрый просмотр покемона в модальном окне по клику на карточку
- [x] Сохранение сессии авторизованного пользователя после закрытия вкладки браузера. Например, через local storage браузера
- [ ] Адаптивный дизайн

### Сложности при создании проекта

Возникли сложности с деплоем проекта на gh, поэтому выбрал [https://vercel.com/](https://vercel.com/)

### Запуск проекта в dev режиме

```
yarn serve
```

### Build проекта

```
yarn build
```
