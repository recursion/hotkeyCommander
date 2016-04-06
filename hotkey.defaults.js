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
module.exports = [
  {
    name: 'CANCEL_KEYS',
    keys: [
      {
        name: 'CANCEL_ALL',
        keyCode: 89,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'CANCEL_LAST',
        keyCode: 84,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'CANCEL_BIDS',
        keyCode: 82,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'CANCEL_OFFERS',
        keyCode: 85,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      }
    ]
  },
  {
    name: 'TOGGLE_KEYS',
    keys: [
      {
        name: 'TOGGLE_LOTSIZE_UP',
        keyCode: 220,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'TOGGLE_LOTSIZE_DOWN',
        keyCode: 222,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'TOGGLE_OFFSET_UP',
        keyCode: 189,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'TOGGLE_OFFSET_DOWN',
        keyCode: 187,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      }
    ]
  },
  {
    name: 'BUY_ORDERS',
    keys: [
      {
        name: 'BID_BETTER',
        keyCode: 70,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'BID_WITH_BEST_BID',
        keyCode: 68,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'BID_BELOW_BEST',
        keyCode: 83,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'BID_DOUBLE_BELOW_BEST',
        keyCode: 65,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'HIT_THE_OFFER',
        keyCode: 71,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'MARKET_BUY',
        keyCode: 71,
        ctrlKey: true,
        shiftKey: false,
        altKey: false
      }
    ]
  },
  {
    name: 'SELL_ORDERS',
    keys: [
      {
        name: 'OFFER_BETTER',
        keyCode: 74,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'OFFER_WITH_BEST_ASK',
        keyCode: 75,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'OFFER_ABOVE_BEST',
        keyCode: 76,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'OFFER_DOUBLE_ABOVE_BEST',
        keyCode: 186,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'HIT_THE_BID',
        keyCode: 72,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        name: 'MARKET_SELL',
        keyCode: 72,
        ctrlKey: true,
        shiftKey: false,
        altKey: false
      }
    ]
  }
]

