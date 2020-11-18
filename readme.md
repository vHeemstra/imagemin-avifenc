# imagemin-avifenc

> AVIF encoding [imagemin](https://github.com/imagemin/imagemin) plugin using `avifenc` from [AOMedia's libavif](https://github.com/AOMediaCodec/libavif).

***Note: At the moment, only Windows is supported.***

*But if you are more familiar with Cmake and building binaries, feel free to have a look at [AOMedia's libavif](https://github.com/AOMediaCodec/libavif) and send your binaries using pull requests to the [`avifenc-bin`](https://github.com/vheemstra/avifenc-bin) repository!*


## Install

```
$ npm install --save @vheemstra/imagemin-avifenc
```


## Usage

```js
const imagemin = require('imagemin');
const imageminAvifenc = require('@vheemstra/imagemin-avifenc');

(async () => {
	await imagemin(['images/*.{jpg,jpeg,png}'], {
		destination: 'build/images',
		plugins: [
			imageminAvifenc()
		]
	});

	console.log('Images converted!');
})();
```


## API

### imageminAvifenc(options?)(buffer)

Returns a `Promise<Buffer>` with the converted image.

#### options

Type: `object`

For full option description, see [avifenc's `syntax` method](https://github.com/AOMediaCodec/libavif/blob/master/apps/avifenc.c#L46)

##### lossless

Type: `boolean`<br>
Default: `false`

Lossless conversion.

##### depth

Type: `number`<br>
Default: taken from input image

Output depth (`8`, `10` or `12`).

##### jobs

Type: `number`<br>
Default: `1`

Number of worker thread jobs.

##### min

Type: `number`<br>
Default: `0`

Set min quantizer for color (`0` to `63`, where `0` is lossless).

##### max

Type: `number`<br>
Default: `10`

Set max quantizer for color (`0` to `63`, where `0` is lossless).

##### minalpha

Type: `number`<br>
Default: `0`

Set min quantizer for alpha (`0` to `63`, where `0` is lossless).

##### maxalpha

Type: `number`<br>
Default: `0`

Set max quantizer for alpha (`0` to `63`, where `0` is lossless).

##### tilerowslog2

Type: `number`<br>
Default: `0`

Set log2 of number of tile rows (`0` to `6`).

##### tilecolslog2

Type: `number`<br>
Default: `0`

Set log2 of number of tile columns (`0` to `6`).

##### cicp

Type: `array` of `number`s<br>
Default: `null`

Set CICP values (nclx colr box). Order of enums: avifColorPrimaries, avifTransferCharacteristics, avifMatrixCoefficients.<br>
Use `2` for any you wish to leave unspecified.

##### nclx

Synonym for **cicp**

##### range

Type: `string`<br>
Default: `full`

YUV range (`full` or `limited`).

##### yuv

Type: `number`<br>
Default: `444`

Output format (`444`, `422`, `420` or `400`).

##### speed

Type: `number` or `'default'`<br>
Default: `8`

Encoder speed (slowest `0` to fastest `10`). For codec internal defaults set to `'default'`.

##### codec

Type: `string`<br>
Default: `aom`

AV1 codec to use, choose from:
* `aom` - version 2.0.0

##### exif

Type: `string`<br>
Default: `null`

Provide an absolute path to Exif metadata payload file to be associated with the primary item.

##### xmp

Type: `string`<br>
Default: `null`

Provide an absolute path to XMP metadata payload file to be associated with the primary item.

##### icc

Type: `string`<br>
Default: `null`

Provide an absolute path to ICC profile payload file to be associated with the primary item.

##### ignore-icc

Type: `boolean`<br>
Default: `false`

If the input file contains an embedded ICC profile, ignore it (no-op if absent).

##### pasp

Type: `array` of 2 `number`s<br>
Default: `null`

Set aspect ratio. Order: Horizontal spacing, Vertical spacing.

##### clap

Type: `array` of 8 `number`s<br>
Default: `null`

Set clean aperture. Order: Width, Height, HOffset, VOffset (in num/denom pairs).

##### irot

Type: `number`<br>
Default: `null`

Set rotation (`0` to `3`). Makes (90 * irot) degree rotation anti-clockwise. Default: no rotation.

##### imir

Type: `number`<br>
Default: `null`

Set mirroring (`0` = vertical or `1` = horizontal). Default: no mirroring.

##### advanced

Type: `object`<br>
Default: `null`

Object containing codec-specific key/value pairs to pass directly to the codec.<br>
For `aom` these can be:
```
{
  'aq-mode': ...,              // Adaptive quantization mode (0: off (default), 1: variance, 2: complexity, 3: cyclic refresh)
  'cq-level': ...,             // Constant/Constrained Quality level (0-63, end-usage must be set to cq or q)
  'enable-chroma-deltaq': ..., // Enable delta quantization in chroma planes (0: disable (default), 1: enable)
  'end-usage': ...,            // Rate control mode (vbr, cbr, cq, or q)
  'sharpness': ...,            // Loop filter sharpness (0-7, default: 0)
  'tune': ...                  // Tune the encoder for distortion metric (psnr or ssim, default: psnr)
}
```

#### buffer

Type: `Buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)<br>
[libavif](https://github.com/AOMediaCodec/libavif) © 2019 Joe Drago (Released under the BSD License.)<br>
This package is made by [Philip van Heemstra](https://github.com/vHeemstra)<br>
Based on [imagemin-jpegtran](https://github.com/imagemin/imagemin-jpegtran) by [Sindre Sorhus](https://github.com/sindresorhus)
