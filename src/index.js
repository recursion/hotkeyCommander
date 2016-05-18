const configReducer = require('./reducers')

/**
 *
 *     HotkeyCommander - takes an options object and returns an event emitter
 *
 *  @param {Object} options - {
 *    @param {HotkeyDefinitions} hotkeys - hotkey definitions
 *    @param {Bool} displayToggle - whether or not to display the on/off toggle
 *    @param {Element} configTarget - element to mount configurator
 *    @param {Element} - engineTarget - the element the main keylistener attaches to
 *                                         - defaults to window
 *   @returns {EventEmitter2}
 * }
 */
exports.init = (options) => {
  return new Promise((resolve, reject) => {
    // instantiate a redux store and pass it to our configurator and commander objects
    configReducer(options.hotkeys, options.displayToggle || false)
      .then((result) => {
        const store = result

        // import configurator and commander
        const configurator = require('./configurator')(store, options.displayToggle || false)
        const commander = require('./commander')(store)

        // init configurator
        configurator.init(options.configTarget, options.displayToggle || false)

        // init commander inside the resolved promise which returns the commander event emitter
        resolve(commander(options.engineTarget || window))
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
    configReducer(options.hotkeys, options.displayToggle || false)
      .then((result) => {
        const store = result

        // import the commander object
        const commander = require('./commander')(store)

        // init commander and return his event emitter
        resolve(commander(options.target))
      })
  })
}

exports.Configurator = (options) => {
  return new Promise((resolve, reject) => {
    // instantiate a redux store and pass it to our configurator and commander objects
    configReducer(options.hotkeys, options.displayToggle || false)
      .then((result) => {
        const store = result

        // import configurator
        const configurator = require('./configurator')(store, options.displayToggle || false)

        // init confiturator
        resolve(configurator.init(options.target))
      })
  })
}
