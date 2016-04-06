/** Hotkey Engine Module
 *
 * This module exports an engine for responding to keystrokes
 * Provide the element to listen on
 */

const utils = require('../common/utils')

// public api
module.exports = (Store) => {
  return {
    init
  }

  function init (listenerEl) {
    if (!utils.validateEl(listenerEl)) {
      throw new Error('Invalid initializer for hotkey engine listener. Must be the window object or valid DOM Element')
    }
    start(listenerEl)
  }

  // requires a listener element
  function start (listenerElement) {
    if (!listenerElement) {
      const msg = 'The keyboard event engine requires an element to listen for keyboard events on. This can be window, or some other valid HTML element.'
      console.error(msg)
      throw new Error(msg)
    }
    utils.addListener(listenerElement, 'keydown', onKeyPress)
  }

  // Handle key press events
  function onKeyPress (evt) {
    const keymap = Store.getKeymap()
    const lookup = utils.hashKeyboardEvent(evt)
    const target = keymap[lookup]
    if (target) {
      // the user has entered the correct key combination
      // for this hotkey
      // call the function related to this object here
      // convert target name to camelcase string
      // call commanderObject[targetNameAsCamelCaseString]()
      if (!Store.recording.active) {
        console.log('You activated an in use hotkey!')
      }
    } else {
      // console.log('Not mapped: ', evt, evt.keyCode)
    }
  }
}
