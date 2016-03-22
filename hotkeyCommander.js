var hotkeyCommander = (function() {

  var template;

  var public_api = {
    init: init,
    loadKeys: loadKeys,
    buildKeyMap: buildKeyMap
  };

  return public_api;

  var keymap = {};

  // load template
  function init(hotkeys, el) {
    var templates = document.getElementById('hotkeyTemplate').import;
    template = templates.getElementById('hotkey-setting');
    var keymap = buildKeyMap(hotkeys);
    loadKeys(keymap, el);
  }

  function loadKeys(hotkeys, el) {
    // load hotkeys into the template
    // and write it to the page.
    for (var i in hotkeys) {
      var clone = document.importNode(template.content, true);
      console.log(i, ' ',  hotkeys[i]);

      clone.querySelector('.settingButton')
        .addEventListener("click", function(evt) {
          console.log('Attempting to change key: ', i);
        });

      clone.querySelector('.functionLabel').innerText = stripUnderscores(hotkeys[i]);
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
    var result = {};

    for(var hotkey in hotkeys){
      if(hotkeys.hasOwnProperty(hotkey)){
        // build new hotkey dictionary here
        var thisKey = hotkeys[hotkey];
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


  //       HELPERS

  // use the hotkey data to construct a descriptor
  function stripUnderscores(hotkeyObject){
    var name = hotkeyObject.name.replace('_', ' ');
    return name;
  }

})();
