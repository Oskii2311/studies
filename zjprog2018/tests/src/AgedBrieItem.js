const { ExtendedItem } = require('./ExtendedItem');

class AgedBrieItem extends ExtendedItem {
  updateMyself() {
    this.increaseQuality(1);
    this.decreaseSellIn(1);
  }
}

module.exports = {
  AgedBrieItem
};
