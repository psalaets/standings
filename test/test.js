var test = require('tape');
var standings = require('../');

test('items with no ties', function(t) {
  t.plan(3);

  var teams = [
    {score: 20},
    {score: 10},
    {score: 30}
  ];

  standings(teams, 'score');

  t.equal(teams[0].rank, 2);
  t.equal(teams[1].rank, 3);
  t.equal(teams[2].rank, 1);
});
