'use strict';
const execBuffer = require('exec-buffer');
const tempfile = require('tempfile');
const isJpg = require('is-jpg');
const isPng = require('is-png');
const avifenc = require('avifenc-bin');

module.exports = options => buf => {
	options = {...options};

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isJpg(buf) && !isPng(buf)) {
		return Promise.resolve(buf);
	}

	// See: https://github.com/AOMediaCodec/libavif/blob/master/apps/avifenc.c#L46
	const args = [];

	if (typeof options.jobs === 'number') {
		args.push('-j', options.jobs);
	}
	if (options.lossless) {
		args.push('-l');
	}
	if (typeof options.depth === 'number') {
		args.push('-d', options.depth);
	}
	if (typeof options.yuv === 'number') {
		args.push('-y', options.jobs);
	}
	
	if (typeof options.cicp === 'string') {
		args.push('--cicp', options.cicp);
	}
	if (typeof options.nclx === 'string') {
		args.push('--nclx', options.nclx);
	}
	if (typeof options.range === 'string') {
		args.push('-r', options.range.substring(0,1).toLowerCase());
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

	if (typeof options.tilerowslog2 === 'number') {
		args.push('--tilerowslog2', options.tilerowslog2);
	}
	if (typeof options.tilecolslog2 === 'number') {
		args.push('--tilecolslog2', options.tilecolslog2);
	}

	if (typeof options.speed === 'number') {
		args.push('-s', options.speed);
	} else if (typeof options.speed === 'string') {
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
		if (Array.isArray(options.advanced)) {
			options.advanced.forEach((v) => {
				args.push('-a', v);
			});
		} else {
			Object.keys(options.advanced).forEach((k) => {
				if (typeof options.advanced[k] === 'number' || 0 < options.advanced[k].length) {
					args.push('-a', k + "=" + options.advanced[k]);
				} else {
					args.push('-a', k);
				}
			});
		}
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

	if (options.ignore_icc) {
		args.push('--ignore-icc');
	}

	if (typeof options.pasp === 'object' && Array.isArray(options.pasp)) {
		args.push('--pasp', options.pasp.join(','));
	}

	if (typeof options.clap === 'object' && Array.isArray(options.clap)) {
		args.push('--clap', options.clap.join(','));
	}

	if (typeof options.irot === 'number') {
		args.push('--irot', options.irot);
	}

	if (typeof options.imir === 'number') {
		args.push('--imir', options.imir);
	}

	args.push('-o', execBuffer.output, execBuffer.input);

	return execBuffer({
		input: buf,
		bin: avifenc,
		args
	}).catch(error => {
		error.message = error.stderr || error.message;
		throw error;
	});
};
