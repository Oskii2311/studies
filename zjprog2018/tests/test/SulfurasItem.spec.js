const { expect } = require('chai');
const { SulfurasItem } = require('../src/SulfurasItem');
const { SULFARAS } = require('../src/constants/special_items_types');

describe('Sulfuras', () => {
  it('Should never decrease quality and sellIn', () => {
    const sulfurasItem = new SulfurasItem(SULFARAS, 3, 2);

    for (let i = 0; i <= 5; i += 1) {
      sulfurasItem.updateMyself();
    }

    expect(sulfurasItem.sellIn).to.equal(3);
    expect(sulfurasItem.quality).to.equal(2);
  });
});
