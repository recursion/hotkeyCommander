const defaultHotkeys = require('../../hotkey.defaults')
const utils = require('../utils')

// load default hotkeys into a normalized data structure
const [categories, hotkeys] = normalize(defaultHotkeys)

// setup the intialState
const initialState = exports.initialState = {
  categories, // this is an array of category names
  hotkeys, // an object of hotkeyObjects with a category prop. = to its category id in categories
  keymap: generateKeymap(hotkeys), // an object of hotkeys with their hashed key combo as key
  recording: false // whether or not we are recording a new key
}

// export our root reducer
exports.reducer = (state = initialState, action) => {
  const target = state.hotkeys[action.action]
  switch (action.type) {
    case 'START_RECORDING':
      return Object.assign({}, state, {
        hotkeys: updateHotkey(state, target, target, true),
        recording: action.action
      })
    case 'STOP_RECORDING':
      return Object.assign({}, state, {
        hotkeys: updateHotkey(state, target, target, false),
        recording: false
      })
    case 'SET_KEY':
      const newHotkeys = updateHotkey(state, target, action, false)
      return Object.assign({}, state, {
        hotkeys: newHotkeys,
        keymap: generateKeymap(newHotkeys),
        recording: false
      })
    case 'ALERT_ON':
      return Object.assign({}, state, {
        alert: true
      })
    case 'ALERT_OFF':
      return Object.assign({}, state, {
        alert: false
      })
    default:
      return state
  }
}

// returns a new state object with an updated hotkey
function updateHotkey (state, target, key, recording) {
  return Object.assign({}, state.hotkeys, {
    [target.name]: {
      name: target.name,
      recording: recording,
      keyCode: key.keyCode,
      altKey: key.altKey,
      shiftKey: key.shiftKey,
      ctrlKey: key.ctrlKey
    }
  })
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
  return [cats, hotkeys]
}

// generate an object with code keys
// so that the hotkeys can be accessed by their keycode
// instead of by their name
// this should fire anytime the hotkey storage dictionary changes
// generate keymap must now strip out categories
function generateKeymap (list) {
  const result = {}
  for (let key in list) {
    let hashedName = utils.hashKeyboardEvent(list[key])
    result[hashedName] = key
  }
  return result
}
