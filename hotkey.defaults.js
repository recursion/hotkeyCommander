/**
 *  ALL hotkeyCodes must follow this pattern
 *  action is the event that will be emitted by the commander
 *  keyCode is the ASCII keyCodes
*/
// Define hotkeyCodes here
module.exports = [
  {
    category: 'CANCEL_KEYS',
    keys: [
      {
        action: 'CANCEL_ALL',
        keyCode: 89,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'CANCEL_LAST',
        keyCode: 84,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'CANCEL_BIDS',
        keyCode: 82,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'CANCEL_OFFERS',
        keyCode: 85,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      }
    ]
  },
  {
    category: 'TOGGLE_KEYS',
    keys: [
      {
        action: 'TOGGLE_LOTSIZE_UP',
        keyCode: 220,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'TOGGLE_LOTSIZE_DOWN',
        keyCode: 222,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'TOGGLE_OFFSET_UP',
        keyCode: 189,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'TOGGLE_OFFSET_DOWN',
        keyCode: 187,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      }
    ]
  },
  {
    category: 'BUY_ORDERS',
    keys: [
      {
        action: 'BID_BETTER',
        keyCode: 70,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'BID_WITH_BEST_BID',
        keyCode: 68,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'BID_BELOW_BEST',
        keyCode: 83,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'BID_DOUBLE_BELOW_BEST',
        keyCode: 65,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'HIT_THE_OFFER',
        keyCode: 71,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'MARKET_BUY',
        keyCode: 71,
        ctrlKey: true,
        shiftKey: false,
        altKey: false
      }
    ]
  },
  {
    category: 'SELL_ORDERS',
    keys: [
      {
        action: 'OFFER_BETTER',
        keyCode: 74,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'OFFER_WITH_BEST_ASK',
        keyCode: 75,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'OFFER_ABOVE_BEST',
        keyCode: 76,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'OFFER_DOUBLE_ABOVE_BEST',
        keyCode: 186,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'HIT_THE_BID',
        keyCode: 72,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      },
      {
        action: 'MARKET_SELL',
        keyCode: 72,
        ctrlKey: true,
        shiftKey: false,
        altKey: false
      }
    ]
  }
]

