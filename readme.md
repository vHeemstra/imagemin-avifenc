# imagemin-avifenc

> unofficial (experimental) avifenc imagemin plugin, using `avifenc` from [AOMedia's libavif](https://github.com/AOMediaCodec/libavif).

***Note: This is for Windows only (for now).***


## Install

```
$ npm install --save git+https://github.com/vHeemstra/imagemin-avifenc.git
```


## Usage

```js
const imagemin = require('imagemin');
const imageminAvifenc = require('imagemin-avifenc');

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

For full option description, see [avifenc's syntax](https://github.com/AOMediaCodec/libavif/blob/master/apps/avifenc.c#L46)

***TODO***

##### lossless

Type: `boolean`<br>
Default: `false`

Lossless conversion.

#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)<br>
[libavif](https://github.com/AOMediaCodec/libavif) © 2019 Joe Drago (Released under the BSD License.)
