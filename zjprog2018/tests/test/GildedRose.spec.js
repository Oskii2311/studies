const { expect } = require('chai');
const { GildedRose } = require('../src/GildedRose');
const { BackStageItem } = require('../src/BackStageItem');
const { AgedBrieItem } = require('../src/AgedBrieItem');
const { ConjuredItem } = require('../src/ConjuredItem');
const { NormalItem } = require('../src/NormalItem');
const { SulfurasItem } = require('../src/SulfurasItem');
const {
  CONJURED,
  BACKSTAGE,
  AGED_BRIE,
  SULFARAS,
  NORMAL_ITEM
} = require('../src/constants/special_items_types');

describe('Gilded Rose', () => {
  it('Should correctly update value for array of items', () => {
    const gildedRose = new GildedRose([
      new NormalItem(NORMAL_ITEM, 12, 5),
      new ConjuredItem(CONJURED, 12, 5),
      new AgedBrieItem(AGED_BRIE, 12, 5),
      new BackStageItem(BACKSTAGE, 12, 5),
      new SulfurasItem(SULFARAS, 12, 5)
    ]);
    const EXPECTED_VALUES = [
      {
        name: NORMAL_ITEM,
        quality: 4,
        sellIn: 11
      },
      {
        name: CONJURED,
        quality: 3,
        sellIn: 11
      },
      {
        name: AGED_BRIE,
        quality: 6,
        sellIn: 11
      },
      {
        name: BACKSTAGE,
        quality: 6,
        sellIn: 11
      },
      {
        name: SULFARAS,
        quality: 5,
        sellIn: 12
      }
    ];

    const item = gildedRose.updateQuality();

    EXPECTED_VALUES.forEach(({ quality, sellIn, name }, index) => {
      expect(item[index].name).to.equal(name);
      expect(item[index].quality).to.equal(quality);
      expect(item[index].sellIn).to.equal(sellIn);
    });
  });
});
