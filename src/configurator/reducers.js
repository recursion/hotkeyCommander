const defaultHotkeys = require('../../hotkey.defaults')
const utils = require('../common/utils')
const {createStore} = require('redux')

const [cats, keys] = normalize(defaultHotkeys)
const initialState = {
  categories: cats,
  hotkeys: keys,
  keymap: generateKeymap(keys),
  recording: null,
  alert: false
}

module.exports = () => {
  const store = createStore(reducer, initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
  return store
}

let hotkeys
const reducer = (state = initialState, action) => {
  const target = state.hotkeys[action.action]
  switch (action.type) {
    case 'START_RECORDING':
      // create a new hotkeylist
      hotkeys = Object.assign({}, state.hotkeys, {
        [target.name]: {
          name: target.name,
          recording: true,
          keyCode: target.keyCode,
          altKey: target.altKey,
          shiftKey: target.shiftKey,
          ctrlKey: target.ctrlKey
        }
      })
      return Object.assign({}, state, {
        hotkeys: hotkeys,
        recording: action.action
      })
    case 'STOP_RECORDING':
      // create a new hotkeylist
      hotkeys = Object.assign({}, state.hotkeys, {
        [target.name]: {
          name: target.name,
          recording: false,
          keyCode: target.keyCode,
          altKey: target.altKey,
          shiftKey: target.shiftKey,
          ctrlKey: target.ctrlKey
        }
      })
      return Object.assign({}, state, {
        hotkeys: hotkeys,
        recording: false
      })
    case 'SET_KEY':
      // create a new hotkeylist
      hotkeys = Object.assign({}, state.hotkeys, {
        [target.name]: {
          name: target.name,
          recording: false,
          keyCode: action.keyCode,
          altKey: action.altKey,
          shiftKey: action.shiftKey,
          ctrlKey: action.ctrlKey
        }
      })

      return Object.assign({}, state, {
        hotkeys: hotkeys,
        recording: false,
        keymap: generateKeymap(hotkeys)
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
function generateKeymap (hotkeyList) {
  const result = {}
  for (let key in hotkeyList) {
    let hashedName = utils.hashKeyboardEvent(hotkeyList[key])
    result[hashedName] = key
  }
  return result
}

