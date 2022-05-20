import controller from './../controllers/productController.js';

class ProductsRoutes {
  #baseLink = '/api/products';
  #controller = new controller();

  constructor(req, res) {

    if (req.url === this.#baseLink && req.method === 'GET') {
      this.#controller.getAll(req, res);
    
    } else if (req.url === this.#baseLink && req.method === 'POST') {
      this.#controller.create(req, res);

    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
      this.#controller.update(req, res, req.url.split('/')[3]);

    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
      this.#controller.getById(req, res, req.url.split('/')[3]);

    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
      this.#controller.remove(req, res, req.url.split('/')[3]);

    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  }
}

export { ProductsRoutes as default }