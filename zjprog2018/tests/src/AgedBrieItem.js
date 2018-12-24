const { ExtendedItem } = require('./ExtendedItem');

class AgedBrieItem extends ExtendedItem {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateMyself() {
    this.increaseQuality(1);
    this.decreaseSellIn(1);
  }
}

module.exports = {
  AgedBrieItem
};
