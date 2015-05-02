# standings

Figure out 1st place, 2nd place, etc.

## API

### standings(items, rankBy)

#### items

Array to create standings from. Array elements can be any type.

#### rankBy

Can be either

- string - Name of number property to rank items by.
- function(item) - returns value to rank item by.

#### Returns

Array of objects where each object looks like

```js
{
  item: <item from items parameter>,
  rank: number
}
```

The array is sorted in rank order (1, 2, 3, etc).

## Example

```js
var standings = require('standings');

var scores = [
  {score: 20, name: 'Amy'},
  {score: 30, name: 'Bob'},
  {score: 20, name: 'Chris'},
  {score: 10, name: 'Don'}
];

var rankings = standings(scores, 'score');
```

`rankings` looks like

```js
[{
  item: {score: 30, name: 'Bob'},
  rank: 1
}, {
  item: {score: 20, name: 'Amy'},
  rank: 2
}, {
  item: {score: 20, name: 'Chris'},
  rank: 2
}, {
  item: {score: 10, name: 'Don'},
  rank: 4
}]
```

## Install

```
npm install standings
```

## License

MIT