/**
 *  ALL Categories MUST be prefixed with CATEGORY_
 *  ALL hotkeyCodes must follow this pattern
 *  Use ASCII keyCodes
 *  (they will be consume during the keyCodepress event)
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
// Define hotkeyCodes here
module.exports = {
  CATEGORY_CANCEL_KEYS: {
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
    }
  },
  CATEGORY_TOGGLE_KEYS: {
    TOGGLE_LOTSIZE_UP: {
      keyCode: 220,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    TOGGLE_LOTSIZE_DOWN: {
      keyCode: 222,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    TOGGLE_OFFSET_UP: {
      keyCode: 189,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    TOGGLE_OFFSET_DOWN: {
      keyCode: 187,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    }
  },
  CATEGORY_BUY_ORDERS: {
    BID_BETTER: {
      keyCode: 70,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    BID_WITH_BEST_BID: {
      keyCode: 68,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    BID_BELOW_BEST: {
      keyCode: 83,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    BID_DOUBLE_BELOW_BEST: {
      keyCode: 65,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    HIT_THE_OFFER: {
      keyCode: 71,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    MARKET_BUY: {
      keyCode: 70,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    }
  },
  CATEGORY_SELL_ORDERS: {
    OFFER_BETTER: {
      keyCode: 72,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    OFFER_WITH_BEST_ASK: {
      keyCode: 74,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    OFFER_ABOVE_BEST: {
      keyCode: 76,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    OFFER_DOUBLE_ABOVE_BEST: {
      keyCode: 186,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    HIT_THE_BID: {
      keyCode: 72,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    },
    MARKET_SELL: {
      keyCode: 72,
      ctrlKey: false,
      shiftKey: false,
      altKey: false
    }
  }
}

