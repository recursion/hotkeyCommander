const defaultHotkeys = require('../hotkey.defaults')

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
  const store = require('./common/store')(hotkeyDefinitions || defaultHotkeys)
  configurator = require('./configurator')(store)
  commander = require('./commander')(store)

  configurator.init(configRootElement, hotkeyDefinitions)
  return commander.create(engineListenerEl)
}

/*
{
  engineListener: {HTMLElement},
  commander: {CommanderObject},
  hotkeys: {HotkeyDefinitionsObject},
  store: {StoreObject}
}
*/
exports.createCommander = (listenerEl, hotkeys = defaultHotkeys, commanderObject) => {
  const store = require('./common/store')(hotkeys)
  commander = require('./commander')(store)
  return commander.start(listenerEl, commanderObject)
}

/*
{
  configListener: {HTMLElement},
  commander: {CommanderObject},
  hotkeys: {HotkeyDefinitionsObject},
  store: {StoreObject}
}
*/
exports.startConfigurator = (targetEl, hotkeys = defaultHotkeys) => {
  const store = require('./common/store')(hotkeys)
  configurator = require('./configurator')(store)
  configurator.init(targetEl)
}
