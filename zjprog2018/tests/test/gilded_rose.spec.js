const { expect } = require('chai');
const { Shop } = require('../src/gilded_rose.js');
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
    const gildedRose = new Shop([
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

  describe('Normal Item', () => {
    it('Should decrease quality and sellIn by 1', () => {
      const gildedRose = new Shop([new NormalItem(NORMAL_ITEM, 12, 1)]);

      const item = gildedRose.updateQuality();

      expect(item[0].quality).to.equal(0);
      expect(item[0].sellIn).to.equal(11);
    });

    it('Should decrease quality by 2 if sellin is above 0', () => {
      const gildedRose = new Shop([new NormalItem(NORMAL_ITEM, -1, 50)]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(48);
    });

    it('Should not decrease quality below zero', () => {
      const gildedRose = new Shop([new NormalItem(NORMAL_ITEM, 6, 0)]);

      const item = gildedRose.updateQuality();

      expect(item[0].quality).to.equal(0);
      expect(item[0].sellIn).to.equal(5);
    });
  });

  describe('Backstage Item', () => {
    const GIVEN_VALUES = [
      {
        name: BACKSTAGE,
        given: {
          quality: 14,
          sellIn: 15
        },
        multipler: 1,
        end: 10
      },
      {
        name: BACKSTAGE,
        given: {
          quality: 33,
          sellIn: 10
        },
        multipler: 2,
        end: 5
      },
      {
        name: BACKSTAGE,
        given: {
          quality: 11,
          sellIn: 5
        },
        multipler: 3,
        end: 0
      }
    ];

    GIVEN_VALUES.forEach(({ name, given, multipler, end }) => {
      it(`Should increase quality of ${name} by ${multipler}
      if sellin is between ${given.sellIn - 1} and ${end}`, () => {
        let items;
        let gildedRose;

        for (given.sellIn; given.sellIn > end; given.sellIn--) {
          gildedRose = new Shop([
            new BackStageItem(BACKSTAGE, given.sellIn, given.quality)
          ]);

          items = gildedRose.updateQuality();
          given.quality += multipler;

          expect(items[0].sellIn).to.equal(given.sellIn - 1);
          expect(items[0].quality).to.equal(given.quality);
        }
      });
    });

    it('Should set quality at 0 if sellIn is below 0', () => {
      const gildedRose = new Shop([new BackStageItem(BACKSTAGE, 0, 50)]);

      const item = gildedRose.updateQuality();

      expect(item[0].quality).to.equal(0);
      expect(item[0].sellIn).to.equal(-1);
    });
  });
  describe('Sulfuras', () => {
    it('Should never decrease quality and sellIn', () => {
      const gildedRose = new Shop([new SulfurasItem(SULFARAS, 3, 2)]);

      let items;
      for (let i = 0; i <= 5; i++) {
        items = gildedRose.updateQuality();
      }

      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(2);
    });
  });

  describe('Aged Brie', () => {
    it('Should increase quality by 1 and decrease sellIn by 1', () => {
      const gildedRose = new Shop([new AgedBrieItem(AGED_BRIE, 5, 10)]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(4);
      expect(items[0].quality).to.equal(11);
    });

    it('Should doesnt increase quality higer than 50', () => {
      const gildedRose = new Shop([new AgedBrieItem(AGED_BRIE, 5, 50)]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(4);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe('Conjured', () => {
    it('Should decrease quality of conjured items by 2', () => {
      const gildedRose = new Shop([new ConjuredItem('conjured', 15, 23)]);

      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(14);
      expect(items[0].quality).to.equal(21);
    });

    it('Should decrease quality of conjured items by 4 if sellIn is below 0', () => {
      const gildedRose = new Shop([new ConjuredItem('conjured', 0, 23)]);

      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(19);
    });
  });
});
