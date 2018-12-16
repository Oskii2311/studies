const {
  CONJURED,
  BACKSTAGE,
  AGED_BRIE,
  SULFARAS
} = require('./constants/special_items_types')

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const {name, quality, sellIn} = item;
      if(this.isNormalItem(name)) {
        item.quality = (sellIn < 0 ) ? this.decreaseQuality(quality, 2) : this.decreaseQuality(quality, 1);
        item.sellIn = this.decrease(sellIn, 1)
      } else {
      switch(name) {
          case CONJURED:
            item.quality = this.decreaseQuality(quality, 2)
            item.sellIn = this.decrease(sellIn, 1)
            break;
        case AGED_BRIE: 
            item.quality = this.increase(quality, 1)
            item.sellIn = this.decrease(sellIn, 1)
            break;
        case BACKSTAGE:
        if(sellIn > 10) {
              item.quality = this.increase(quality, 1)
        } else if(sellIn <= 10 && sellIn >5) {
           item.quality = this.increase(quality, 2)
        }else {
          item.quality = this.increase(quality, 3)
        }
        item.sellIn = this.decrease(sellIn, 1)
        if(item.sellIn < 0 ) {
          item.quality = 0;
        }
        break;
        }
      }
    });
    return this.items;
  }

  isNormalItem(name) {
    const specialItems = [CONJURED,BACKSTAGE, AGED_BRIE, SULFARAS];
    for(let i = 0; i<specialItems.length;i++) {
      if (name === specialItems[i]) {
        return false;
      } 
    }
    return true;
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
  // updateQuality() {
  //   for (var i = 0; i < this.items.length; i++) {
  //     if (
  //       this.items[i].name != 'Aged Brie' &&
  //       this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert'
  //     ) {
  //       if (this.items[i].quality > 0) {
  //         if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //           if (this.items[i].name === 'conjured') {
  //             this.items[i].quality = this.items[i].quality - 1;
  //           }
  //           this.items[i].quality = this.items[i].quality - 1;
  //         }
  //       }
  //     } else {
  //       if (this.items[i].quality < 50) {
  //         this.items[i].quality = this.items[i].quality + 1;
  //         if (
  //           this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert'
  //         ) {
  //           if (this.items[i].sellIn < 11) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //           if (this.items[i].sellIn < 6) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //       this.items[i].sellIn = this.items[i].sellIn - 1;
  //     }
  //     if (this.items[i].sellIn < 0) {
  //       if (this.items[i].name != 'Aged Brie') {
  //         if (
  //           this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert' &&
  //           this.items[i].name !== 'conjured'
  //         ) {
  //           if (this.items[i].quality > 0) {
  //             if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //               this.items[i].quality = this.items[i].quality - 1;
  //             }
  //           }
  //         } else {
  //           if (this.items[i].name !== 'conjured')
  //             this.items[i].quality =
  //               this.items[i].quality - this.items[i].quality;
  //         }
  //       } else {
  //         if (this.items[i].quality < 50) {
  //           this.items[i].quality = this.items[i].quality + 1;
  //         }
  //       }
  //     }
  //   }

  //   return this.items;
  // }
}

module.exports = {
  Shop
};
