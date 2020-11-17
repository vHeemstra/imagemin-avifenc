const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
// const isJpg = require('is-jpg');
// const isPng = require('is-png');
const isProgressive = require('is-progressive');
const test = require('ava');
const m = require('.');

const readFile = promisify(fs.readFile);

// TODO: better testing
test('convert a JPG', async t => {
	const buf = await readFile(path.join(__dirname, 'fixture.jpg'));
	const data = await m()(buf);
	// t.true(data.length < buf.length);
	// t.true(isJpg(data));
	t.true(data.length > 0);
});

// test('throw error when a JPG is corrupt', async t => {
// 	const buf = await readFile(path.join(__dirname, 'fixture-corrupt.jpg'));
// 	await t.throwsAsync(async () => {
// 		await m()(buf);
// 	}, {message: /Corrupt JPEG data/});
// });

// test('progressive option', async t => {
// 	const buf = await readFile(path.join(__dirname, 'fixture.jpg'));
// 	const data = await m({progressive: true})(buf);
// 	t.true(isProgressive.buffer(data));
// });
