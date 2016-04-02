/**
 *  ALL Categories MUST be prefixed with CATEGORY_
 *  ALL hotkeys must follow this pattern
 *  Use ASCII keyCodes
 *  (they will be consume during the keypress event)
 *
 * {
 *  CATEGORY_THE_CATEGORY_NAME: {
 *    HOTKEY_NAME: {
 *       keyCode: 89,
 *       ctrlKey: false,
 *       shiftKey: false,
 *       altKey: false
 *    }.......
 *  }.......
 * }
*/
// Define hotkeys here
module.exports = {
  CATEGORY_CANCEL_KEYS: {
    CANCEL_ALL: {
      keyCode: 121,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    CANCEL_LAST: {
      keyCode: 116,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    CANCEL_BIDS: {
      keyCode: 114,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    CANCEL_OFFERS: {
      keyCode: 117,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    }
  },
  CATEGORY_TOGGLE_KEYS: {
    TOGGLE_LOTSIZE_UP: {
      keyCode: 92,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    TOGGLE_LOTSIZE_DOWN: {
      keyCode: 39,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    TOGGLE_OFFSET_UP: {
      keyCode: 45,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    TOGGLE_OFFSET_DOWN: {
      keyCode: 61,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    }
  },
  CATEGORY_BUY_ORDERS: {
    BID_BETTER: {
      keyCode: 102,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    BID_WITH_BEST_BID: {
      keyCode: 100,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    BID_BELOW_BEST: {
      keyCode: 115,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    BID_DOUBLE_BELOW_BEST: {
      keyCode: 97,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    HIT_THE_OFFER: {
      keyCode: 103,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    MARKET_BUY: {
      keyCode: 309,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    }
  },
  CATEGORY_SELL_ORDERS: {
    OFFER_BETTER: {
      keyCode: 106,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    OFFER_WITH_BEST_ASK: {
      keyCode: 107,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    OFFER_ABOVE_BEST: {
      keyCode: 108,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    OFFER_DOUBLE_ABOVE_BEST: {
      keyCode: 59,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    HIT_THE_BID: {
      keyCode: 555,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    MARKET_SELL: {
      keyCode: 555,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    }
  }
}

