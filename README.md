# standings

Figure out 1st place, 2nd place, etc.

## API

### standings(array, rankBy)

Adds rank property to each item in array.

#### array

Array of objects to rank.

#### rankBy

Name of number property to rank objects by.

## Example

```
var standings = require('standings');

var teams = [
  {score: 20, name: 'Team A'},
  {score: 30, name: 'Team B'},
  {score: 20, name: 'Team C'},
  {score: 10, name: 'Team D'}
];

standings(teams, 'score');

teams.forEach(function(team) {
  console.log(team.name + ' ranks ' + team.rank);
});
```

will print

```
Team A ranks 2
Team B ranks 1
Team C ranks 2
Team D ranks 4
```

## Install

```
npm install standings
```

## License

MIT