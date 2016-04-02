const defaultHotkeys = require('./defaultHotkeys')

const REGEX_CATEGORY = /^CATEGORY_.+/gi

/** ********************************
 *   module level variables
 */

/**       HOTKEY DICTIONARY
 *
 * {
 *  CATEGORY_THE_CATEGORY_NAME: {
 *    HOTKEY_NAME: {
 *       keyCode: 89,
 *       ctrlKey: false,
 *       shiftKey: false,
 *       altKey: false
 *    },
 *    .......
 *  },
 *  .......
 * }
 *
 */
// store our hotkey dictionary with categories
// using hotkey names as keys
const hotkeyDictionary = loadHotkeys()

/**       HOTKEY MAP
 *
 * {
*    HOTKEY_KEYCODE: {
*       name: 'HOTKEY_NAME',
*       keyCode: 89,
*       ctrlKey: false,
*       shiftKey: false,
*       altKey: false
*    },
*    .......
* }
*/
// this is a map of the hotkeys
// with no categories and
// using the keycodes as keys
let keymap = generateNewKeymap(hotkeyDictionary)
/* **************************/

// export the hotkey Store object
module.exports = {
  findNameByKeyCode,
  getKeymap,
  getDictionary,
  set,
  isCategory
}

function getKeymap () {
  return keymap
}

function getDictionary () {
  return hotkeyDictionary
}

/**
 * searches through the keyDictionary and
 * attempts to find the keycode in the keydictionary
 * @param {Number} - a keycode
 * @returns Key:String or null
*/
function findNameByKeyCode (keycode) {
  const dict = hotkeyDictionary
  let result = null
  forEachHotkey(dict, (key, value) => {
    if (dict[key].keyCode === keycode) {
      result = key
    }
  })
  return result
}

function set (key, value) {
  forEachHotkey((k, v) => {
    if (k === key) {
      // set the keycode
      v.keyCode = value
    }
  })
  // anytime we change the dictionary we
  // want to generate a new keymap
  generateNewKeymap()
}

function isCategory (key) {
  // regex describing a category key
  // anything that begins with CATEGORY_
  // will be treated as a category type
  const reggie = REGEX_CATEGORY
  return reggie.test(key)
}

/*
  calls back with key, value
  for each item on the dictionary
  while skipping over categories entirely
  usage:
  forEachHotkey(hotkeyDictionary, (key, value) => {
    console.log('key: ', key)
    console.log('value: ', value)
  })
*/
function forEachHotkey (work) {
  const categories = hotkeyDictionary
  // iterate through a list of categories
  for (let category in categories) {
    // iterate through an object of hotkey objects
    const hotkeys = categories[category]
    for (let hotkey in hotkeys) {
      work(hotkey, hotkeys[hotkey])
    }
  }
}

// generate an object with keyCode keys
// so that the hotkeys can be accessed by their keycode
// instead of by their name
// this should fire anytime the hotkey storage dictionary changes
// generate keymap must now strip out categories
function generateNewKeymap () {
  const result = {}

  // create a hotkey object
  // and add it to our result object
  forEachHotkey((key, value) => {
    result[value.keyCode] = {
      name: key,
      ctrlKey: value.ctrlKey,
      altKey: value.altKey,
      shiftKey: value.shiftKey
    }
  })
  // set keymap to our result
  // and return it
  keymap = result
  return keymap
}

// TODO:
// load an existing dictionary of hotkeys
// otherwise load defaults
function loadHotkeys () {
  return defaultHotkeys
}
