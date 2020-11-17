# imagemin-avifenc

> unofficial (experimental) avifenc imagemin plugin, using `avifenc` from [AOMedia's libavif](https://github.com/AOMediaCodec/libavif).


## Install

```
$ npm install --save vheemstra/imagemin-avifenc
```


## Usage

```js
const imagemin = require('imagemin');
const imageminAvifenc = require('vheemstra/imagemin-avifenc');

(async () => {
	await imagemin(['images/*.{jpg,jpeg,png}'], {
		destination: 'build/images',
		plugins: [
			imageminAvifenc()
		]
	});

	console.log('Images optimized');
})();
```


## API

### imageminAvifenc([options])(buffer)

Returns a promise for a buffer.

#### options

***TODO***
##### progressive

Type: `boolean`<br>
Default: `false`

Lossless conversion to progressive.

##### arithmetic

Type: `boolean`<br>
Default: `false`

Use [arithmetic coding](http://en.wikipedia.org/wiki/Arithmetic_coding).

#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
[libavif](https://github.com/AOMediaCodec/libavif) © 2019 Joe Drago (Released under the BSD License.)
