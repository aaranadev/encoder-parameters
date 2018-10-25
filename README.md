<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  </head>
  <body>
    <div align="center">
        <h1>Encoder Parameters</h1>
        <br>
        <br>
        <p>
            <sub>Made with :heart: by people who loves code and JavaScript</sub>
        </p>
        <br>
    </div>
  </body>
</html>

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
