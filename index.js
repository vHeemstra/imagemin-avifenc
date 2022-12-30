import {Buffer} from 'node:buffer';
import execBuffer from 'exec-buffer';
import isJpg from 'is-jpg';
import isPng from 'is-png';
import avifenc from '@vheemstra/avifenc-bin';

const imageminWebp = (options = {}) => input => {
	options = {...options};

	if (!Buffer.isBuffer(input)) {
		return Promise.reject(new TypeError(`Expected \`input\` to be of type \`Buffer\` but received type \`${typeof input}\``));
	}

	if (!isJpg(input) && !isPng(input)) {
		return Promise.resolve(input);
	}

	// See: https://github.com/AOMediaCodec/libavif/blob/master/apps/avifenc.c#L51
	const args = [];

	if (
		typeof options.jobs === 'number' ||
		(typeof options.jobs === 'string' && options.jobs === 'all')
	) {
		args.push('-j', options.jobs);
	}
	if (options.lossless) {
		args.push('-l');
	}
	if (typeof options.depth === 'number') {
		args.push('-d', options.depth);
	}
	if (typeof options.yuv === 'number') {
		args.push('-y', options.yuv);
	}
	if (options.premultiply) {
		args.push('-p');
	}
	if (options.sharpyuv) {
		args.push('--sharpyuv');
	}

	if (typeof options.cicp === 'object' && Array.isArray(options.cicp) && options.cicp.length == 3) {
		args.push('--cicp', options.cicp.join('/'));
	}
	if (typeof options.nclx === 'object' && Array.isArray(options.nclx) && options.nclx.length == 3) {
		args.push('--nclx', options.nclx.join('/'));
	}
	if (typeof options.range === 'string') {
		args.push('-r', options.range.substring(0,1).toLowerCase());
	}

	if (
		typeof options.q === 'number' ||
		typeof options.qcolor === 'number'
	) {
		const q = (
			typeof options.q === 'number' &&
			options.q >= 0 &&
			options.q <= 100
		) ? options.q : -1;

		const qcolor = (
			typeof options.qcolor === 'number' &&
			options.qcolor >= 0 &&
			options.qcolor <= 100
		) ? options.qcolor : q;
		if (qcolor >= 0) {
			args.push('--qcolor', qcolor);
		}
	}
	if (
		typeof options.qalpha === 'number' &&
		options.qalpha >= 0 &&
		options.qalpha <= 100
	) {
		args.push('--qalpha', qalpha);
	}

	if (options.autotiling) {
		args.push('--autotiling');
	} else {
		if (typeof options.tilerowslog2 === 'number') {
			args.push('--tilerowslog2', options.tilerowslog2);
		}
		if (typeof options.tilecolslog2 === 'number') {
			args.push('--tilecolslog2', options.tilecolslog2);
		}
	}

	// TODO: -g, --grid MxN

	if (typeof options.speed === 'number') {
		// 0 - 10 (slowest - fastest; default: 6)
		args.push('-s', options.speed);
	} else if (typeof options.speed === 'string') {
		// 'default' or 'd'
		args.push('-s', options.speed.substring(0,1).toLowerCase());
	}

	if (typeof options.codec === 'string') {
		args.push('-c', options.codec);
	}

	if (typeof options.exif === 'string') {
		args.push('--exif', options.exif);
	}
	if (typeof options.xmp === 'string') {
		args.push('--xmp', options.xmp);
	}
	if (typeof options.icc === 'string') {
		args.push('--icc', options.icc);
	}

	if (typeof options.advanced === 'object') {
		Object.keys(options.advanced).forEach((k) => {
			if (typeof options.advanced[k] === 'boolean') {
				// args.push('-a', k + "=" + (options.advanced[k] ? '1' : '0'));
				args.push('-a', k);
			} else if (
				typeof options.advanced[k] === 'number'
				|| (typeof options.advanced[k] === 'string' && 0 < options.advanced[k].length)
			) {
				args.push('-a', k + "=" + options.advanced[k]);
			} else {
				args.push('-a', k);
			}
		});
	}

	if (typeof options.duration === 'number') {
		args.push('--duration', options.duration);
	}

	if (typeof options.timescale === 'number') {
		args.push('--timescale', options.timescale);
	}
	if (typeof options.fps === 'number') {
		args.push('--fps', options.fps);
	}

	if (typeof options.keyframe === 'number') {
		args.push('-k', options.keyframe);
	}

	if (options.ignore_exif) {
		args.push('--ignore-exif');
	}
	if (options.ignore_xmp) {
		args.push('--ignore-xmp');
	}
	if (options.ignore_icc) {
		args.push('--ignore-icc');
	}

	if (typeof options.pasp === 'object' && Array.isArray(options.pasp) && options.pasp.length === 2) {
		args.push('--pasp', options.pasp.join(','));
	}

	if (typeof options.crop === 'object' && Array.isArray(options.crop) && options.crop.length === 4) {
		args.push('--crop', options.crop.join(','));
	}
	if (typeof options.clap === 'object' && Array.isArray(options.clap) && options.clap.length === 8) {
		args.push('--clap', options.clap.join(','));
	}

	if (typeof options.irot === 'number') {
		args.push('--irot', options.irot);
	}

	if (typeof options.imir === 'number') {
		args.push('--imir', options.imir);
	}

	if (typeof options.repetition_count === 'number') {
		args.push('--repetition-count', options.repetition_count);
	} else if (typeof options.repetition_count === 'string' && options.repetition_count === 'infinite') {
		args.push('--repetition-count', options.repetition_count);
	}

	if (typeof options.min === 'number') {
		args.push('--min', options.min);
	}
	if (typeof options.max === 'number') {
		args.push('--max', options.max);
	}
	if (typeof options.minalpha === 'number') {
		args.push('--minalpha', options.minalpha);
	}
	if (typeof options.maxalpha === 'number') {
		args.push('--maxalpha', options.maxalpha);
	}

	args.push('-o', execBuffer.output, execBuffer.input);

	return execBuffer({
		input,
		bin: avifenc,
		args
	}).catch(error => {
		error.message = error.stderr || error.message;
		throw error;
	});
};

export default imageminWebp;
