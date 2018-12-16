const { Item } = require('./item')

class ExtendedItem extends Item {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
      }
        decreaseQuality(quality, number) {
            const result = this.decrease(quality, number);
            if(result < 0) {
              return 0;
            }
            return result
          }
        
          decrease(value, number) {
            return value - number;
          }
        
          increase(value, number) {
            const result = value + number;
            if(result >= 50) {
              return 50
            }
            return result;
          }
}

module.exports = {
    ExtendedItem
  };
  