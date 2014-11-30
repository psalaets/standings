module.exports = applyRanks;

function applyRanks(items, rankBy) {
  items = items.slice();

  items.sort(function(a, b) {
    // highest first
    return b[rankBy] - a[rankBy];
  });

  items.forEach(function(item, index, items) {
    var previousItem = items[index - 1];

    // if item's rank value is same as prev item's rank value
    if (previousItem && item[rankBy] === previousItem[rankBy]) {
      // they're tied and have same rank
      item.rank = previousItem.rank;
    } else {
      // item's rank is its one-based position in array
      item.rank = index + 1;
    }
  });
}
