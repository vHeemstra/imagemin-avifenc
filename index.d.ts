// Type definitions for @vheemstra/imagemin-avifenc 2.0.0
// Project: https://github.com/vheemstra/imagemin-avifenc#readme
// Definitions by: Philip van Heemstra <https://github.com/vheemstra>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { Plugin } from 'imagemin';

/**
 * Avif imagemin plugin
 */
export default function imageminAvifenc(options?: Options): Plugin;

export type CicpOrNclx = { p: number, t: number, m: number }
| { p: number, t: number }
| { p: number, m: number }
| { t: number, m: number }
| [ number, number, number ]

/**
 * `pasp` option array:
 * [
 *   Horizontal spacing,
 *   Vertical spacing,
 * ]
 */
export type PaspOption = [
	number,
	number,
]

/**
 * `clap` option array:
 * [
 *   Width Num,
 *   Width Denom,
 *   Height Num,
 *   Height Denom,
 *   Horizontal Offset Num,
 *   Horizontal Offset Denom,
 *   Vertical Offset Num,
 *   Vertical Offset Denom,
 * ]
 */
export type ClapOption = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
]

/**
 * `crop` option array:
 * [ X, Y, Width, Height ]
 */
export type CropOption = [
	number,
	number,
	number,
	number,
]

export type AdvancedOption = {
	[key: string]: string | number | boolean
}

export interface Options {
	/**
	 * Number of jobs (worker threads).
	 * Use "all" to use all available cores.
	 * @default 1
	 */
	jobs?: number | 'all'

	/**
	 * Set all defaults to encode losslessly,
	 * and emit warnings when settings/input don't allow for it.
	 */
	lossless?: boolean

	/**
	 * Output depth.
	 */
	depth?: 8 | 10 | 12

	/**
	 * Output format.
	 * For JPEG, auto honors the JPEG's internal format, if possible.
	 * For all other cases, auto defaults to 444.
	 * @default 'auto'
	 */
	yuv?: 'auto' | 444 | 422 | 420 | 400

	/**
	 * Premultiply color by the alpha channel and signal this in the AVIF.
	 */
	premultiply?: boolean

	/**
	 * Use sharp RGB to YUV420 conversion (if supported).
	 * Ignored if output is not 420.
	 */
	sharpyuv?: boolean

	/**
	 * Set CICP values (nclx colr box).
	 *
	 * .p = Color primaries
	 * .t = Transfer characteristics
	 * .m = Matrix coefficients
	 * (use 2 for any you wish to leave unspecified)
	 *
	 * Use `range` option to set range flag.
	 */
	cicp?: CicpOrNclx

	/**
	 * Synonym for `cicp` option.
	 */
	nclx?: CicpOrNclx

	/**
	 * YUV range (JPEG/PNG only).
	 * @default 'full'
	 */
	range?: 'limited' | 'l' | 'full' | 'f'

	/**
	 * Set quality for color (0-100, where 100 is lossless).
	 */
	q?: number

	/**
	 * Set quality for color (0-100, where 100 is lossless).
	 */
	qcolor?: number

	/**
	 * Set quality for alpha (0-100, where 100 is lossless).
	 */
	qalpha?: number

	/**
	 * Set log2 of number of tile rows (0-6).
	 * @default 0
	 */
	tilerowslog2?: number

	/**
	 * Set log2 of number of tile columns (0-6).
	 * @default 0
	 */
	tilecolslog2?: number

	/**
	 * Set `tilerowslog2` and `tilecolslog2` options automatically.
	 */
	autotiling?: boolean

	// TODO: grid
	// grid?: [ number, number ]

	/**
	 * Encoder speed, 0 (slowest) to 10 (fastest).
	 * Or 'default' / 'd' for codec internal defaults.
	 * @default 6
	 */
	speed?: number | 'd' | 'default'

	/**
	 * AV1 codec to use.
	 * (choose from list in versions info)
	 * @default 'aom'
	 */
	codec?: string

	/**
	 * Provide an Exif metadata payload to be associated with
	 * the primary item (implies `ignore_exif` option).
	 */
	exif?: string

	/**
	 * Provide an XMP metadata payload to be associated with
	 * the primary item (implies `ignore_xmp` option).
	 */
	xmp?: string

	/**
	 * Provide an ICC profile payload to be associated with
	 * the primary item (implies `ignore_icc` option).
	 */
	icc?: string

	/**
	 * If the input file contains embedded Exif metadata,
	 * ignore it (no-op if absent).
	 */
	ignore_exif?: boolean

	/**
	 * If the input file contains embedded XMP metadata,
	 * ignore it (no-op if absent).
	 */
	ignore_xmp?: boolean

	/**
	 * If the input file contains an embedded ICC profile,
	 * ignore it (no-op if absent).
	 */
	ignore_icc?: boolean

	/**
	 * Set all following frame durations (in timescales) to D.
	 * @default 1
	 */
	duration?: number

	/**
	 * Set the timescale to V.
	 * If all frames are 1 timescale in length,
	 * this is equivalent to frames per second.
	 * If neither duration nor timescale are set,
	 * avifenc will attempt to use the framerate stored in a y4m header, if present.
	 */
	timescale?: number

	/**
	 * Set frames per second.
	 * @default 30
	 */
	fps?: number

	/**
	 * Set the forced keyframe interval (maximum frames between keyframes).
	 * Set to 0 to disable (default).
	 * @default 0
	 */
	keyframe?: number

	/**
	 * Set aspect ratio.
	 * [Horizontal spacing, Vertical spacing]
	 * So an array of 2 numbers.
	 */
	pasp?: PaspOption

	/**
	 * Set clean aperture.
	 * Width, Height, HOffset, VOffset (in num/denom pairs)
	 * So an array of 8 numbers.
	 */
	clap?: ClapOption

	/**
	 * Set clean aperture, but calculated from a crop rectangle.
	 * [X, Y, Width, Height]
	 * So an array of 4 numbers.
	 */
	crop?: CropOption

	/**
	 * Set rotation angle (0-3).
	 * Makes (90 * ANGLE) degree rotation anti-clockwise.
	 */
	irot?: number

	/**
	 * Set mirroring mode.
	 * 0=top-to-bottom, 1=left-to-right
	 */
	imir?: 0 | 1

	/**
	 * Number of times an animated image sequence will be repeated.
	 * Use 'infinite' for infinite repetitions.
	 * @default 'infinite'
	 */
	repetition_count?: number | 'infinite'

	/**
	 * Set min quantizer for color (0-63, where 0 is lossless).
	 */
	min?: number

	/**
	 * Set max quantizer for color (0-63, where 0 is lossless).
	 */
	max?: number

	/**
	 * Set min quantizer for alpha (0-63, where 0 is lossless).
	 */
	minalpha?: number

	/**
	 * Set max quantizer for alpha (0-63, where 0 is lossless).
	 */
	maxalpha?: number

	/**
	 * Pass an advanced, codec-specific key/value string pair
	 * directly to the codec.
	 * Avifenc will warn on any not used by the codec.
	 */
	advanced?: AdvancedOption
}
