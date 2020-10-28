export default function getObjectProperty(obj, path, defaultValue) {
  const splitStr = path.split('.')

  const firstPath = splitStr.shift()

  const nestedValueOrObj = obj[firstPath]

  if (!nestedValueOrObj) {
    if (obj.hasOwnProperty(path)) {
      return nestedValueOrObj
    }

    return defaultValue
  }

  if (!splitStr.length) {
    return nestedValueOrObj
  }

  return getObjectProperty(nestedValueOrObj, splitStr.join('.'), defaultValue)
}
