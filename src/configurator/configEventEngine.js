const utils = require('../utils')

// an array of keycodes for ctrl, shift, alt, and the meta key (windows/mac key)
// these can only be used to modify other keys - not as standalone hotkeys
const metaKeyCodes = [17, 16, 18, 91]

module.exports = (Store) => {
  return {
    // incase we ever want to use this....
    onKeypress: (evt) => {

    },
    onKeyup: (evt) => {

    },
    onKeydown: onKeyboardEvent
  }

  // emit an event when a user is trying to set a key
  function emitSetKey (keyToSet, keyboardEvent, targetEl) {
    const event = {element: targetEl, key: keyToSet, keyboardEvent}
    Store.emit('recording-set-key', event)
  }

  // this is a generic keyboard event handler
  // and could be used equally for up/down or press events
  function onKeyboardEvent (keyboardEvent) {
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
    const recordingState = Store.recording
    if (recordingState.active) {
      const code = keyboardEvent.keyCode
      const targetEl = recordingState.element
      const targetKey = recordingState.key

      // look for a key already using the desired keycode
      const keyAlreadyUsed = Store.getKeymap()[utils.hashKeyboardEvent(keyboardEvent)]

      // dont respond to direct meta key presses
      if (metaKeyCodes.indexOf(code) !== -1) {
        return
      }

      if (keyAlreadyUsed) {
        // since a key is already in use
        if (targetKey.name === keyAlreadyUsed.name) {
          // key already mapped to this keycode - no change
          emitSetKey(targetKey, keyboardEvent, targetEl)
        } else {
          // alert the user
          // cant set key to a code already in use
          Store.emit('key-overwrite-alert')
        }
      } else {
        // this key was not set and should be ok to use
        emitSetKey(targetKey, keyboardEvent, targetEl)
      }
    }
  }
}
