import { readFile } from 'node:fs/promises';

async function getFileData(url) {
	return JSON.parse(await readFile(new URL(url, import.meta.url)));
}

export { getFileData as default }