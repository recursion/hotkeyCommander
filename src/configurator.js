// this module:
// renders hotkey configuration
// handles recording new hotkeys
const utils = require('./utils')
const Store = require('./store')
const {mount, deactivateRecordingState} = require('./configurator.view')

// public api
module.exports = {
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

function onKeyPress (evt) {
  // already recording - this is the new key
  if (Store.recording.active) {
    // TODO: validate that the key is not already in use.

    Store.set(Store.recording.key, evt.keyCode)
    deactivateRecordingState(Store.recording.target, Store.recording.key)
  }
}
