const utils = require('../common/utils')
//const keyCodes = require('../../keycodes.local')

// an array of keycodes for ctrl, shift, alt, and the meta key (windows/mac key)
// these can only be used to modify other keys - not as standalone hotkeys
const metaKeyCodes = [17, 16, 18, 91]

module.exports = (Store) => {
  return {
    onKeydown: onKeyboardEvent
  }

  // emit an event when a user is trying to set a key
  function emitSetKey (action, keyboardEvent, element) {
    const event = {type: 'SET_KEY',
      hotkeyAction: action,
      element,
      keyboardEvent
    }
    Store.dispatch(event)
  }

  // this is a generic keyboard event handler
  // and could be used equally for up/down or press events
  function onKeyboardEvent (keyboardEvent) {
    const state = Store.getState()
    /*
    console.log(`
     keycode: ${keyboardEvent.keyCode}
     char: ${String.fromCharCode(keyboardEvent.keyCode)}
     key: ${keyCodes[keyboardEvent.keyCode]}
     ctrl: ${keyboardEvent.ctrlKey}
     shift: ${keyboardEvent.shiftKey}
     alt: ${keyboardEvent.altKey}
    `)
    */

    // we only do things here if key recording has been activated
    if (state.recording.active) {
      const code = keyboardEvent.keyCode
      const targetEl = state.recording.target
      const targetAction = state.recording.hotkeyAction

      // look for a key already using the desired keycode
      const keyAlreadyUsed = state.keymap[utils.hashKeyboardEvent(keyboardEvent)]

      // dont respond to direct meta key presses
      if (metaKeyCodes.indexOf(code) !== -1) {
        return
      }

      if (keyAlreadyUsed) {
        // since a key is already in use
        if (targetAction !== keyAlreadyUsed.action) {
          // key already mapped to this keycode - no change
          // Store.emit(events.alert)
          Store.dispatch({type: 'ALERT'})
          return
        }
      }
      emitSetKey(targetAction, keyboardEvent, targetEl)
    }
  }
}
