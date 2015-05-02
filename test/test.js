var test = require('tape');
var standings = require('../');

test('rankBy can be property name of ranking value', function(t) {
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

test('rankBy can be function returning ranking value', function(t) {
  t.plan(3);

  function rankBy(item) {
    return item.score;
  }

  var teams = [
    {score: 20},
    {score: 10},
    {score: 30}
  ];

  standings(teams, rankBy);

  t.equal(teams[0].rank, 2);
  t.equal(teams[1].rank, 3);
  t.equal(teams[2].rank, 1);
});

test('items with one tie', function(t) {
  t.plan(3);

  var teams = [
    {score: 30},
    {score: 10},
    {score: 30}
  ];

  standings(teams, 'score');

  t.equal(teams[0].rank, 1);
  t.equal(teams[1].rank, 3);
  t.equal(teams[2].rank, 1);
});

test('items with multiple ties', function(t) {
  t.plan(7);

  var teams = [
    {score: 60}, // 1st tie
    {score: 60}, // 1st tie
    {score: 50},
    {score: 40},
    {score: 30}, // 2nd tie
    {score: 30}, // 2nd tie
    {score: 20}
  ];

  standings(teams, 'score');

  t.equal(teams[0].rank, 1);
  t.equal(teams[1].rank, 1);
  t.equal(teams[2].rank, 3);
  t.equal(teams[3].rank, 4);
  t.equal(teams[4].rank, 5);
  t.equal(teams[5].rank, 5);
  t.equal(teams[6].rank, 7);
});

test('items with 3-way tie', function(t) {
  t.plan(5);

  var teams = [
    {score: 70},
    {score: 60},
    {score: 60},
    {score: 60},
    {score: 30}
  ];

  standings(teams, 'score');

  t.equal(teams[0].rank, 1);
  t.equal(teams[1].rank, 2);
  t.equal(teams[2].rank, 2);
  t.equal(teams[3].rank, 2);
  t.equal(teams[4].rank, 5);
});

test('items array is not modified', function(t) {
  t.plan(3);

  var teams = [
    {score: 30, name: 'A'},
    {score: 10, name: 'B'},
    {score: 30, name: 'C'}
  ];

  standings(teams, 'score');

  t.equal(teams[0].name, 'A');
  t.equal(teams[1].name, 'B');
  t.equal(teams[2].name, 'C');
});
