const { ExtendedItem } = require('./ExtendedItem');

class SulfurasItem extends ExtendedItem {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateMyself() {}
}

module.exports = {
  SulfurasItem
};
