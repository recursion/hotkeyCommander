const defaultHotkeys = require('./defaultHotkeys')

const REGEX_CATEGORY = /^CATEGORY_.+/gi

// module level  variables
// this is where we keeps the important stuff in memory...
const hotkeyDictionary = loadHotkeys()
let keymap = generateKeymap(hotkeyDictionary)

// export the hotkeyStore object
const hotkeyStore = module.exports = {
  findNameByKeyCode,
  isCategory
}

hotkeyStore.getKeymap = () => {
  return keymap
}

hotkeyStore.getDictionary = () => {
  return hotkeyDictionary
}

hotkeyStore.set = (key, value) => {
  const categories = hotkeyDictionary
  // iterate through a list of categories
  for (let category in categories) {
    // iterate through an object of hotkey objects
    const hotkeys = categories[category]
    for (let hotkey in hotkeys) {
      if (hotkey === key) {
        hotkeys[hotkey].keyCode = value
      }
    }
  }
  // anytime we change the dictionary we
  // want to generate a new keymap
  keymap = generateKeymap(hotkeyDictionary)
}

/**
 * searches through the keyDictionary and
 * attempts to find the keycode in the keydictionary
 * @param {Number} - a keycode
 * @returns Key:String or null
*/
function findNameByKeyCode (keycode) {
  const hotkeys = removeCategoriesFromDictionary(hotkeyDictionary)
  for (let key in hotkeys) {
    if (hotkeys[key].keyCode === keycode) {
      return key
    }
  }
  return null
}

// generate an object with keyCode keys
// so that the hotkeys can be accessed by their keycode
// instead of by their name
// this should fire anytime the hotkey storage dictionary changes
// generate keymap must now strip out categories
function generateKeymap (keyDictionary) {
  keyDictionary = removeCategoriesFromDictionary(keyDictionary)
  const hotkeys = keyDictionary
  const result = {}

  for (const hotkey in hotkeys) {
    if (hotkeys.hasOwnProperty(hotkey)) {
      // build new hotkey dictionary here
      const thisKey = hotkeys[hotkey]
      result[thisKey.keyCode] = {
        name: hotkey,
        ctrlKey: hotkeys[hotkey].ctrlKey,
        altKey: hotkeys[hotkey].altKey,
        shiftKey: hotkeys[hotkey].shiftKey
      }
    }
  }
  return result
}

// return a dictionary of only hotkeys (for building keymaps)
// (returns a version of the hotkey dictionary with the categories stripped out)
function removeCategoriesFromDictionary (hotkeysDictionary) {
  const result = {}

  for (const hotkey in hotkeysDictionary) {
    if (hotkeysDictionary.hasOwnProperty(hotkey)) {
      if (isCategory(hotkey, hotkeysDictionary)) {
        // TODO: verify that this key doesnt exist yet..

        // add this categorys hotkeys to our result object
        Object.assign(result, hotkeysDictionary[hotkey])
      }
    }
  }
  return result
}

function isCategory (key, dictionary) {
  // regex describing a category key
  // anything that begins with CATEGORY_
  // will be treated as a category type
  const reggie = REGEX_CATEGORY
  return reggie.test(key)
}

// TODO:
// load an existing dictionary of hotkeys
// otherwise load defaults
function loadHotkeys () {
  return defaultHotkeys
}
