# standings

Figure out 1st place, 2nd place, etc.

## Example

Adds rank property to each item in array.

```
var standings = require('standings');

var teams = [
  {score: 20, name: 'Team A'},
  {score: 30, name: 'Team B'},
  {score: 20, name: 'Team C'},
  {score: 10, name: 'Team D'}
];

standings(teams, 'score');

teams[0].rank // => 2
teams[1].rank // => 1
teams[2].rank // => 2
teams[3].rank // => 4
```

## Install

```
npm install standings
```

## License

MIT