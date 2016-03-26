// Define hotkeys here
/*  ALL hotkeys must follow this pattern
 *
 *  HOTKEY_NAME: {
 *     name: 'HOTKEY_NAME',
 *     keyCode: 89,
 *     ctrlKey: false,
 *     shiftKey: false,
 *     altKey: false
 *  }
*/
var HKC_hotkeysMap = (function(){

    return {
      CANCEL_ALL: {
        keyCode: 89,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      CANCEL_LAST: {
        keyCode: 84,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      CANCEL_BIDS: {
        keyCode: 82,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      CANCEL_OFFERS: {
        keyCode: 85,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
    };

})();
