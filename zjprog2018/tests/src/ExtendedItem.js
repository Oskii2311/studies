const { Item } = require('../src/Item');

class ExtendedItem extends Item {
  decreaseQuality(number) {
    this.quality = this.quality - number;
    if (this.quality < 0) {
      this.quality = 0;
    }
  }

  decreaseSellIn(number) {
    this.sellIn = this.sellIn - number;
  }

  increaseQuality(number) {
    this.quality = this.quality + number;
    if (this.quality >= 50) {
      this.quality = 50;
    }
  }
}

module.exports = {
  ExtendedItem
};
