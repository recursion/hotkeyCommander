/** Hotkey Engine Module
 *
 * This module exports an engine for responding to keystrokes
 * Provide the element to listen on
 */

const utils = require('./utils')

let listenerElement

// public api
module.exports = (Store) => {
  return {
    init
  }

  function init (listenerEl) {
    if (!utils.validateEl(listenerEl)) {
      throw new Error('Invalid initializer for hotkey engine listener. Must be the window object or valid DOM Element')
    } else {
      listenerElement = listenerEl
    }
    start(onKeyPress)
  }

  // requires that a listener element has been set
  function start (keydownHandler) {
    if (!listenerElement) {
      const msg = 'Must have a listener setListenerElement!'
      console.error(msg)
      throw new Error(msg)
    }
    utils.addListener(listenerElement, 'keypress', keydownHandler)
  }

  // Handle key press events
  function onKeyPress (evt) {
    const keymap = Store.getKeymap()
    const keycode = evt.keyCode
    const target = keymap[keycode]
    if (target) {
      // console.log(String.fromCharCode(evt.keyCode), evt, evt.keyCode, keymap[evt.keyCode])
      // call the function related to this object here
    } else {
      // console.log('Not mapped: ', evt, evt.keyCode)
    }
  }
}
