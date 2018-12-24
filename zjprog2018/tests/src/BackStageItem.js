const { ExtendedItem } = require('./ExtendedItem');

class BackStageItem extends ExtendedItem {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateMyself() {
    if (this.sellIn > 10) {
      this.increaseQuality(1);
    }

    if (this.isBeetwen10and6()) {
      this.increaseQuality(2);
    }

    if (this.sellIn < 6) {
      this.increaseQuality(3);
    }

    this.decreaseSellIn(1);

    if (this.sellIn < 0) {
      this.quality = 0;
    }
  }

  isBeetwen10and6() {
    if (this.sellIn <= 10 && this.sellIn > 5) {
      return true;
    }
    return false;
  }
}

module.exports = {
  BackStageItem
};
