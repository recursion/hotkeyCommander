const defaultHotkeys = require('../hotkey.defaults')

// these only get initialized during a call to init
let configurator
let commander

// two ways to start the module:
//   1) call init with the proper parameters (this assumes 1 context)
//   2) initialized engine and configurator seperately

module.exports = {
  init,
  startCommander,
  startConfigurator
}

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
function init (configRootElement = window, engineListenerEl = window, hotkeyDefinitions, commanderObject = {}) {
  // instantiate a store and pass it to our configurator and commander objects
  const store = require('./common/store')(hotkeyDefinitions || defaultHotkeys)
  configurator = require('./configurator')(store)
  commander = require('./commander')(store)

  configurator.init(configRootElement, hotkeyDefinitions, store)
  commander.init(engineListenerEl, hotkeyDefinitions, commanderObject, store)
}

/*
{
  engineListener: {HTMLElement},
  commander: {CommanderObject},
  hotkeys: {HotkeyDefinitionsObject},
  store: {StoreObject}
}
*/
function startCommander (listenerEl, hotkeys, commander, store) {
  store = store || require('./common/store')(hotkeys || defaultHotkeys)
  commander = require('./commander')(store)
  commander.init(listenerEl, hotkeys, commander)
}

/*
{
  configListener: {HTMLElement},
  commander: {CommanderObject},
  hotkeys: {HotkeyDefinitionsObject},
  store: {StoreObject}
}
*/
function startConfigurator (targetEl, hotkeys, store) {
  store = store || require('./common/store')(hotkeys || defaultHotkeys)
  configurator = require('./configurator')(store)
  configurator.init(targetEl)
}
