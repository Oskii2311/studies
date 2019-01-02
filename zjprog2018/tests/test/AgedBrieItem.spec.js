const { expect } = require('chai');
const { AgedBrieItem } = require('../src/AgedBrieItem');
const { AGED_BRIE } = require('../src/constants/special_items_types');

describe('Aged Brie', () => {
  it('Should increase quality by 1 and decrease sellIn by 1', () => {
    const agedBrie = new AgedBrieItem(AGED_BRIE, 5, 10);

    agedBrie.updateMyself();

    expect(agedBrie.sellIn).to.equal(4);
    expect(agedBrie.quality).to.equal(11);
  });

  it('Should not increase quality higher than 50', () => {
    const agedBrie = new AgedBrieItem(AGED_BRIE, 5, 50);

    agedBrie.updateMyself();

    expect(agedBrie.sellIn).to.equal(4);
    expect(agedBrie.quality).to.equal(50);
  });
});
