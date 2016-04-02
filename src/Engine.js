/** Hotkey Engine Module
 *
 * This module exports an engine for responding to keystrokes
 * Provide the element to listen on
 */

const utils = require('./utils')
const Store = require('./store')

let listenerElement

// public api
module.exports = {
  init
}

// if no listener element is provided
// then use the window object
// if no keydownHandler is provided, user our own
// keydownhandler can be a function that handles and event...
function init (listenerEl, keydownHandler) {
  if (!utils.validateEl(listenerEl)) {
    throw new Error('Invalid initializer for hotkey engine listener. Must be the window object or valid DOM Element')
  } else {
    listenerElement = listenerEl
  }
  start(keydownHandler || onKeydown)
}

// requires that a listener element has been set
function start (keydownHandler) {
  if (!listenerElement) {
    const msg = 'Must have a listener setListenerElement!'
    console.error(msg)
    throw new Error(msg)
  }
  utils.addListener(listenerElement, 'keydown', keydownHandler || onKeydown)
}

// this is where the magic happens
function onKeydown (evt) {
  const keymap = Store.getKeymap()
  console.log(keymap)
  if (keymap[evt.keyCode]) {
    console.log(keymap[evt.keyCode])
    // call the function related to this object here
  } else {
    console.log('NOT MAPPED')
    console.log(evt.keyCode)
  }
}

