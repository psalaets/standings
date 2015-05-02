module.exports = applyRanks;

function applyRanks(items, rankBy) {
  rankBy = makeRankByFunction(rankBy);

  items = items.slice();

  items.sort(function(a, b) {
    // highest first
    return rankBy(b) - rankBy(a);
  });

  items.forEach(function(item, index, items) {
    var previousItem = items[index - 1];

    // if item's rank value is same as prev item's rank value
    if (previousItem && rankBy(item) === rankBy(previousItem)) {
      // they're tied and have same rank
      item.rank = previousItem.rank;
    } else {
      // item's rank is its one-based position in array
      item.rank = index + 1;
    }
  });
}

/**
* Turns string or function into function that accepts item and returns value
* used for ranking.
*/
function makeRankByFunction(rankBy) {
  if (typeof rankBy == 'function') {
    return rankBy;
  } else {
    // assuming rankBy is string
    return function rankByProperty(item) {
      return item[rankBy];
    };
  }
}