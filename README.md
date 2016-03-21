# Hotkey Commander
> A drop in javascript module for managing hotkeys.
> This module uses the HTML import spec for templating, and so is only available to browsers which support html import.
### Usage
- Include the hotkeyCommander.js script in your main html file. 
- Run the modules init function.
- Pass an object of hotkeys (using hotkeyCommanders object model) and the element to attach config to, to loadKeys.
- Start the engine!
```html
  <div id="hotkeys"></div>
  ....
  <script src="hotkeyConfig.js"></script>

  <script>
  // This code can be in your applications .js file
  var hotkeysMap = {
        HOTKEY_NAME: {
          name: 'HOTKEY_NAME',
          keyCode: 89,
          ctrlKey: false,
          shiftKey: false,
          altKey: false
        }
  };
  hotkeyCommander.init();
  var hotkeys = hotkeyCommander.buildKeyMap(hotkeysMap);

  var targetEl = document.getElementById('hotkeys');
  hotkeyCommander.loadKeys(hotkeys, targetEl);
  </script>

```


