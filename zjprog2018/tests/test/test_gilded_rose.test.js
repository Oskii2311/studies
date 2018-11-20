const { expect } = require('chai');
const { Shop, Item } = require('../src/gilded_rose.js');

describe('Gilded Rose', () => {
  const agedBrieItem = 'Aged Brie';
  const backstageItem = 'Backstage passes to a TAFKAL80ETC concert';
  const Sulfuras = 'Sulfuras, Hand of Ragnaros';

  it('Should use null as zero value', () => {
    const gildedRose = new Shop([new Item('null', null, null)]);

    const item = gildedRose.updateQuality();

    expect(item[0].quality).to.equal(null);
    expect(item[0].sellIn).to.equal(-1);
  });

  it('Should correctly update value for array of items', () => {
    const gildedRose = new Shop([
      new Item('normal item', 12, 5),
      new Item('conjured', 12, 5),
      new Item(agedBrieItem, 12, 5),
      new Item(backstageItem, 12, 5),
      new Item(Sulfuras, 12, 5)
    ]);
    const EXPECTED_VALUES = [
      {
        name: 'normal item',
        quality: 4,
        sellIn: 11
      },
      {
        name: 'conjured',
        quality: 3,
        sellIn: 11
      },
      {
        name: agedBrieItem,
        quality: 6,
        sellIn: 11
      },
      {
        name: backstageItem,
        quality: 6,
        sellIn: 11
      },
      {
        name: Sulfuras,
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
    it('should decrease quality and sellIn by 1', () => {
      const gildedRose = new Shop([new Item('normal item', 12, 1)]);

      const item = gildedRose.updateQuality();

      expect(item[0].quality).to.equal(0);
      expect(item[0].sellIn).to.equal(11);
    });

    it('should decrease quality by 2 if sellin is above 0', () => {
      const gildedRose = new Shop([new Item('normal item', -1, 50)]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(48);
    });

    it('should not decrease quality below zero', () => {
      const gildedRose = new Shop([new Item('normal item', 6, 0)]);

      const item = gildedRose.updateQuality();

      expect(item[0].quality).to.equal(0);
      expect(item[0].sellIn).to.equal(5);
    });
  });

  describe('Backstage Item', () => {
    const GIVEN_VALUES = [
      {
        name: backstageItem,
        given: {
          quality: 14,
          sellIn: 15
        },
        multipler: 1,
        end: 10
      },
      {
        name: backstageItem,
        given: {
          quality: 33,
          sellIn: 10
        },
        multipler: 2,
        end: 5
      },
      {
        name: backstageItem,
        given: {
          quality: 11,
          sellIn: 5
        },
        multipler: 3,
        end: 0
      }
    ];

    GIVEN_VALUES.forEach(({ name, given, multipler, end }) => {
      it(`should increase quality of ${name} by ${multipler}
      if day to sellin is beetwen ${given.sellIn - 1} and ${end}`, () => {
        let items;
        let gildedRose;

        for (given.sellIn; given.sellIn > end; given.sellIn--) {
          gildedRose = new Shop([
            new Item(backstageItem, given.sellIn, given.quality)
          ]);

          items = gildedRose.updateQuality();
          given.quality += multipler;

          expect(items[0].sellIn).to.equal(given.sellIn - 1);
          expect(items[0].quality).to.equal(given.quality);
        }
      });
    });

    it('should set quality at 0 if sellIn is below 0', () => {
      const gildedRose = new Shop([new Item(backstageItem, 0, 50)]);

      const item = gildedRose.updateQuality();

      expect(item[0].quality).to.equal(0);
      expect(item[0].sellIn).to.equal(-1);
    });

    describe('Sulfuras', () => {
      it('should never decrease quality and sellIn', () => {
        const gildedRose = new Shop([new Item(Sulfuras, 3, 2)]);

        let items;
        for (let i = 0; i <= 5; i++) {
          items = gildedRose.updateQuality();
        }

        expect(items[0].sellIn).to.equal(3);
        expect(items[0].quality).to.equal(2);
      });
    });

    describe('Aged Brie', () => {
      it('should increase quality by 1 and decrease sellIn by 1', () => {
        const gildedRose = new Shop([new Item(agedBrieItem, 5, 10)]);

        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(11);
      });

      it('should doesnt increase quality higer than 50', () => {
        const gildedRose = new Shop([new Item(agedBrieItem, 5, 50)]);

        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(50);
      });
    });

    describe('Conjured', () => {
      it('should decrease quality of conjured items by 2', () => {
        const gildedRose = new Shop([new Item('conjured', 15, 23)]);

        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(14);
        expect(items[0].quality).to.equal(21);
      });
    });
  });
});
