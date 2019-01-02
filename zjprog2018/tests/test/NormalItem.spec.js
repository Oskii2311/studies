const { expect } = require('chai');
const { NormalItem } = require('../src/NormalItem');
const { NORMAL_ITEM } = require('../src/constants/special_items_types');

describe('Normal Item', () => {
  it('Should decrease quality and sellIn by 1', () => {
    const normalItem = new NormalItem(NORMAL_ITEM, 12, 1);

    normalItem.updateMyself();

    expect(normalItem.quality).to.equal(0);
    expect(normalItem.sellIn).to.equal(11);
  });

  it('Should decrease quality by 2 if sellin is above 0', () => {
    const normalItem = new NormalItem(NORMAL_ITEM, -1, 50);

    normalItem.updateMyself();

    expect(normalItem.sellIn).to.equal(-2);
    expect(normalItem.quality).to.equal(48);
  });

  it('Should not decrease quality below zero', () => {
    const normalItem = new NormalItem(NORMAL_ITEM, 6, 0);

    normalItem.updateMyself();

    expect(normalItem.quality).to.equal(0);
    expect(normalItem.sellIn).to.equal(5);
  });
});
