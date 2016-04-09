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

// turns a hotkeyList definition into
// two entities: categories and hotkeys
// each hotkey will get a category property linking
// to the id of their category
exports.normalize = (list) => {
  // build an object of hotkeys keyed by hotkey.name
  const cats = []
  const hotkeys = {}
  list.forEach((cat, index) => {
    // for each category
    // iterate through each action
    cats.push(cat.category)
    for (let i = 0; i < cat.actions.length; i++) {
      const targetKey = cat.actions[i]
      // add the category index to this object
      hotkeys[targetKey.name] = (Object.assign({}, targetKey, {category: index}))
    }
  })
  return [hotkeys, cats]
}
