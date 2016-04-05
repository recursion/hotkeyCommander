const keyCodes = require('../keycodeMap')
const activeKeys = []

module.exports = (Store) => {
  return {
    // incase we ever want to use this....
    onKeypress: (evt) => {

    },
    onKeyup: (evt) => {
      const recordingState = Store.recording
      if (recordingState.active) {
        const code = evt.keyCode

        // turn this key off
        activeKeys[code] = false
      }
    },
    onKeydown: (evt) => {
      console.log(`${evt.keyCode} ${String.fromCharCode(evt.keyCode)}, ${keyCodes[evt.keyCode]}`)
      // we only do things here if key recording has been activated
      const recordingState = Store.recording
      if (recordingState.active) {
        const code = evt.keyCode
        const targetEl = recordingState.element
        const targetKey = recordingState.key

        // turn this key on
        activeKeys[code] = true

        // look for a key already using the desired keycode
        const keyAlreadyUsed = Store.getKeymap()[code]

        if (keyAlreadyUsed) {
          // since a key is already in use
          if (targetKey.name === keyAlreadyUsed.name) {
            // key already mapped to this keycode - no change
            emitSetKey(targetKey, code, targetEl)
          } else {
            // alert the user
            // cant set key to a code already in use
            Store.emit('key-overwrite-alert')
          }
        } else {
          // this key was not set and should be ok to use
          emitSetKey(targetKey, code, targetEl)
        }
      }
    }
  }
  // emit an event when a user is trying to set a key
  function emitSetKey (keyToSet, newKeyCode, targetEl) {
    const event = {element: targetEl, key: keyToSet, newKeyCode}
    Store.emit('recording-set-key', event)
  }
}
