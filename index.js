module.exports = applyRanks;

function applyRanks(items, rankBy) {
  rankBy = makeRankByFunction(rankBy);

  // create array with holder objects
  var rankings = items.map(function(item) {
    return {
      item: item
    };
  });

  // order by rank value
  rankings.sort(function(a, b) {
    // highest first
    return rankBy(b.item) - rankBy(a.item);
  });

  // assign ranks
  rankings.forEach(function(holder, index, rankings) {
    var prevHolder = rankings[index - 1];

    // if item's rank value is same as prev item's rank value
    if (prevHolder && rankBy(holder.item) === rankBy(prevHolder.item)) {
      // they're tied and have same rank
      holder.rank = prevHolder.rank;
    } else {
      // item's rank is its one-based position in array
      holder.rank = index + 1;
    }
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