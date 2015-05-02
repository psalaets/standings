module.exports = applyRanks;

function applyRanks(items, rankBy) {
  rankBy = makeRankByFunction(rankBy);

  // order items by rank
  items = items.slice();
  items.sort(function(a, b) {
    // highest first
    return rankBy(b) - rankBy(a);
  });

  var rankings = [];

  items.forEach(function(item, index, items) {
    var rankWrapper = {
      item: item
    };
    rankings.push(rankWrapper);

    var prevWrapper = rankings[index - 1];

    // if item's rank value is same as prev item's rank value
    if (prevWrapper && rankBy(item) === rankBy(prevWrapper.item)) {
      // they're tied and have same rank
      rankWrapper.rank = prevWrapper.rank;
    } else {
      // item's rank is its one-based position in array
      rankWrapper.rank = index + 1;
    }

    // console.log('rank by value:', rankBy(item), 'rank:', rankWrapper.rank);
  });

  return rankings;
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