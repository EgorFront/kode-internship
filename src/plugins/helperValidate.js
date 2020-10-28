import getObjectProperty from '@utils/getObjectProperty.js'

const defaultErrors = {
  required: 'Это поле обязательно',
  email: 'Введенный email некорректен',
  sameAsPassword: 'Пароли не совпадают',
  minValue: 'Минимальное значение {}',
  maxValue: 'Максимальное значение {}',
  minLength: {
    text: 'Минимальная длина {} символа',
    param: 'min',
  },
  maxLength: {
    text: 'Максимальная длина {} символов',
    param: 'max',
  },
}

export default {
  install(Vue) {
    Vue.prototype.$helperValidate = this.validate
  },

  validate(vuelidateFieldKey, map) {
    const errorMap = { ...defaultErrors, ...map }

    if (!this.$v.$error) return ''

    const errorMapArray = Object.keys(errorMap)

    const dirtyKeys = errorMapArray.filter((key) => {
      if (getObjectProperty(this.$v, vuelidateFieldKey).hasOwnProperty(key)) {
        return !getObjectProperty(this.$v, vuelidateFieldKey)[key]
      }
    })

    dirtyKeys.forEach((key) => {
      const errorKey = errorMap[key]
      if (errorKey && errorKey.text && errorKey.param) {
        errorMap[key].text = errorKey.text.replace(
          '{}',
          getObjectProperty(this.$v, vuelidateFieldKey).$params[key][
            errorMap[key].param
          ]
        )
      }
    })

    return errorMap[dirtyKeys[0]]?.text || errorMap[dirtyKeys[0]]
  },
}
