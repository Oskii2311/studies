class GildedRose {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      item.updateMyself();
    });
    return this.items;
  }
}

module.exports = {
  GildedRose
};
