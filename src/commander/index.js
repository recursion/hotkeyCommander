/** Hotkey Engine Module
 *
 * This module exports an engine for responding to keystrokes
 * Provide the element to listen on
 */

const utils = require('../common/utils')

const EventEmitter2 = require('eventemitter2')
const emitter = new EventEmitter2()

// public api
module.exports = (Store) => {
  return {
    create
  }

  // return our event emitter
  function create (listenerEl) {
    if (!utils.validateEl(listenerEl)) {
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
        emitter.emit(target.name)
        /*
        This is what we were doing before inverting the command object
        // convert keymap name to camelCase
        const commandName = utils.snakeCaseToCamelCase(target.name)

        // invoke that command on the commander object
        const command = commanderObject[commandName]
        if (command) {
          // what should we pass it here, if anything?
          // only thing we could really pass is the keyboard event itself..
          // but we shouldnt need it...
          command()
        }
        */
      }
    }
  }
}
