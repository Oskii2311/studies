const { ExtendedItem } = require('./ExtendedItem')

class NormalItem extends ExtendedItem {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
      }

      updateMyself() {
        this.sellIn = this.decrease(this.sellIn, 1)
        this.quality = (this.sellIn < 0 ) ? this.decreaseQuality(this.quality, 2) : this.decreaseQuality(this.quality, 1);
      }
}

module.exports = {
    NormalItem
  };
  