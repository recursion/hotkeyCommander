/**
 *  Configurator.js (aka configurator/index.js)
 *
 * This module mounts the configuration view
 * and handles the logic of recording new key strokes
 */
const utils = require('../utils')

// public api
module.exports = (Store) => {
  const {mount} = require('./configurator.view')(Store)

  return {
    init: init
  }

  // takes an element to load the view into
  // and an element to listen to keystrokes on
  function init (configRenderElement, listenerElement = window) {
    if (!utils.validateEl(configRenderElement)) {
      throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element')
    }

    utils.addListener(listenerElement, 'keypress', onKeyPress)

    mount(Store.getDictionary(), configRenderElement)
  }

  // emit an event when a user is trying to set a key
  function emitSetKey (keyToSet, newKeyCode, targetEl) {
    const event = {element: targetEl, keyName: keyToSet, newKeyCode}
    Store.emit('recording-set-key', event)
  }

  // key press handler
  function onKeyPress (evt) {
    const recordingState = Store.recording
    // we only do things here if key recording has been activated
    if (recordingState.active) {
      const keyCode = evt.keyCode
      const targetKeyName = recordingState.keyName
      const targetEl = recordingState.element

      // look for a key already using the desired keycode
      const keyAlreadyUsed = Store.getKeymap()[keyCode]

      if (keyAlreadyUsed) {
        // since a key is already in use
        if (targetKeyName === keyAlreadyUsed.name) {
          // key already mapped to this keycode - no change
          emitSetKey(targetKeyName, keyCode, targetEl)
        } else {
          // alert the user
          // cant set key to a code already in use
          console.log('User - this key is in use by another hotkey - how would you like to proceed?')
        }
      } else {
        // this key was not set and should be ok to use
        emitSetKey(targetKeyName, keyCode, targetEl)
      }
    }
  }
}
