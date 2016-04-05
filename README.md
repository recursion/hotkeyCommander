[![Stories in Ready](https://badge.waffle.io/recursion/hotkeyCommander.png?label=ready&title=Ready)](https://waffle.io/recursion/hotkeyCommander)

# Hotkey Commander

> A 'drop in' javascript module for key event consumption and super-easy, user-level configuration.

Your users will be able to easily configure, and instantly use, *their* hotkey preferences, while still invoking *your* pre-defined event handlers.

1. Create your list of custom hotkey definitions.
2. Add hotkeyCommander to your project. `npm install --save hotkey-commander`
3. Create an instance of hotkeyCommander (with require, or by including the script in your html).
3. Pass hotkeyCommander:
    1. A hotkey definition list
    2. An object with *your* eventhandler methods, which follows the hotkeyCommander hotkey naming pattern
    3. the HTML Elements to:
        - render configuration on
        - consume user key events from

# Usage

#### Load as a script from html, or load as a node module.

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
> while the  hotkey engine will run in the extensions target window.
> Better instructions coming, but to give you an idea, it will look something like this:
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

---

### Creating hotkey definitions:

> Creating hotkey definitions is a mostly simple concept. Ultimately its an array
> of objects which describe hotkeys, grouped by category. Let me lay out the pieces here:

---
###### HOTKEY OBJECT
> Represents a hotkey
```
{
  name: YOUR_EVENTHANDLER_NAME_WITH_ALL_CAPS_AND_UNDERSCORES,
  keyCode: ASCII_KEYCODE,
  altKey: BOOL,
  ctrlKey: BOOL,
  shiftKey: BOOL
}
```
###### HOTKEY CATEGORY OBJECT
> A category of hotkeys
```
{
  name: YOUR_CATEGORY_NAME,
  keys: [
    {hotkeyObject},
    {hotkeyObject},
    {hotkeyObject},
    {hotkeyObject}
  ]
}
```
###### HOTKEY LIST
> An array of hotkey category objects:
```
[
  {categoryObject},
  {categoryObject},
  {categoryObject},
  {categoryObject},
  {categoryObject}
]
```
###### FULL EXAMPLE
```
[
  {
    name: 'MOVEMENT_KEYS',
    keys: [
      {
        name: 'FORWARD',
        keyCode: 87, // w
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      },
      {
        name: 'BACK',
        keyCode: 83, // s
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      }
    ]
  },
  {
    name: 'UI_KEYS',
    keys: [
      {
        name: 'SHOW_MAP',
        keyCode: 77, // m
        altKey: false,
        ctrlKey: true,
        shiftKey: false
      },
      {
        name: 'OPEN_CHAT',
        keyCode: 84, // t
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      }
    ]
  }
]
```

###### Naming Conventions:

1. both the hotkey name and the event handler method name MUST use the SAME name
2. the name must be formatted differently in each location.
    - _hotkey names use:_
        - all caps with words seperated by underscore
        - ex: `YOUR_HOTKEY_DESCRIPTION`
    - _method names use:_
        - camel case
        - ex `yourHotkeyDescription`

This module currently uses the HTML import spec for templating, which is (sadly) only supported by chrome. It will be converted to a more universal templating solution shortly, and then probably something like a react specific component.


#### TODO
- Load hotkeys to and from local storage.
- Catch/use alt keys (shift/ctrl/alt)
- Convert to a more universal templating solution.
- Convert to a redux store
- ~~Protect against overwriting existing hotkeys.~~
- ~~Add categories (so that keys can be sorted by category)~~
- ~~Assume that the set/record keystrokes could happen in a different window than the one we are actually firing keys from. This ultimately means there will need to be functions for setting up two different listeners. One for record/set keystrokes and one for actually firing them off.~~


