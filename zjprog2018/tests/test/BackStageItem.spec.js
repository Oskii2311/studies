/* eslint-disable no-param-reassign */

const { expect } = require('chai');
const { BackStageItem } = require('../src/BackStageItem');
const { BACKSTAGE } = require('../src/constants/special_items_types');

describe('Backstage Item', () => {
  const GIVEN_VALUES = [
    {
      given: {
        quality: 14,
        sellIn: 15
      },
      multipler: 1,
      end: 10
    },
    {
      given: {
        quality: 33,
        sellIn: 10
      },
      multipler: 2,
      end: 5
    },
    {
      given: {
        quality: 11,
        sellIn: 5
      },
      multipler: 3,
      end: 0
    }
  ];

  GIVEN_VALUES.forEach(({ given: { sellIn, quality }, multipler, end }) => {
    it(`Should increase quality by ${multipler} if sellin is between ${sellIn -
      1} and ${end}`, () => {
      let backStageItem;

      for (sellIn; sellIn > end; sellIn -= 1) {
        backStageItem = new BackStageItem(BACKSTAGE, sellIn, quality);

        backStageItem.updateMyself();
        quality += multipler;

        expect(backStageItem.sellIn).to.equal(sellIn - 1);
        expect(backStageItem.quality).to.equal(quality);
      }
    });
  });

  it('Should set quality at 0 if sellIn is below 0', () => {
    const backStageItem = new BackStageItem(BACKSTAGE, 0, 50);

    backStageItem.updateMyself();

    expect(backStageItem.quality).to.equal(0);
    expect(backStageItem.sellIn).to.equal(-1);
  });
});
