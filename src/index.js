const configReducer = require('./reducers')

// these only get initialized during a call to init
let configurator
let commander

// if only 1 element is passed in,
// we can assume that its ok to
// do everything in one context?
// returns an event emitter than can be used to respond to keyboard events
/**
 * @params {Object} options - {
 *   @params {Element} target - element to mount configurator
 *   @params {HotkeyDefinitionsObject} hotkeys - hotkey definitions
 *   @param {Element} - engineListenerEl - defaults to window
 *   @returns {EventEmitter2}
 * }
 */
module.exports = (options) => {
  // configRootElement = window, engineListenerEl = window) => {
  // instantiate a store and pass it to our configurator and commander objects
  const store = configReducer(options.hotkeys)
  configurator = require('./configurator')(store)
  commander = require('./commander')(store)

  configurator.init(options.target)
  return commander(options.engineListenerEl || window)
}

/* TODO:
    When commander and configurator are running in seperate contexts
    we will assume its a chrome plugin, and allow each component to
    use its own store object, which will in turn be using chrome.storage.sync
    and its event emitter to transmit changes of the keymap.
*/

exports.Commander = (options) => {
  const store = configReducer(options.hotkeys)
  commander = require('./commander')(store)
  return commander(options.hotkeys, options.listenerEl)
}

exports.Configurator = (options) => {
  const store = configReducer(options.hotkeys)
  configurator = require('./configurator')(store)
  configurator.init(options.hotkeys, options.targetEl)
}
