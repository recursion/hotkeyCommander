const defaultHotkeys = require('../../hotkey.defaults')
const utils = require('../common/utils')
/*
{
  hotkeyList: [{hotkeyCategory}...],
  keymap: {
    keyComboHash: hotkeyObject,
    keyComboHash: hotkeyObject
  },
  recording: {
    active: bool,
    hotkeyAction: hotkey,
    target: Element
  }
}
*/
const initialState = {
  hotkeyList: defaultHotkeys,
  keymap: generateKeymap(defaultHotkeys),
  alertId: 0,
  recording: {
    active: false,
    key: null,
    target: null
  }
}

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case 'START_RECORDING':
      return Object.assign({}, state, {
        recording: {
          active: true,
          hotkeyAction: action.hotkeyAction,
          target: action.element
        }
      })
    case 'STOP_RECORDING':
      return Object.assign({}, state, {
        recording: {
          active: false,
          hotkeyAction: null,
          target: null
        }
      })
    case 'SET_KEY':
      // create a new hotkeylist
      const hotkeyList = state.hotkeyList.map((category, index) => {
        return Object.assign({}, category, {
          keys: category.keys.map((hotkey, idx) => {
            if (hotkey.action === action.hotkeyAction) {
              return Object.assign({}, hotkey, {
                keyCode: action.keyboardEvent.keyCode,
                altKey: action.keyboardEvent.altKey,
                shiftKey: action.keyboardEvent.shiftKey,
                ctrlKey: action.keyboardEvent.ctrlKey
              })
            } else {
              return hotkey
            }
          })
        })
      })

      return Object.assign({}, state, {
        hotkeyList: hotkeyList,
        keymap: generateKeymap(hotkeyList)
      })
    case 'ALERT':
      return Object.assign({}, state, {
        alertId: ++state.alertId
      })
    default:
      return state
  }
}

// generate an object with code keys
// so that the hotkeys can be accessed by their keycode
// instead of by their name
// this should fire anytime the hotkey storage dictionary changes
// generate keymap must now strip out categories
function generateKeymap (hotkeyList) {
  const result = {}

  // create a hotkey object
  // and add it to our result object
  forEachHotkey(hotkeyList, (key) => {
    let hashedName = utils.hashKeyboardEvent(key)
    result[hashedName] = key
  })
  // set keymap to our result
  // and return it
  return result
}

// call back with each hotkey object
function forEachHotkey (hotkeyList, work) {
  hotkeyList.forEach((category) => {
    category.keys.forEach((hotkey) => {
      work(hotkey)
    })
  })
}
