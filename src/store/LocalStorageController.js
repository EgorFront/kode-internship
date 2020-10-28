export default {
  getValue(key, emptyFiled = false) {
    let value = emptyFiled

    // На случай если значение не JSON объект
    try {
      value = JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
      value = window.localStorage.getItem(key)
    }

    if (value === null) {
      value = emptyFiled
    }

    return value
  },

  setValue(key, payload) {
    window.localStorage.setItem(key, JSON.stringify(payload))
  },

  removeValue(key) {
    window.localStorage.removeItem(key)
  },
}
