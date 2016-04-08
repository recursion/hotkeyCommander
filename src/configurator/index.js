/**
 *  Configurator.js (aka configurator/index.js)
 *
 * This module mounts the configuration view
 * and handles the logic of recording new key strokes
 */
const utils = require('../common/utils')

// public api
module.exports = (Store) => {
  const engine = require('./configEventEngine.js')(Store)
  const {mount} = require('./configurator.view')(Store)

  return {
    init: init
  }

  // takes an element to load the view into
  // and an element to listen to keystrokes on
  function init (configRenderElement) {
    if (!utils.isHTMLElement(configRenderElement)) {
      throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element')
    }

    configRenderElement.tabIndex = 0
    utils.addListener(configRenderElement, 'keydown', engine.onKeydown)
    utils.addListener(configRenderElement, 'keyup', engine.onKeyup)

    mount(configRenderElement)
  }
}
