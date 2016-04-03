const utils = require('./utils')
const store = require('./store')
let containerElement = null

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
             RENDER METHODS
/** ***********************************************/

// this is really the only piece of data that gets updated
function renderButtonText (el, hotkeyObject) {
  el.innerText = String.fromCharCode(hotkeyObject.keyCode)
}

function mount (dictionary, targetEl, clear = false) {
  const template = getTemplate()

  // TODO: not alter this outside variable?
  if (clear) {
    containerElement.innerHTML = ''
  }

  for (let key in dictionary) {
    const clone = document.importNode(template.content, true)

    // remove innards of template
    clone.querySelector(configBlockSelector).innerHTML = `
      <h1 class="hotkey-config-category">
        ${formatCategory(key)}
      </h1>
    `
    targetEl.appendChild(clone)

    // render the value property as keys
    renderKeys(dictionary[key], targetEl)
  }
}

// render the hotkeys to their dom element
// clears the element first if clearElement is true
function renderKeys (hotkeys, el) {
  const template = getTemplate()

  // load hotkeys into the template
  // and write it to the page.
  for (let key in hotkeys) {
    const clone = document.importNode(template.content, true)
    renderKeyBlock(clone, key, hotkeys[key])
    el.appendChild(clone)
  }
}

function renderKeyBlock (el, key, hotkeyObject) {
  buildButton(el, key, hotkeyObject)
  el.querySelector(descriptionLabelSelector).innerText = utils.stripUnderscores(key)
}

function buildButton (el, key, hotkeyObject) {
  const target = el.querySelector(keyLabelSelector)

  target.addEventListener('click', function (evt) {
    (store.recording.active) ? deactivateRecordingState(this) : activateRecordingState(this, key)
  })
  renderButtonText(target, hotkeyObject)
}

// Render helpers

function getTemplate () {
  const templates = document.getElementById('hotkeyTemplate').import
  const template = templates.getElementById('hotkey-config-template')
  return template
}
// removes CATEGORY_ from the beginning of a string
// replaces underscores with spaces
function formatCategory (cat) {
  cat = cat.replace('CATEGORY_', '')
  cat = utils.stripUnderscores(cat)
  return cat
}
function deactivateRecordingState (el, key) {
  store.recording.active = false
  // re-render just the element displaying this piece of data
  renderButtonText(el, key)
  swapStyles(el, 'recorder-active', 'recorder-idle')
}
function activateRecordingState (el, key) {
  // the key we are recording
  // and the target element
  store.recording.key = key
  store.recording.target = el
  swapStyles(el, 'recorder-idle', 'recorder-active')
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
