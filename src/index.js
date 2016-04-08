const defaultHotkeys = require('../hotkey.defaults')
const configReducer = require('./reducers')

// these only get initialized during a call to init
let configurator
let commander

// if only 1 element is passed in,
// we can assume that its ok to
// do everything in one context?
// returns an event emitter than can be used to respond to keyboard events
module.exports = (configRootElement = window, engineListenerEl = window, hotkeyDefinitions) => {
  // instantiate a store and pass it to our configurator and commander objects
  const store = configReducer()
  configurator = require('./configurator')(store)
  commander = require('./commander')(store)

  configurator.init(configRootElement, hotkeyDefinitions)
  return commander(engineListenerEl)
}

/* TODO:
    When commander and configurator are running in seperate contexts
    we will assume its a chrome plugin, and allow each component to
    use its own store object, which will in turn be using chrome.storage.sync
    and its event emitter to transmit changes of the keymap.
*/

exports.Commander = (listenerEl, hotkeys = defaultHotkeys) => {
  const store = configReducer()
  commander = require('./commander')(store)
  return commander(listenerEl)
}

exports.Configurator = (targetEl, hotkeys = defaultHotkeys) => {
  const store = configReducer()
  configurator = require('./configurator')(store)
  configurator.init(targetEl)
}
