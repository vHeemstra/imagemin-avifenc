'use strict';
const execBuffer = require('exec-buffer');
const isJpg = require('is-jpg');
const isPng = require('is-png');
const avifenc = require('@vheemstra/avifenc-bin');

module.exports = options => buf => {
	options = {...options};

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isJpg(buf) && !isPng(buf)) {
		return Promise.resolve(buf);
	}

	// TODO: all options
	const args = [];

	if (options.lossless) {
		args.push('--lossless');
	}

	args.push(execBuffer.input, '--output', execBuffer.output);

	return execBuffer({
		input: buf,
		bin: avifenc,
		args
	}).catch(error => {
		error.message = error.stderr || error.message;
		throw error;
	});
};
