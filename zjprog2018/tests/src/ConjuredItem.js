const { ExtendedItem } = require('./ExtendedItem');

class ConjuredItem extends ExtendedItem {
  updateMyself() {
    this.decreaseSellIn(1);

    if (this.sellIn < 0) {
      this.decreaseQuality(4);
    } else {
      this.decreaseQuality(2);
    }
  }
}

module.exports = {
  ConjuredItem
};
