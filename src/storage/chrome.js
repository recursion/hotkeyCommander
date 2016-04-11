// Chrome.storage strategy
/* globals chrome */
const normalize = require('./normalize')

// handle persistent storage when using chrome
// when using this strategy we will listen
// from the commander engine for changes to the database
module.exports = () => {
  const init = (defaultHotkeys) => {
    console.log('In init: ', defaultHotkeys)
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (settings) => {
        // if they exist, return them
        if (settings.hotkeys && settings.categories) {
          return resolve([settings.hotkeys, settings.categories])
        } else {
          // otherwise add defaults to storage
          // and return those
          const [hotkeys, categories] = normalize(defaultHotkeys)
          chrome.storage.sync.set({hotkeys: hotkeys, categories: categories})
          return resolve([hotkeys, categories])
        }
      })
    })
  }

  const get = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (settings) => {
        // should have settings.hotkeys and settings.categories
        return resolve([settings.hotkeys, settings.categories])
      })
    })
  }

  const set = (hotkeys) => {
    chrome.storage.sync.set({hotkeys})
  }

  // expose listeners for chrome.storage.sync.onChange event?
  const addListener = chrome.storage.onChanged.addListener
  console.log('AL IS: ', addListener)
  return {
    init,
    set,
    get,
    addListener
  }
}
