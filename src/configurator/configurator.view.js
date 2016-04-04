/**
 * Configurator.view.js
 * this module is responsible for creating/mounting
 * and rendering the hotkey configuration view
 */
const utils = require('../utils')

// css selectors used for populating templates
// and applying/removing styles
const configBlockSelector = '.hotkey-container-block'
const keyLabelSelector = '.hotkey-block.key-label'
const descriptionLabelSelector = '.hotkey-block.key-description'
const keyCodes = require('../keyCodes')

module.exports = (Store) => {
  // set a listener for stop events generated outside of the view
  Store.on('recording-stopped', onStopHandler)

  // public api
  return {
    mount
  }

  // event handler / emitter functions

  function createEvent (el, key) {
    return {key: key, element: el}
  }

  function emitStopRecording (el, key) {
    Store.emit('recording-stop', createEvent(el, key))
    onStopHandler(createEvent(el, key))
  }

  function emitStartRecording (el, key) {
    swapStyles(el, 'recorder-idle', 'recorder-active')
    Store.emit('recording-start', createEvent(el, key))
  }

  function onStopHandler (event) {
    const {element, key} = event
    swapStyles(element, 'recorder-active', 'recorder-idle')
    render(element, key.keyCode)
  }

  /** ***********************************************
                     MOUNT
      Takes in a dictionary of hotkeys/categories and an element
      and mounts the dictionary up into a
      hotkey template inside of the passed in element
  /** ***********************************************/
  function mount (hotkeysObject, containerEl) {
    const templates = document.getElementById('hotkeyTemplate').import
    const template = templates.getElementById('hotkey-config-template')

    for (let category in hotkeysObject) {
      const categoryDiv = document.importNode(template.content, true)
      const hotkeys = hotkeysObject[category]

      // remove innards of template
      categoryDiv.querySelector(configBlockSelector).innerHTML = `
        <h1 class="hotkey-config-category">
          ${formatCategory(category)}
        </h1>
      `
      containerEl.appendChild(categoryDiv)

      // load hotkeys into the template
      // and render it
      for (let hotkey in hotkeys) {
        const hotkeyConfigElement = document.importNode(template.content, true)
        const button = hotkeyConfigElement.querySelector(keyLabelSelector)
        const targetKey = hotkeys[hotkey]

        // hotkey set button click handler
        button.addEventListener('click', function (evt) {
          // if we are recording a key
          if (Store.recording.active) {
            // if this element is for the hotkey we are currently recording
            if (Store.recording.element === this) {
              // stop recording
              emitStopRecording(button, targetKey)
            }
          } else {
            // start recording!
            emitStartRecording(button, targetKey)
          }
        })
        render(button, targetKey.keyCode)
        hotkeyConfigElement.querySelector(descriptionLabelSelector).innerText = utils.stripUnderscores(hotkey)
        containerEl.appendChild(hotkeyConfigElement)
      }
    }
  }
  /** ***********************************************
                   RENDER
      Handles the rendering of the only elements that ever get updated
      - those that display a key character
        that a hotkey is using.
  /** ***********************************************/
  // this is really the only piece of data that gets updated
  function render (el, code) {
    el.innerText = keyCodes[code]
  }

  // Render helpers
  // removes CATEGORY_ from the beginning of a string
  // replaces underscores with spaces
  function formatCategory (cat) {
    cat = cat.replace('CATEGORY_', '')
    cat = utils.stripUnderscores(cat)
    return cat
  }

  // takes an element, and two string
  // it will remove the first string from element.className
  // and add the second string to element.className
  function swapStyles (element, removeClassName, addClassName) {
    // remove the idle state
    const classNames = element.className.split(' ')
    const removeClassIndex = classNames.indexOf(removeClassName)
    classNames.splice(removeClassIndex, 1)

    // turn the array back into a string
    element.className = classNames.join(' ')

    // add the new classname to it
    element.className += ' ' + addClassName
  }
}
