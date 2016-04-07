const defaultHotkeys = require('../hotkey.defaults')
const {createStore} = require('redux')
const configReducer = require('./configurator/reducers')

// these only get initialized during a call to init
let configurator
let commander

// two ways to start the module:
//   1) call init with the proper parameters (this assumes 1 context)
//   2) initialized engine and configurator seperately
/*
{
  configListener: {HTMLElement},
  engineListener: {HTMLElement},
  commander: {CommanderObject},
  hotkeys: {HotkeyDefinitionsObject},
}
*/

// if only 1 element is passed in,
// we can assume that its ok to
// do everything in one context?
// returns an event emitter than can be used to respond to keyboard events
module.exports = (configRootElement = window, engineListenerEl = window, hotkeyDefinitions) => {
  // instantiate a store and pass it to our configurator and commander objects
  const store = createStore(configReducer)
  configurator = require('./configurator')(store)
  commander = require('./commander')(store)

  configurator.init(configRootElement, hotkeyDefinitions)
  return commander(engineListenerEl)
}

/* TODO: When commander and configurator are running in seperate contexts
    we will assume its a chrome plugin, and allow each component to
    use its own store object, which will in turn be using chrome.storage.sync
    and its event emitter to transmit changes of the keymap.
/*

{
  engineListener: {HTMLElement},
  commander: {CommanderObject},
  hotkeys: {HotkeyDefinitionsObject},
  store: {StoreObject}
}
*/
exports.Commander = (listenerEl, hotkeys = defaultHotkeys) => {
  const store = require('./common/store')(hotkeys)
  commander = require('./commander')(store)
  return commander(listenerEl)
}

/*
{
  configListener: {HTMLElement},
  commander: {CommanderObject},
  hotkeys: {HotkeyDefinitionsObject},
  store: {StoreObject}
}
*/
exports.Configurator = (targetEl, hotkeys = defaultHotkeys) => {
  const store = require('./common/store')(hotkeys)
  configurator = require('./configurator')(store)
  configurator.init(targetEl)
}
