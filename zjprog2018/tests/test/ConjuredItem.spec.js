const { expect } = require('chai');
const { ConjuredItem } = require('../src/ConjuredItem');
const { CONJURED } = require('../src/constants/special_items_types');

describe('Conjured', () => {
  it('Should decrease quality by 2', () => {
    const conjuredItem = new ConjuredItem(CONJURED, 15, 23);

    conjuredItem.updateMyself();

    expect(conjuredItem.sellIn).to.equal(14);
    expect(conjuredItem.quality).to.equal(21);
  });

  it('Should decrease quality by 4 if sellIn is below 0', () => {
    const conjuredItem = new ConjuredItem(CONJURED, 0, 23);

    conjuredItem.updateMyself();

    expect(conjuredItem.sellIn).to.equal(-1);
    expect(conjuredItem.quality).to.equal(19);
  });
});
