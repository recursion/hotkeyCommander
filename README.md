[![Stories in Ready](https://badge.waffle.io/recursion/hotkeyCommander.png?label=ready&title=Ready)](https://waffle.io/recursion/hotkeyCommander)

# Hotkey Commander

> A 'drop in' javascript module for super-easy, user-level hotkey configuration and event consumption.

Your users will be able to easily configure their hotkey preferences, while still invoking your pre-defined event handlers for the needed functions. You simply pass the module an object with your event handler functions that share a simple naming convention with your hotkey definitions, along with the elements you want to listen on, and display and display the config panel to, and hotkeyCommander does the rest. When a user changes his hotkey settings, the new hotkey is immediately active.

1. Create your custom hotkeys via a simple js object / key value pair template
2. Create a hotkeyCommander instance.
3. Give the default hotkey object to hotkey commander.
4. Give hotkeyCommander the element you want the configuration template rendered to.
5. Give hotkeyCommander the element you want the hotkey engine to listen on.
6. Give hotkeyCommander the element you want the config

This module currently uses the HTML import spec for templating, which is (sadly) only supported by chrome. It will be converted to a more universal templating solution shortly, and then probably something like a react specific component.

#### TODO

- Load hotkeys to and from local storage.
- Catch/use alt keys (shift/ctrl/alt)
- Convert to a more universal templating solution.
- Convert to a redux store
- ~~Protect against overwriting existing hotkeys.~~
- ~~Add categories (so that keys can be sorted by category)~~
- ~~Assume that the set/record keystrokes could happen in a different window than the one we are actually firing keys from. This ultimately means there will need to be functions for setting up two different listeners. One for record/set keystrokes and one for actually firing them off.~~

### Usage
- Include hotkeyCommander in your package (as npm package or as browser script)
- optionally provide hotkeyCommander the listeners
- provide hotkey commander with an object whos keys are named the same as your hotkey names, except in camelCase
- ex: hotkey named: WALK_FORWARD function named: walkForward

#### Multiple ways to use/invoke
##### As browser script
> - `npm run build` to get the bundle file to the project dist directory
> - move the files in dist to where you want to serve them, or serve from there..
> - Setup initial hotkeys map in the hotkeys.js file.
> - Include the hotkeyCommander.js script in your main html file.
> - Call init on it with the desired container element (this is where you want your config panel to render)

```html
  <div id="hotkeys"></div>
  <script src="dist/hotkeyCommander.js"></script>

  <script>
    var hotkeys = require('./myHotkeyDefaults')
    var targetEl = document.getElementById('hotkeys');
    hotkeyCommander.init(targetEl, {hotkeys: hotkeys});
  </script>
```

##### As a node module or multi-context google chrome extension
> The config portion will run in the plugin context
> while the  hotkey engine will run in the extensions target window
> instructions coming
> but it will look something like this
```
// in the context/file where you will be running
// the configuration module
const hotkeys = require('./myDefaultHotkeys')
const hotkeyCommander = require('hotkeyCommander')
hotkeyCommander.startConfigurator(targetElement, listenerElement, {hotkeys})

// then in the context where you want the keykeys to be responded to:
const hotkeys = require('./myDefaultHotkeys')
const hotkeyCommander = require('hotkeyCommander')
hotkeyCommander.startEngine(listenerElement, responderObject, {hotkeys})
```

#### Development
> The following data doesnt really belong here,
> but in leiu of replicating it throughout the project
> Ill shove it here for the time being.

##### Data Structures
       HOTKEY OBJECT
This is the data structure representing a hotkey
```
{
  name: CAPITAL_NAME_WITH_UNDERSCORES,
  keyCode: ASCII_KEYCODE,
  altKey: BOOL,
  ctrlKey: BOOL,
  shiftKey: BOOL
}
```
     HOTKEY DICTIONARY
a data structure that takes the shape
of an object with keys that are category
names and values that are objects of
hotkey objects
```
{
  name: CATEGORY_THE_CATEGORY_NAME,
  keys: [
    {
      name: CAPITAL_NAME_WITH_UNDERSCORES,
      keyCode: ASCII_KEYCODE,
      altKey: BOOL,
      ctrlKey: BOOL,
      shiftKey: BOOL
    }
  ]
}
```
     HOTKEY MAP
Dictionary of hotkeys referenced by keyCode instead of by name
This is always updated to reflect the state of the hotkey dictionary
```
{
  HOTKEY_KEYCODE: {
     name: 'HOTKEY_NAME',
     ctrlKey: false,
     shiftKey: false,
     altKey: false
  },
  HOTKEY2_KEYCODE: {
     name: 'HOTKEY2_NAME',
     ctrlKey: false,
     shiftKey: false,
     altKey: false
  },.......
}
```


