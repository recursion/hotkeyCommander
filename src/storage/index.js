const chromeStorageStrategy = require('./chrome')
const localStorageStrategy = require('./local')

// determine which persistent storage we should use
// and return an api for that storage mechanism
module.exports = (chrome = null, localStorage = null) => {
  if (chrome && chrome.storage) {
    return chromeStorageStrategy()
  } else if (localStorage) {
    return localStorageStrategy()
  } else {
    throw new Error('No storage strategy available!')
  }
}

