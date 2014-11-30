module.exports = applyRanks;

function applyRanks(items, rankBy) {
  items = items.slice();

  items.sort(function(a, b) {
    // highest first
    return b[rankBy] - a[rankBy];
  });

  items.forEach(function(item, index) {
    item.rank = index + 1;
  });
}
