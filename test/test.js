var test = require('tape');
var standings = require('../');

test('rankBy can be property name of ranking value', function(t) {
  t.plan(6);

  var teams = [
    {score: 20},
    {score: 10},
    {score: 30}
  ];

  var rankings = standings(teams, 'score');

  t.equal(rankings[0].rank, 1);
  t.equal(rankings[0].item, teams[2]);
  t.equal(rankings[1].rank, 2);
  t.equal(rankings[1].item, teams[0]);
  t.equal(rankings[2].rank, 3);
  t.equal(rankings[2].item, teams[1]);
});

test('rankBy can be function returning ranking value', function(t) {
  t.plan(6);

  function rankBy(item) {
    return item.score;
  }

  var teams = [
    {score: 20},
    {score: 10},
    {score: 30}
  ];

  var rankings = standings(teams, rankBy);

  t.equal(rankings[0].rank, 1);
  t.equal(rankings[0].item, teams[2]);
  t.equal(rankings[1].rank, 2);
  t.equal(rankings[1].item, teams[0]);
  t.equal(rankings[2].rank, 3);
  t.equal(rankings[2].item, teams[1]);
});

test('items with one tie', function(t) {
  t.plan(6);

  var teams = [
    {score: 30},
    {score: 10},
    {score: 30}
  ];

  var rankings = standings(teams, 'score');

  t.equal(rankings[0].rank, 1);
  t.equal(rankings[0].item, teams[0]);
  t.equal(rankings[1].rank, 1);
  t.equal(rankings[1].item, teams[2]);
  t.equal(rankings[2].rank, 3);
  t.equal(rankings[2].item, teams[1]);
});

test('items with multiple ties', function(t) {
  t.plan(14);

  var teams = [
    {score: 60}, // 1st tie
    {score: 60}, // 1st tie
    {score: 50},
    {score: 40},
    {score: 30}, // 2nd tie
    {score: 30}, // 2nd tie
    {score: 20}
  ];

  var rankings = standings(teams, 'score');

  t.equal(rankings[0].rank, 1);
  t.equal(rankings[0].item, teams[0]);

  t.equal(rankings[1].rank, 1);
  t.equal(rankings[1].item, teams[1]);

  t.equal(rankings[2].rank, 3);
  t.equal(rankings[2].item, teams[2]);

  t.equal(rankings[3].rank, 4);
  t.equal(rankings[3].item, teams[3]);

  t.equal(rankings[4].rank, 5);
  t.equal(rankings[4].item, teams[4]);

  t.equal(rankings[5].rank, 5);
  t.equal(rankings[5].item, teams[5]);

  t.equal(rankings[6].rank, 7);
  t.equal(rankings[6].item, teams[6]);
});

test('items with 3-way tie', function(t) {
  t.plan(10);

  var teams = [
    {score: 70},
    {score: 60},
    {score: 60},
    {score: 60},
    {score: 30}
  ];

  var rankings = standings(teams, 'score');

  t.equal(rankings[0].rank, 1);
  t.equal(rankings[0].item, teams[0]);

  t.equal(rankings[1].rank, 2);
  t.equal(rankings[1].item, teams[1]);

  t.equal(rankings[2].rank, 2);
  t.equal(rankings[2].item, teams[2]);

  t.equal(rankings[3].rank, 2);
  t.equal(rankings[3].item, teams[3]);

  t.equal(rankings[4].rank, 5);
  t.equal(rankings[4].item, teams[4]);
});

test('items array is not reordered', function(t) {
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

test('does not add rank property to item (as of 2.0.0)', function(t) {
  t.plan(1);

  var teams = [
    {score: 30, name: 'A'},
    {score: 10, name: 'B'},
    {score: 30, name: 'C'}
  ];

  standings(teams, 'score');

  t.deepEqual(teams[0], {score: 30, name: 'A'});
});
