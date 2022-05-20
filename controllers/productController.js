import model from './../model/productModel.js';
import bodyReader from './../shared/bodyReader.js';

class ProductController {
	#model = new model()

	async create(req, res) {
		try {
			const body = await bodyReader(req);
			const data = await this.#model.create(body);
			res.writeHead(201, {
				'Content-Type': 'application/json'
			});
			return res.end(JSON.stringify(data));
		} catch (error) {
			console.error(error);
		}
	}

	async getAll(req, res) {
		try {
			const data = await this.#model.findAll();
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			return res.end(JSON.stringify(data));
		} catch (error) {
			console.error(error);
		}
	}

	async getById(req, res, id) {
		const product = await this.#model.findById(Number(id));
		let data;
		if (product) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			data = product;
		} else {
			res.writeHead(404, {
				'Content-Type': 'application/json'
			});
			data = {
				message: 'Product not found'
			};
		}

		return res.end(JSON.stringify(data));
	}

	async remove(req, res, id) {
		const product = await this.#model.findById(Number(id));
		let data;
		if (product) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			await this.#model.remove(Number(id));
			data = {
				message: `Product ${id} removed`
			};
		} else {
			res.writeHead(404, {
				'Content-Type': 'application/json'
			});
			data = {
				message: 'Product not found'
			};
		}

		return res.end(JSON.stringify(data));
	}

	async update(req, res, id) {
		try {
			const product = await this.#model.findById(Number(id));
			let data;
			if (product) {
				const body = await bodyReader(req);
				const updData = await this.#model.update(Number(id), body);
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				data = updData;
			} else {
				res.writeHead(404, {
					'Content-Type': 'application/json'
				});
				data = {
					message: 'Product not found'
				};
			}
			return res.end(JSON.stringify(data));
		} catch (error) {
			console.error(error);
		}
	}

}

export { ProductController as default }