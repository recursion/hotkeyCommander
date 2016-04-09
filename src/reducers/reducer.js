const actions = require('../actions')
const utils = require('../utils')
const storage = require('../storage')()

// setup the intialState
const initialState = exports.initialState = (defaultHotkeys) => {
  const normalizedDefaults = storage.init(defaultHotkeys)
  // load default hotkeys into a normalized data structure
  const [hotkeys, categories] = normalizedDefaults
  return {
    categories, // this is an array of category names
    hotkeys, // an object of hotkeyObjects with a category prop. = to its category id in categories
    keymap: generateKeymap(hotkeys), // an object of hotkeys with their hashed key combo as key
    recording: false // whether or not we are recording a new key
  }
}

// export our root reducer
exports.reducer = (state = initialState, action) => {
  const target = state.hotkeys[action.action]
  switch (action.type) {
    case actions.START_RECORDING:
      return Object.assign({}, state, {
        hotkeys: updateHotkey(state, target, target, true),
        recording: action.action
      })
    case actions.STOP_RECORDING:
      return Object.assign({}, state, {
        hotkeys: updateHotkey(state, target, target, false),
        recording: false
      })
    case actions.SET_KEY:
      const newHotkeys = updateHotkey(state, target, action, false)

      // update persistent storage anytime a key changes
      storage.set(newHotkeys)

      return Object.assign({}, state, {
        hotkeys: newHotkeys,
        keymap: generateKeymap(newHotkeys),
        recording: false
      })
    case actions.ALERT_ON:
      return Object.assign({}, state, {
        alert: true
      })
    case actions.ALERT_OFF:
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
      category: target.category,
      recording: recording,
      keyCode: key.keyCode,
      altKey: key.altKey,
      shiftKey: key.shiftKey,
      ctrlKey: key.ctrlKey
    }
  })
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
