const configurator = require('./configurator')
const engine = require('./engine')

let engineSet = false
let configuratorSet = false

// two ways to start the module:
//   1) call init with the proper parameters (this assumes 1 context)
//   2) initialized engine and configurator seperately

// if only 1 element is passed in,
// we can assume that its ok to
// do everything in one context?
exports.init = (configContainerEl, configListener, engineListener) => {
  configurator.init(configContainerEl, configListener || window)
  engine.init(engineListener || window)
}

exports.setEngine = (listenerEl) => {
  engine.init(listenerEl)
  engineSet = true
}

exports.setConfigurator = (containerEl, listenerEl) => {
  configurator.init(containerEl, listenerEl)
  configuratorSet = true
}

exports.start = () => {
  if (!engineSet || !configuratorSet) {
    console.error('Must set engine and configurator with proper containers and listeners')
  } else {
    // do the damn thing
  }
}
