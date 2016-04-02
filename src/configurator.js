// this module:
// renders hotkey configuration
// handles recording new hotkeys
const utils = require('./utils')
const Store = require('./store')

let recording = false
let containerElement = null

// css selectors used for populating templates
// and applying/removing styles
const recordingStyle = 'recording'
const setButtonSelector = '.set-key-button'
const labelSelector = '.hotkey-config.key-setting'
const functionLabelSelector = '.hotkey-config.key-function'

// public api
module.exports = {
  init: init
}

// load configuration templates
// takes an element to load the template to
function init (containerEl, listenerEl) {
  if (!utils.validateEl(containerEl)) {
    throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element')
  }
  if (!utils.validateEl(listenerEl)) {
    throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element or the window object.')
  }

  containerElement = containerEl

  utils.addListener(listenerEl || window, 'keydown', onKeydown)

  render(Store.getDictionary(), containerEl)
}

function getTemplate () {
  const templates = document.getElementById('hotkeyTemplate').import
  const template = templates.getElementById('hotkey-setting')
  return template
}

function render (dictionary, targetEl, clear = false) {
  const template = getTemplate()

  // TODO: not alter this outside variable?
  if (clear) {
    containerElement.innerHTML = ''
  }

  for (let key in dictionary) {
    const clone = document.importNode(template.content, true)

    // remove innards of template
    clone.querySelector('.hotkey-config-block').innerHTML = `
      <h1 class="hotkey-config-category">
        ${formatCategory(key)}
      </h1>
    `
    targetEl.appendChild(clone)

    // render the value property as keys
    renderKeys(dictionary[key], targetEl)
  }
}

function formatCategory (cat) {
  cat = cat.replace('CATEGORY_', '')
  cat = utils.stripUnderscores(cat)
  return cat
}

// render the hotkeys to their dom element
// clears the element first if clearElement is true
function renderKeys (hotkeys, el) {
  const template = getTemplate()

  // load hotkeys into the template
  // and write it to the page.
  for (let key in hotkeys) {
    const clone = document.importNode(template.content, true)

    clone.querySelector(setButtonSelector)
      .addEventListener('click', function (evt) {
        if (!recording) {
          // add highlighting to bg for this element
          var target = this.parentElement.children
          for (let i = 0; i < target.length; i++) {
            const child = target[i]
            if (child.className.indexOf('key-setting') !== -1) {
              child.className += ' ' + recordingStyle
            }
          }

          // set recording to the key we are recording
          recording = key
        }
      })

    clone.querySelector(functionLabelSelector).innerText = utils.stripUnderscores(key)
    const keyNameString = String.fromCharCode(hotkeys[key].keyCode)
    clone.querySelector(labelSelector).innerText = keyNameString
    el.appendChild(clone)
  }
}

function onKeydown (evt) {
  // already recording - this is the new key
  if (recording) {
    // TODO: validate that the key is not already in use.
    Store.set(recording, evt.keyCode)
    render(Store.getDictionary(), containerElement, true)
    renderDoneRecording()
    recording = false
  }
}

function renderDoneRecording () {
  // remove bg highlighting
  const keys = document.getElementsByClassName('hotkeyConfig')
  for (const key in keys) {
    if (keys.hasOwnProperty(key)) {
      const targetEl = keys[key]
      removeStyle(targetEl, recordingStyle)
    }
  }
}

function removeStyle (el, style) {
  let styleList = el.className.split(' ')
  let targetIndex = styleList.indexOf(style)
  if (targetIndex !== -1) {
    // remove the target style
    styleList = styleList.splice(targetIndex, 1)
    return styleList
  }
}
