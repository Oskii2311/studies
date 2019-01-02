const { expect } = require('chai');
const { ExtendedItem } = require('../src/ExtendedItem');

describe('ExtendedItem', () => {
  it('Should decrease quality by given number and never below 0', () => {
    const extendedItem = new ExtendedItem('dummy', 3, 3);

    for (let i = 0; i <= 4; i += 1) {
      extendedItem.decreaseQuality(1);
    }

    expect(extendedItem.quality).to.equal(0);
  });

  it('Should decrease sellIn by given number', () => {
    const extendedItem = new ExtendedItem('dummy', 3, 3);

    for (let i = 0; i <= 4; i += 1) {
      extendedItem.decreaseSellIn(1);
    }

    expect(extendedItem.sellIn).to.equal(-2);
  });

  it('Should increase quality by given number and never above 50', () => {
    const extendedItem = new ExtendedItem('dummy', 0, 46);

    for (let i = 0; i <= 4; i += 1) {
      extendedItem.increaseQuality(2);
    }

    expect(extendedItem.quality).to.equal(50);
  });
});
