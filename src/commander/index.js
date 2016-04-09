/** HotkeyCommander Engine Module
 *
 * This module exports an engine for responding to keystrokes
 * Provide the element to listen on
 */

const utils = require('../utils')

// the commander returns an event emitter...
const EventEmitter2 = require('eventemitter2')
// this is it
const emitter = new EventEmitter2()

// public api
module.exports = (Store) => {
  // return our event emitter
  const commander = (listenerEl) => {
    if (!utils.isHTMLElement(listenerEl)) {
      throw new Error('Invalid initializer for hotkey engine listener. Must be the window object or valid DOM Element')
    }
    utils.addListener(listenerEl, 'keydown', keyboardEventHandler)
    return emitter
  }

  const keyboardEventHandler = (evt) => {
    const state = Store.getState()
    const key = utils.hashKeyboardEvent(evt)
    const target = state.keymap[key]

    // if the keymap has this keycombo stored in it
    if (target) {
      // if we are not recording
      if (!state.recording) {
        // emit the event
        // TODO: we could allow a configuration option
        //    which gives the developer the choice of
        //    getting the event emitter, or just getting a redux store?
        //    this means the reducer would have to be exposed as well?
        emitter.emit(target)
      }
    }
  }

  return commander
}
