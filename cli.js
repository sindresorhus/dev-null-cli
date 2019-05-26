#!/usr/bin/env node
'use strict';
const {promisify} = require('util');
const stream = require('stream');
const meow = require('meow');
const {readableNoopStream, writableNoopStream} = require('noop-stream');

const streamPipeline = promisify(stream.pipeline);

meow(`
	Examples
	  $ dev-null | cat
	  $ echo '🦄' | dev-null
`);

(async () => {
	if (process.stdin.isTTY) {
		await streamPipeline(readableNoopStream(), process.stdout);
	} else {
		await streamPipeline(process.stdin, writableNoopStream());
	}
})();
