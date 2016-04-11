/**
 *  Configurator.js (aka configurator/index.js)
 *
 * This module mounts the configuration view
 * and handles the logic of recording new key strokes
 */
const utils = require('../utils')
const {setKey, alertOn} = require('../actions')

// an array of keycodes for ctrl, shift, alt, and the meta key (windows/mac key)
// these will only be able to be used to modify other keys - not as standalone hotkeys
const metaKeyCodes = [17, 16, 18, 91]

// public api
module.exports = (Store) => {
  const engine = createKeyboardEventHandler(Store)
  const {mount} = require('./configurator.view')(Store)

  // takes an element to load the view into
  // and an element to listen to keystrokes on
  const init = (rootElement) => {
    if (!utils.isHTMLElement(rootElement)) {
      throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element')
    }

    rootElement.tabIndex = 0
    utils.addListener(rootElement, 'keydown', engine.onKeydown)

    mount(rootElement)
  }
  return {
    init: init
  }
}

// returns an object with an onKeydown method on it
function createKeyboardEventHandler (Store) {
  // this is a generic keyboard event handler
  // and could be used equally for up/down or press events
  const onKeyboardEvent = (keyboardEvent) => {
    const state = Store.getState()
    // we only do things here if key recording has been activated
    if (state.recording && !state.alert) {
      keyboardEvent.stopPropagation()
      const code = keyboardEvent.keyCode
      const targetAction = state.recording

      // look for a key already using the desired keycode
      const keyAlreadyUsed = state.keymap[utils.hashKeyboardEvent(keyboardEvent)]

      // dont respond to direct meta key presses
      if (metaKeyCodes.indexOf(code) !== -1) {
        return
      }

      if (keyAlreadyUsed) {
        // since a key is already in use
        if (targetAction !== keyAlreadyUsed) {
          Store.dispatch(alertOn())
          return
        }
      }
      Store.dispatch(setKey(targetAction, keyboardEvent))
    }
  }
  return {
    onKeydown: onKeyboardEvent
  }
}
