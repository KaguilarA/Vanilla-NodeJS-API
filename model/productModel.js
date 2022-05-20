import getFileData from './../shared/loadData.js';
import setFileData from './../shared/writeData.js';

class ProductModel {

	get #fileUrl() {
		return './../data/products.json';
	}

	async create(data) {
		const list = await this.findAll();
		data.id = list.length + 1;
		list.push(data);
		await setFileData(this.#fileUrl, list);
		return data;
	}

	async findAll() {
		return await getFileData(this.#fileUrl);
	}

	async findById(id) {
		const data = await this.findAll();
		return data.find(p => p.id === id);
	}

	async remove(id) {
		const newData = (await this.findAll()).filter(p => p.id !== id);
		return await setFileData(this.#fileUrl, newData);
	}

	async update(id, data) {
		const allData = await this.findAll();
		const oldData = await this.findById(id);
		const newData = { ...oldData, ...data };
		const index = allData.findIndex(p => p.id === id);
		allData[index] = newData;
		await setFileData(this.#fileUrl, allData);
		return newData;
	}

}

export { ProductModel as default}