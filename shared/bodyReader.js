import { parse } from 'node:querystring';

function bodyReader(req) {
	return new Promise((resolve, reject) => {
		try {
			let body = '';
			req.on('data', chunk => body += chunk.toString())
			req.on('end', () => resolve(parse(body)));
		} catch (error) {
			reject(error);
		}
	});
}

export { bodyReader as default }