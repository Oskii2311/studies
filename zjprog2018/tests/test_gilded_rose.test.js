var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');
describe('Gilded Rose', function() {
  it('should correct decrement quality and sellIn after one day', function() {
    const gildedRose = new Shop([new Item('foo', 5, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(9);
  });

  it('should correctly increse wuality of backstage and set on 0 if time is out', function() {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 12, 1)
    ]);

    let items = gildedRose.updateQuality(); //11 /2
    expect(items[0].sellIn).to.equal(11);
    expect(items[0].quality).to.equal(2);
    items = gildedRose.updateQuality(); //10/3
    items = gildedRose.updateQuality(); //9 5
    items = gildedRose.updateQuality(); //8 7
    expect(items[0].sellIn).to.equal(8);

    expect(items[0].quality).to.equal(7);
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality(); // 5 13
    items = gildedRose.updateQuality(); //4 16
    expect(items[0].sellIn).to.equal(4);

    expect(items[0].quality).to.equal(16);
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality(); //0 28
    items = gildedRose.updateQuality(); //-1 0

    expect(items[0].sellIn).to.equal(-1);

    expect(items[0].quality).to.equal(0);
  });

  it('should never decrement quality and sellIn if item is ', function() {
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
    const gildedRose = new Shop([new Item('conjured', 1, 10)]);
    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(6);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(4);
  });
});
