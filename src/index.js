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
exports.init = (options) => {
  return new Promise((resolve, reject) => {
    // instantiate a redux store and pass it to our configurator and commander objects
    configReducer(options.hotkeys)
      .then((result) => {
        const store = result

        // import configurator and commander
        const configurator = require('./configurator')(store)
        const commander = require('./commander')(store)

        // init configurator
        configurator.init(options.target)

        // init commander and return the commander event emitter
        return resolve(commander(options.engineListenerEl || window))
      })
  })
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
  return new Promise((resolve, reject) => {
    // instantiate a redux store and pass it to our configurator and commander objects
    configReducer(options.hotkeys)
      .then((result) => {
        const store = result

        // import the commander object
        const commander = require('./commander')(store)

        // init commander and return his event emitter
        resolve(commander(options.listenerEl))
      })
  })
}

exports.Configurator = (options) => {
  return new Promise((resolve, reject) => {
    // instantiate a redux store and pass it to our configurator and commander objects
    configReducer(options.hotkeys)
      .then((result) => {
        const store = result

        // import configurator
        const configurator = require('./configurator')(store)

        // init confiturator
        resolve(configurator.init(options.targetEl))
      })
  })
}
