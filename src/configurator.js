// this module:
// renders hotkey configuration
// handles recording new hotkeys
const utils = require('./utils')
const Store = require('./store')

let recording = false
let containerElement = null

// the name of the style used
// to indicate when an item is being recorded
const recordingStyle = 'recording'

// public api
module.exports = {
  init: init
}

// load configuration templates
// takes an element to load the template to
function init (containerEl, listenerEl) {
  if (!utils.validateEl(containerEl)) {
    console.error('Configurators first argument must be a valid DOM element')
    throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element')
  }
  if (!utils.validateEl(listenerEl)) {
    console.error('Configurators second argument must be a valid DOM element or the window object')
    throw new Error('Invalid initializer for configurator container element. Must be valid DOM Element or the window object.')
  }

  containerElement = containerEl

  utils.addListener(listenerEl || window, 'keydown', onKeydown)

  render(Store.getKeymap(), containerEl)
}

// render the hotkeys to their dom element
// clears the element first if clearElement is true
function render (hotkeys, el, clearElement = false) {
  const templates = document.getElementById('hotkeyTemplate').import
  const template = templates.getElementById('hotkey-setting')

  if (clearElement) {
    containerElement.innerHTML = ''
  }

  // load hotkeys into the template
  // and write it to the page.
  for (let i in hotkeys) {
    const clone = document.importNode(template.content, true)

    clone.querySelector('.settingButton')
      .addEventListener('click', function (evt) {
        if (!recording) {
          // add highlighting to bg for this element
          this.parentElement.className += ' ' + recordingStyle

          // set recording to the key we are recording
          recording = i
        }
      })

    clone.querySelector('.functionLabel').innerText = utils.stripUnderscores(hotkeys[i].name)
    clone.querySelector('.settingLabel').innerText = String.fromCharCode(i)
    el.appendChild(clone)
  }
}

function onKeydown (evt) {
  // already recording - this is the new key
  if (recording) {
    // TODO: validate that the key is not already in use.

    Store.set(recording, evt.keyCode)
    render(Store.getKeymap(), containerElement, true)

    // remove bg highlighting
    const keys = document.getElementsByClassName('hotkeyConfig')
    for (const key in keys) {
      if (keys.hasOwnProperty(key)) {
        const targetEl = keys[key]
        removeStyle(targetEl, recordingStyle)
      }
    }
    recording = false
  }
}

function removeStyle (el, style) {
  let styleList = el.className.split(' ')
  console.log(styleList)
  let targetIndex = styleList.indexOf(style)
  if (targetIndex !== -1) {
    // remove the target style
    styleList = styleList.splice(targetIndex, 1)
    return styleList
  }
}
