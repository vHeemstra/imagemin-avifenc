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

	if (isJpg(buf)) {
		const input_filename = tempfile('.jpg');
	} else if (isPng(buf)) {
		const input_filename = tempfile('.png');
	} else {
		return Promise.resolve(buf);
	}

	// TODO: all options
	const args = [];

	if (options.lossless) {
		args.push('--lossless');
	}

	args.push('--output', execBuffer.output, execBuffer.input);

	return execBuffer({
		input: buf,
		inputPath: input_filename,
		outputPath: tempfile('.avif'),
		bin: avifenc,
		args
	}).catch(error => {
		error.message = error.stderr || error.message;
		throw error;
	});
};
