// this module:
// renders hotkey configuration
// handles recording new hotkeys
const utils = require('./utils')

// public api
module.exports = (Store) => {
  const {mount} = require('./configurator.view')(Store)

  return {
    init: init
  }

  // load configuration templates
  // takes an element to load the template to
  function init (containerEl, listenerEl) {
    if (!utils.validateEl(containerEl)) {
      throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element')
    }
    if (!utils.validateEl(listenerEl)) {
      throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element or the window object.')
    }

    utils.addListener(listenerEl || window, 'keypress', onKeyPress)

    mount(Store.getDictionary(), containerEl)
  }

  function emitSetKey (keyToSet, newKeyCode, targetEl) {
    const event = {element: targetEl, hotkey: keyToSet, newKeyCode}
    Store.emit('recording-set-key', event)
  }

  function onKeyPress (evt) {
    const recordingState = Store.recording
    // we only do things here if key recording has been activated
    if (recordingState.active) {
      const targetKey = recordingState.key
      const targetEl = recordingState.element
      const keyCode = evt.keyCode
      const mappedKeyUsingDesiredKeyCode = Store.getKeymap()[keyCode]

      // validate that the key is not already in use.
      if (mappedKeyUsingDesiredKeyCode) {
        if (mappedKeyUsingDesiredKeyCode.name === recordingState.key) {
          // key already mapped to this keycode - no change
          emitSetKey(targetKey, evt.keyCode, targetEl)
        } else {
          // alert the user
          // cant set key to a code already in use
          console.log('User - this key is in use by another hotkey - how would you like to proceed?')
        }
      } else {
        // this key was not set and should be ok to use
        emitSetKey(targetKey, evt.keyCode, targetEl)
      }
    }
  }
}
