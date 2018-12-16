const { ExtendedItem } = require('./ExtendedItem')

class BackStageItem extends ExtendedItem {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
      }

      updateMyself() {
        if(this.sellIn > 10) {
           this.quality = this.increase(this.quality, 1)
          } else if(this.sellIn <= 10 && this.sellIn >5) {
            this.quality = this.increase(this.quality, 2)
        }else {
            this.quality = this.increase(this.quality, 3)
        }
          this.sellIn = this.decrease(this.sellIn, 1)
          if(this.sellIn < 0 ) {
            this.quality = 0;
          }
      }
}

module.exports = {
    BackStageItem
  };
  