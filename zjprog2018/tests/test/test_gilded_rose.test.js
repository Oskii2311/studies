var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');
describe('Gilded Rose', function() {
  it('should correct decrement quality and sellIn after one day', function() {
    const gildedRose = new Shop([new Item('foo', 5, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(9);
  });

  it('should icnrease quality of backstage by 1 if day to sellin is 10 or higher', function() {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 12, 1)
    ]);
    let items = gildedRose.updateQuality(); //11 /2
    gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(3);
  });

  it('should icnrease quality of backstage by 2 if day to sellin is beetwen 9 and 5', function() {
    for (let i = 10; i >= 5; i--) {
      let quality = 1;
      let sellin = 10;
      let gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', sellin, quality)
      ]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(sellin - 1);
      expect(items[0].quality).to.equal(quality + 2);
    }
  });

  it('should icnrease quality of backstage by 3 if day to sellin is beetwen 4 and 0', function() {
    for (let i = 5; i >= 0; i--) {
      let quality = 1;
      let sellin = 5;
      let gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', sellin, quality)
      ]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(sellin - 1);
      expect(items[0].quality).to.equal(quality + 3);
    }
  });

  it('should set quality of backstage on 0 if item is out of date', function() {
    const quality = 50;
    const sellin = 0;
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', sellin, quality)
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  it('should never decrement quality and sellIn if item is Sulfuras', function() {
    const gildedRose = new Shop([
      new Item('Sulfuras, Hand of Ragnaros', 5, 10)
    ]);
    let items;
    for (let i = 0; i <= 50; i++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(10);
  });

  it('should increse quality if it is Aged Brie ', function() {
    const gildedRose = new Shop([new Item('Aged Brie', 5, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(11);
  });

  it('should dont increse quality more than 50', function() {
    const gildedRose = new Shop([new Item('Aged Brie', 5, 10)]);
    let items;
    for (let i = 0; i <= 50; i++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].sellIn).to.equal(-46);
    expect(items[0].quality).to.equal(50);
  });

  it('should decrement quality by 2 if sellin is above 0', function() {
    const gildedRose = new Shop([new Item('foo', -1, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(8);
  });

  it('should not decrease quality is it is 0', function() {
    const gildedRose = new Shop([new Item('foo', 5, 10)]);
    let items;
    for (let i = 0; i <= 50; i++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].sellIn).to.equal(-46);
    expect(items[0].quality).to.equal(0);
  });

  it('should decrease quality of  conjured items by 2', function() {
    for (let i = 5; i >= -2; i--) {
      let quality = 20;
      let sellin = 5;
      let gildedRose = new Shop([new Item('conjured', sellin, quality)]);
      let items;
      items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(sellin - 1);
      if (i < 0) {
        expect(items[0].quality).to.equal(quality - 2);
      } else {
        expect(items[0].quality).to.equal(quality - 2);
      }
    }
  });
});
