import {promises as fs} from 'node:fs';
// import isJpg from 'is-jpg';
// import isPng from 'is-png';
import test from 'ava';
import imageminAvif from './index.js';

// TODO: better testing
test('convert a JPG into AVIF', async t => {
	const buffer = await fs.readFile(new URL('fixture.jpg', import.meta.url));
	const data = await imageminAvif()(buffer);
	// t.true(data.length < buffer.length);
	// t.true(isJpg(data));
	t.true(data.length > 0);
});

// test('throw error when a JPG is corrupt', async t => {
// 	const buffer = await fs.readFile(new URL('fixture-corrupt.jpg', import.meta.url));
// 	await t.throwsAsync(async () => {
// 		await imageminAvif()(buffer);
// 	}, {message: /Corrupt JPEG data/});
// });
