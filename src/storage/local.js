// Local storage strategy
/* globals localStorage */
const normalize = require('./normalize')

// provide getters and setters
// for persistent storage when using localStorage
module.exports = () => {
  return {
    init,
    set,
    get
  }
}
const init = (defaultHotkeys, displayToggle) => {
  return new Promise((resolve, reject) => {
    const hotkeys = localStorage.hotkeys
    const categories = localStorage.categories
    const engineActive = localStorage.engineActive || !displayToggle
    if (hotkeys && categories) {
      return resolve([JSON.parse(hotkeys), JSON.parse(categories), JSON.parse(engineActive)])
    } else {
      // did not find in storage

      // normalize the defaults
      const [hotkeys, categories] = normalize(defaultHotkeys)

      // store them in local storage
      set('hotkeys', hotkeys)
      set('categories', categories)
      set('engineActive', !displayToggle)

      // return em
      return resolve([hotkeys, categories, engineActive])
    }
  })
}
const get = (keyName) => {
  return new Promise((resolve, reject) => {
    let target
    try {
      target = JSON.parse(localStorage[keyName])
    } catch (e) {
      console.error(e.message)
      throw new Error('Failed to write to local storage!')
    }
    return target
  })
}
/**
 * takes in normalized hotkeys and categories
 * and saves them to local storage
 */
const set = (keyName, value) => {
  // set them to local storage
  try {
    localStorage[keyName] = JSON.stringify(value)
  } catch (e) {
    console.error('Failed to write to local storage!', e.message)
  }
}

