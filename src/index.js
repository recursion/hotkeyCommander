const store = require('./common/store')()
const configurator = require('./configurator')(store)
const commander = require('./commander')(store)

// two ways to start the module:
//   1) call init with the proper parameters (this assumes 1 context)
//   2) initialized engine and configurator seperately

module.exports = {
  init,
  startCommander,
  startConfigurator
}

// if only 1 element is passed in,
// we can assume that its ok to
// do everything in one context?
function init (configRootElement = window, engineListenerEl = window) {
  configurator.init(configRootElement)
  commander.init(engineListenerEl)
}

function startCommander (listenerEl) {
  commander.init(listenerEl)
}

function startConfigurator (targetEl) {
  configurator.init(targetEl)
}
