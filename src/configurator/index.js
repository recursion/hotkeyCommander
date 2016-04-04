/**
 *  Configurator.js (aka configurator/index.js)
 *
 * This module mounts the configuration view
 * and handles the logic of recording new key strokes
 */
const utils = require('../utils')
const activeKeys = []

// public api
module.exports = (Store) => {
  const {mount} = require('./configurator.view')(Store)
  const hotkeys = Store.getHotkeys()

  return {
    init: init
  }

  // takes an element to load the view into
  // and an element to listen to keystrokes on
  function init (configRenderElement, listenerElement = window) {
    if (!utils.validateEl(configRenderElement)) {
      throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element')
    }

    utils.addListener(listenerElement, 'keydown', onKeyDown)
    utils.addListener(listenerElement, 'keyup', onKeyUp)

    mount(hotkeys, configRenderElement)
  }

  // emit an event when a user is trying to set a key
  function emitSetKey (keyToSet, newKeyCode, targetEl) {
    const event = {element: targetEl, key: keyToSet, newKeyCode}
    Store.emit('recording-set-key', event)
  }

  // key up handler
  function onKeyUp (evt) {
    const recordingState = Store.recording
    if (recordingState.active) {
      const code = evt.keyCode

      // turn this key off
      activeKeys[code] = false
    }
  }

  // key down handler
  function onKeyDown (evt) {
    // console.log(`${evt.keyCode} ${String.fromCharCode(evt.keyCode)}, ${keyCodes[evt.keyCode]}`)

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
