#!/usr/bin/env node
import {promisify} from 'node:util';
import stream from 'node:stream';
import process from 'node:process';
import meow from 'meow';
import {readableNoopStream, writableNoopStream} from 'noop-stream';

const streamPipeline = promisify(stream.pipeline);

meow(`
	Examples
	  $ dev-null | cat
	  $ echo '🦄' | dev-null
`, {
	importMeta: import.meta,
});

(async () => {
	const promise = process.stdin.isTTY
		? streamPipeline(readableNoopStream(), process.stdout)
		: streamPipeline(process.stdin, writableNoopStream());

	await promise;
})();
