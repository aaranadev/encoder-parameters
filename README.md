#Encoder Parameters

## Installation

If you are using yarn
```sh
yarn add @albertoarana/encoder-parameters
```

or npm
```sh
npm install @albertoarana/encoder-parameters --save
```

## Use
### Without serialize

```js
import encoderParameters from '@albertoarana/encoder-parameters';

const params = {
  name: 'Alberto',
  lastname: 'Arana'
};

encoderParameters(params);
// ouput: ?name=Alberto&lastname=Arana
```

### With serialize

```js
import encoderParameters from '@albertoarana/encoder-parameters';

const serialize = {
  name: 'filterName',
  lastname: 'filterLastName'
};

const params = {
  name: 'Alberto',
  lastname: 'Arana'
};

encoderParameters(params, serialize);
// ouput: ?filterName=Alberto&filterLastName=Arana
```

## Important

Currently Set or Map elements are not supported directly. For use these elements it is necessary transform their values into an array.

```js
const map = new Map();

map.set(1, 1);
map.set(2, 2);

const params = {
  map: [...map.values()]
}
```
