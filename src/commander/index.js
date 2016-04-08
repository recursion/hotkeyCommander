/** HotkeyCommander Engine Module
 *
 * This module exports an engine for responding to keystrokes
 * Provide the element to listen on
 */

const utils = require('../common/utils')

const EventEmitter2 = require('eventemitter2')
const emitter = new EventEmitter2()

// public api
module.exports = (Store) => {
  return commander

  // return our event emitter
  function commander (listenerEl) {
    if (!utils.isHTMLElement(listenerEl)) {
      throw new Error('Invalid initializer for hotkey engine listener. Must be the window object or valid DOM Element')
    }

    utils.addListener(listenerEl, 'keydown', onKeyboardEvent)
    return emitter
  }

  // Handle key press events
  // right now we are having hte user pass in a 'command object'
  // another option would be to just have the user pass in an event emitter
  // that they want to respond to.......
  function onKeyboardEvent (evt) {
    const state = Store.getState()
    const keymap = state.keymap
    const lookup = utils.hashKeyboardEvent(evt)
    const target = keymap[lookup]

    if (target) {
      // the user has entered the correct key combination
      // for this hotkey
      // call the function related to this object here
      // convert target name to camelcase string
      // call commanderObject[targetNameAsCamelCaseString]()
      if (!state.recording) {
        emitter.emit(target)
      }
    }
  }
}
