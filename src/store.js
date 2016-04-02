const defaultHotkeys = require('./defaultHotkeys')

const REGEX_CATEGORY = /^CATEGORY_.+/gi

// module level  variables
// this is where we keeps the important stuff in memory...
const hotkeyDictionary = loadHotkeys()
let keymap = generateNewKeymap(hotkeyDictionary)

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

/*
  calls back with key, value
  for each item on the dictionary
  while skipping over categories entirely
  usage:
  onEachKey(hotkeyDictionary, (key, value) => {
    console.log('key: ', key)
    console.log('value: ', value)
  })
*/
function onEachKey (dictionary, work) {
  const categories = dictionary
  // iterate through a list of categories
  for (let category in categories) {
    // iterate through an object of hotkey objects
    const hotkeys = categories[category]
    for (let hotkey in hotkeys) {
      work(hotkey, hotkeys[hotkey])
    }
  }
}

hotkeyStore.set = (key, value) => {
  const dict = hotkeyDictionary
  onEachKey(dict, (k, v) => {
    if (k === key) {
      // set the keycode
      v.keyCode = value
    }
  })
  // anytime we change the dictionary we
  // want to generate a new keymap
  generateNewKeymap(dict)
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
  onEachKey(dict, (key, value) => {
    if (dict[key].keyCode === keycode) {
      result = key
    }
  })
  return result
}

// generate an object with keyCode keys
// so that the hotkeys can be accessed by their keycode
// instead of by their name
// this should fire anytime the hotkey storage dictionary changes
// generate keymap must now strip out categories
function generateNewKeymap (keyDictionary) {
  const hotkeys = keyDictionary
  const result = {}

  // create a hotkey object
  // and add it to our result object
  onEachKey(hotkeys, (key, value) => {
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
  console.log('Loading: ', defaultHotkeys)
  return defaultHotkeys
}
