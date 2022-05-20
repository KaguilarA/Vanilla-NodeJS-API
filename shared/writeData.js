import { writeFile } from 'node:fs/promises';

async function setFileData(url, data) {
	return await writeFile(new URL(url, import.meta.url), JSON.stringify(data));
}

export { setFileData as default }