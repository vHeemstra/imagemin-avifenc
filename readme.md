# imagemin-avifenc

> AVIF encoding [imagemin](https://github.com/imagemin/imagemin) plugin using `avifenc` from [AOMedia's libavif](https://github.com/AOMediaCodec/libavif).

## Install

```
$ npm install --save @vheemstra/imagemin-avifenc
```


## Usage

```js
import imagemin from 'imagemin';
import imageminAvifenc from '@vheemstra/imagemin-avifenc';

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

For full option description, see [avifenc's `syntax` method](https://github.com/AOMediaCodec/libavif/blob/main/apps/avifenc.c#L51)

##### jobs

Type: `number` or `'all'`<br>
Default: `1`

Number of jobs (worker threads). Use `'all'` to use all available cores.

##### lossless

Type: `boolean`<br>
Default: `false`

Set all defaults to encode losslessly, and emit warnings when settings/input don't allow for it.

##### depth

Type: `number`<br>
Default: taken from input image

Output depth (`8`, `10` or `12`).

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

##### qcolor

Type: `number`<br>

Set quality for color (`0` to `100`, where `100` is lossless).

##### qalpha

Type: `number`<br>

Set quality for alpha (`0` to `100`, where `100` is lossless).

##### tilerowslog2

Type: `number`<br>
Default: `0`

Set log2 of number of tile rows (`0` to `6`).

##### tilecolslog2

Type: `number`<br>
Default: `0`

Set log2 of number of tile columns (`0` to `6`).

##### autotiling

Type: `boolean`<br>

Set **tilerowslog2** and **tilecolslog2** automatically.

##### cicp

Type: `array` of `number`s<br>
Default: `null`

Set CICP values (nclx colr box). Order of enums: avifColorPrimaries, avifTransferCharacteristics, avifMatrixCoefficients.<br>
Use `2` for any you wish to leave unspecified.

##### nclx

Synonym for **cicp**

##### premultiply

Type: `boolean`<br>

Premultiply color by the alpha channel and signal this in the AVIF.

##### range

Type: `string`<br>
Default: `full`

YUV range (`full` or `limited`).

##### yuv

Type: `number` or `'auto'`<br>
Default: `'auto'`

Output format (`444`, `422`, `420` or `400`).<br>
For JPEG, `auto` honors the JPEG's internal format, if possible.<br>
For all other cases, `auto` defaults to `444`

##### sharpyuv

Type: `boolean`<br>

Use sharp RGB to YUV420 conversion (if supported). Ignored if output is not `420`.

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

##### ignore-exif

Type: `boolean`<br>
Default: `false`

If the input file contains embedded Exif metadata, ignore it (no-op if absent).

##### ignore-xmp

Type: `boolean`<br>
Default: `false`

If the input file contains embedded XMP metadata, ignore it (no-op if absent).

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

Set clean aperture.<br>
Order: Width, Height, HOffset, VOffset (in num/denom pairs).

##### crop

Type: `array` of 4 `number`s<br>
Default: `null`

Set clean aperture, but calculated from a crop rectangle.<br>
Order: X, Y, Width, Height.

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
