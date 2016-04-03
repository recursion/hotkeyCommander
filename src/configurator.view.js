const utils = require('./utils')
const store = require('./store')

// css selectors used for populating templates
// and applying/removing styles
const configBlockSelector = '.hotkey-container-block'
const keyLabelSelector = '.hotkey-block.key-label'
const descriptionLabelSelector = '.hotkey-block.key-description'

module.exports = {
  mount,
  deactivateRecordingState
}

/** ***********************************************
             RECORDING STATE MANAGEMENT
/** ***********************************************/
function deactivateRecordingState (el, key) {
  store.recording.active = false
  swapStyles(el, 'recorder-active', 'recorder-idle')
  render(el, key)
}

function activateRecordingState (el, key) {
  store.recording.active = true
  store.recording.key = key
  store.recording.target = el
  swapStyles(el, 'recorder-idle', 'recorder-active')
}

/** ***********************************************
                   MOUNT
    Takes in a dictionary of hotkeys/categories and an element
    and mounts the dictionary up into a
    hotkey template inside of the passed in element
/** ***********************************************/
function mount (dictionary, targetEl) {
  const templates = document.getElementById('hotkeyTemplate').import
  const template = templates.getElementById('hotkey-config-template')

  for (let key in dictionary) {
    const clone = document.importNode(template.content, true)

    // remove innards of template
    clone.querySelector(configBlockSelector).innerHTML = `
      <h1 class="hotkey-config-category">
        ${formatCategory(key)}
      </h1>
    `
    targetEl.appendChild(clone)

    // load hotkeys into the template
    // and render it
    for (let hotkey in dictionary[key]) {
      const clone = document.importNode(template.content, true)
      const target = clone.querySelector(keyLabelSelector)

      target.addEventListener('click', function (evt) {
        if (store.recording.active) {
          deactivateRecordingState(target, hotkey)
        } else {
          activateRecordingState(target, hotkey)
        }
      })
      render(target, hotkey)
      clone.querySelector(descriptionLabelSelector).innerText = utils.stripUnderscores(hotkey)
      targetEl.appendChild(clone)
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
function render (el, key) {
  const hotkey = store.getKeys()[key]
  el.innerText = String.fromCharCode(hotkey.keyCode)
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
