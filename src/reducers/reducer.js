const actions = require('../actions')
const utils = require('../utils')

// we use this for initial state as well as persisting any changes
const persistentStorage = exports.persistentStorage = require('../storage')(window.chrome, window.localStorage)

exports.setupInitialState = (defaultHotkeys) => {
  return new Promise((resolve, reject) => {
    // provide our persistentStorageStrategy with defaultHotkeys incase it doesnt ahve any.
    // it returns normalized hotkeys and categories - either from existing or defaults
    persistentStorage.init(defaultHotkeys)
      .then((result) => {
        const [hotkeys, categories] = result
        // return the apps initial state
        resolve({
          categories, // this is an array of category names
          hotkeys, // an object of hotkeyObjects with a category prop. = to its category id in categories
          keymap: generateKeymap(hotkeys), // an object of hotkeys with their hashed key combo as key
          recording: false // whether or not we are recording a new key
        })
      })
  })
}

// export our root reducer
exports.reducer = (state = {}, action) => {
  switch (action.type) {
    case actions.START_RECORDING:
      return startRecording(state, action)

    case actions.STOP_RECORDING:
      return stopRecording(state, action)

    case actions.SET_KEY:
      return setKey(state, action)

    case actions.ALERT_ON:
      return Object.assign({}, state, {
        alert: true
      })
    case actions.ALERT_OFF:
      return Object.assign({}, state, {
        alert: false
      })
    case 'CHROME_STORAGE_UPDATE':
      // we need to request a new keymap here
      return Object.assign({}, state, {
        keymap: generateKeymap(action.hotkeys)
      })
    default:
      return state
  }
}

function startRecording (state, action) {
  const target = state.hotkeys[action.action]
  return Object.assign({}, state, {
    hotkeys: updateHotkey(state, target, target, true),
    recording: action.action
  })
}

function stopRecording (state, action) {
  const target = state.hotkeys[action.action]
  return Object.assign({}, state, {
    hotkeys: updateHotkey(state, target, target, false),
    recording: false
  })
}

function setKey (state, action) {
  const target = state.hotkeys[action.action]
  const newHotkeys = updateHotkey(state, target, action, false)

  // update persistent storage anytime a key changes
  persistentStorage.set(newHotkeys)

  return Object.assign({}, state, {
    hotkeys: newHotkeys,
    keymap: generateKeymap(newHotkeys),
    recording: false
  })
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
