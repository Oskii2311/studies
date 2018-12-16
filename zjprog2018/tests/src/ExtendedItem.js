const { Item } = require('../src/item')

class ExtendedItem extends Item {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
      }
        decreaseQuality(number) {
            this.quality = this.quality -number;
            if(this.quality < 0) {
              this.quality= 0;
            }
          }
        
          decreaseSellIn(number) {
            this.sellIn = this.sellIn - number;
          }

          increaseQuality(number) {
            this.quality =this.quality +number;
            if( this.quality >= 50) {
              this.quality =  50
            }

          }
}

module.exports = {
    ExtendedItem
  };
  