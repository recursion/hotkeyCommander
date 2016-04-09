/* globals chrome localStorage */

// this keeps track of our persistent storage strategy
let strategy

// determine which persistent storage we should use
// and return an api for that storage mechanism
module.exports = () => {
  // determine what storage options we have
  strategy = determineStrategy()
  return strategy
}

// set the storage strategy to chrome.storage if available (we are extension)
// otherwise use localStorage
const determineStrategy = () => {
  if (chrome && chrome.storage) {
    return chromeStorageStrategy()
  } else {
    return localStorageStrategy()
  }
}

// turns a hotkeyList definition into
// two entities: categories and hotkeys
// each hotkey will get a category property linking
// to the id of their category
function normalize (list) {
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

// handle persistent storage when using chrome
const chromeStorageStrategy = () => {
  const init = (defaultHotkeys) => {}
  const get = () => {}
  const set = () => {}
  // expose listeners?
  return {
    init,
    set,
    get
  }
}

// handle persistent storage when using localStorage
const localStorageStrategy = () => {
  const init = (defaultHotkeys) => {
    const hotkeys = localStorage.hotkeys
    const categories = localStorage.categories
    if (hotkeys && categories) {
      return [JSON.parse(hotkeys), JSON.parse(categories)]
    } else {
      // did not find in storage

      // normalize the defaults
      const [hotkeys, categories] = normalize(defaultHotkeys)

      // store them in local storage
      set(hotkeys, categories)

      // return em
      return [hotkeys, categories]
    }
  }
  const get = () => {
    let hotkeys, categories
    try {
      hotkeys = JSON.parse(localStorage.hotkeys)
      categories = JSON.parse(localStorage.categories)
    } catch (e) {
      console.error(e.message)
      throw new Error('Failed to write to local storage!')
    }
    return [hotkeys, categories]
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
      console.error(e.message)
      throw new Error('Failed to write to local storage!')
    }
  }

  return {
    init,
    set,
    get
  }
}
