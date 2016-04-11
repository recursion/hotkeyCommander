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
const init = (defaultHotkeys) => {
  return new Promise((resolve, reject) => {
    const hotkeys = localStorage.hotkeys
    const categories = localStorage.categories
    if (hotkeys && categories) {
      return resolve([JSON.parse(hotkeys), JSON.parse(categories)])
    } else {
      // did not find in storage

      // normalize the defaults
      const [hotkeys, categories] = normalize(defaultHotkeys)

      // store them in local storage
      set(hotkeys, categories)

      // return em
      return resolve([hotkeys, categories])
    }
  })
}
const get = () => {
  return new Promise((resolve, reject) => {
    let hotkeys, categories
    try {
      hotkeys = JSON.parse(localStorage.hotkeys)
      categories = JSON.parse(localStorage.categories)
    } catch (e) {
      console.error(e.message)
      throw new Error('Failed to write to local storage!')
    }
    return [hotkeys, categories]
  })
}
/**
 * takes in normalized hotkeys and categories
 * and saves them to local storage
 */
const set = (hotkeys, categories) => {
  // set them to local storage
  try {
    localStorage.hotkeys = JSON.stringify(hotkeys)
    if (categories) {
      localStorage.categories = JSON.stringify(categories)
    }
  } catch (e) {
    console.error('Failed to write to local storage!', e.message)
  }
}

