module.exports = (list) => {
  // build an object of hotkeys keyed by hotkey.name
  const cats = []
  const hotkeys = {}
  list.forEach((cat, index) => {
    // for each category
    // iterate through each action
    cats.push(cat.category)
    for (let i = 0; i < cat.actions.length; i++) {
      const targetKey = cat.actions[i]
      // add the category index to this object
      hotkeys[targetKey.name] = (Object.assign({}, targetKey, {category: index}))
    }
  })
  return [hotkeys, cats]
}
