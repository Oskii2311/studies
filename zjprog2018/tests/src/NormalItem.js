const { ExtendedItem } = require('./ExtendedItem');

class NormalItem extends ExtendedItem {
  updateMyself() {
    this.decreaseSellIn(1);

    if (this.sellIn < 0) {
      this.decreaseQuality(2);
    } else {
      this.decreaseQuality(1);
    }
  }
}

module.exports = {
  NormalItem
};
