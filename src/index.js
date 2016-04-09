const configReducer = require('./reducers')

/**
 *
 *     HotkeyCommander - takes an options object and returns an event emitter
 *
 * @params {Object} options - {
 *   @params {Element} target - element to mount configurator
 *   @params {HotkeyDefinitionsObject} hotkeys - hotkey definitions
 *   @param {Element} - engineListenerEl - the element the main keylistener attaches to
                                         - defaults to window
 *   @returns {EventEmitter2}
 * }
 */
module.exports = (options) => {
  // instantiate a redux store and pass it to our configurator and commander objects
  const store = configReducer(options.hotkeys)

  // import configurator and commander
  const configurator = require('./configurator')(store)
  const commander = require('./commander')(store)

  // init configurator
  configurator.init(options.target)

  // init commander and return the commander event emitter
  return commander(options.engineListenerEl || window)
}

/**
 *      DUAL CONTEXT API
 *
 *  use this api to create commander in
 *  one context and configurator in another
 *
 *  When using this method, each component will have
 *  its own store and so - commanders store
 *  will generate a new keymap when getting
 *  messages from chrome.storage.onChanged
 */
exports.Commander = (options) => {
  // create the redux store
  const store = configReducer(options.hotkeys)

  // import the commander object
  const commander = require('./commander')(store)

  // init commander and return his event emitter
  return commander(options.hotkeys, options.listenerEl)
}

exports.Configurator = (options) => {
  // create the redux store
  const store = configReducer(options.hotkeys)

  // import configurator
  const configurator = require('./configurator')(store)

  // init confiturator
  configurator.init(options.hotkeys, options.targetEl)
}

