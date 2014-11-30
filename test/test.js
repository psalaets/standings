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
