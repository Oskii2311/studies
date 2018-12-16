const { ExtendedItem } = require('./ExtendedItem')

class AgedBrieItem extends ExtendedItem {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
      }

      updateMyself() {
            this.quality = this.increase(this.quality, 1)
            this.sellIn = this.decrease(this.sellIn, 1)
      }
}

module.exports = {
    AgedBrieItem
  };
  