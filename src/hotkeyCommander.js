const config = require('./Config')
const engine = require('./Engine')

let template;

// the original keys (before mapping);
let keyDictionary = {};

// an object with keycodes for keys
// this is what the hotkey engine will call when keys are pressed
let keymap = {};
let recording = false;
let rootElement;


// This is the object that will be exported
const public_api = {
  init: init
};

// load template
function init(hotkeys, el) {
  const templates = document.getElementById('hotkeyTemplate').import;
  template = templates.getElementById('hotkey-setting');

  // store the original hotkeys
  // TODO: move these into local storage after initial load
  keyDictionary = hotkeys;
  rootElement = el;

  reload(keyDictionary, rootElement);

  window.addEventListener('keydown', onkeydown);
}

function loadKeys(hotkeys, el) {
  // load hotkeys into the template
  // and write it to the page.
  for (let i in hotkeys) {
    const clone = document.importNode(template.content, true);
    console.log(i, ' ',  hotkeys[i]);

    clone.querySelector('.settingButton')
      .addEventListener("click", function(evt) {
        if (!recording) {
          // add highlighting to bg for this element
          this.parentElement.style.background = 'red';
          console.log('Attempting to change key: ', i);
          console.log(keymap[i]);
          recording = i;
        }

      });

    clone.querySelector('.functionLabel').innerText = stripUnderscores(hotkeys[i].name);
    clone.querySelector('.settingLabel').innerText = String.fromCharCode(i);
    el.appendChild(clone);
  }
}

// takes in an object of mapped hotkeys
// and builds an object with keyCode keys
// so that the hotkeys can be accessed by their keycode
// instead of by their name
// this is what would be used by the hotkey engine
function buildKeyMap(hotkeys) {
  const result = {};

  for(const hotkey in hotkeys){
    if(hotkeys.hasOwnProperty(hotkey)){
      // build new hotkey dictionary here
      const thisKey = hotkeys[hotkey];
      result[thisKey.keyCode] = {
        name: hotkey,
        ctrlKey: hotkeys[hotkey].ctrlKey,
        altKey: hotkeys[hotkey].altKey,
        shiftKey: hotkeys[hotkey].shiftKey,
      };
    }
  }
  return result;
}

// rebuild the keymap
// render the hotkeys element
function reload(hotkeys, el) {
  keymap = buildKeyMap(hotkeys);

  el.innerHTML = '';
  //load the hotkeys into the DOM
  loadKeys(keymap, el);
}

function onkeydown(evt) {
  // already recording - this is the new key
  if (recording) {
    console.log('You are trying to change ', recording, ' to : ', evt.keyCode);

    //TODO: validate that the key is not already in use.

    const keyToSet = findKeyByCode(recording);
    // set the key in the hotkey dictionary
    if (keyToSet) {
      keyToSet.keyCode = evt.keyCode;
      reload(keyDictionary, rootElement);
    } else {
      console.error('Could not find key: ', recording);
      console.log('Proper keys are: ', keymap);
    }

    // remove bg highlighting
    const keys = document.getElementsByClassName('hotkeyConfig');
    for (const key in keys) {
      if (keys.hasOwnProperty(key)){
        keys[key].style.background = '';
      }
    }
    recording = false;

  } else {
    if (keymap[evt.keyCode]){
      console.log('Keymap exists');
      console.log(keymap[evt.keyCode]);
    } else {
      console.log('No key mapped to ', evt.keyCode);
    }
  }
}

//       HELPERS

/**
 * searches through the keyDictionary and
 * attempts to find the key containing
 * the passed in keycode
 * @returns {Key Object} or null
*/
function findKeyByCode(keycode) {
  for (const key in keyDictionary){
    console.log(key, ' ', keyDictionary[key]);
    if (+keyDictionary[key].keyCode === +keycode) {
      return keyDictionary[key];
    }
  }
  return null
}

function stripUnderscores(string){
  return string.replace('_', ' ');
}

// turn a snake case string into a camelCase string
function snakeCaseToCamelCase(string) {
  string = stripUnderscores(string);
  string = string.split(' ');
  const result = string.map(function(word, index){
    // uppercase the first character of each word
    // except the first word
    if(index !== 0) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word.toLowerCase();
    }
  });
  return result.join('');
}

module.exports = public_api
