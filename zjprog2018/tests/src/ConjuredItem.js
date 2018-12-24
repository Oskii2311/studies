const { ExtendedItem } = require('./extendedItem');

class ConjuredItem extends ExtendedItem {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateMyself() {
    this.decreaseSellIn(1);

    this.sellIn < 0 ? this.decreaseQuality(4) : this.decreaseQuality(2);
  }
}

module.exports = {
  ConjuredItem
};
