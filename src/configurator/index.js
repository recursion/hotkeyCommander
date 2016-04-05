/**
 *  Configurator.js (aka configurator/index.js)
 *
 * This module mounts the configuration view
 * and handles the logic of recording new key strokes
 */
const utils = require('../utils')

// public api
module.exports = (Store) => {
  const engine = require('./configEventEngine.js')(Store)
  const {mount} = require('./configurator.view')(Store)
  const hotkeys = Store.getHotkeys()

  return {
    init: init
  }

  // takes an element to load the view into
  // and an element to listen to keystrokes on
  function init (configRenderElement, listenerElement = window) {
    if (!utils.validateEl(configRenderElement)) {
      throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element')
    }

    utils.addListener(listenerElement, 'keydown', engine.onKeydown)
    utils.addListener(listenerElement, 'keyup', engine.onKeyup)

    mount(hotkeys, configRenderElement)
  }
}
