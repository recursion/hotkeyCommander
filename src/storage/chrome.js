// Chrome.storage strategy
/* globals chrome */
const normalize = require('./normalize')

// handle persistent storage when using chrome
// when using this strategy we will listen
// from the commander engine for changes to the database
module.exports = () => {
  const init = (defaultHotkeys) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (settings) => {
        // if they exist, return them
        if (settings.hotkeys && settings.categories) {
          resolve([settings.hotkeys, settings.categories, settings.engineActive || false])
        } else {
          // otherwise add defaults to storage
          // and return those
          const [hotkeys, categories] = normalize(defaultHotkeys)
          chrome.storage.sync.set({hotkeys: hotkeys, categories: categories, engineActive: false})
          resolve([hotkeys, categories, false])
        }
      })
    })
  }

  const get = (keyname) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keyname, (value) => {
        // should have settings.hotkeys and settings.categories
        resolve(value)
      })
    })
  }

  const set = (keyName, value) => {
    chrome.storage.sync.set({[keyName]: value})
  }

  // expose listeners for chrome.storage.sync.onChange event?
  const addListener = chrome.storage.onChanged.addListener
  return {
    init,
    set,
    get,
    addListener
  }
}
