const { ExtendedItem } = require('./ExtendedItem')

class NormalItem extends ExtendedItem {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
    }

    updateMyself() {
        this.decreaseSellIn(1);
        (this.sellIn < 0) ? this.decreaseQuality(2) : this.decreaseQuality(1);
    }
}

module.exports = {
    NormalItem
};
