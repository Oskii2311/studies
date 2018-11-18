var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should correct decrement quality and sellIn after one day", function() {
    const gildedRose = new Shop([ new Item("foo", 5, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(4)
    expect(items[0].quality).to.equal(9)
  });

  it("should correct decrement quality and sellIn after 50 days", function() {
    const gildedRose = new Shop([ new Item("foo", 5, 10) ]);
    let items;
    for(let i = 0; i<=50; i++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-46)
    expect(items[0].quality).to.equal(0)
  });

});
