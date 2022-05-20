import http from 'node:http';
import ProductsRoutes from './routers/productRoutes.js';

const PORT = process.env.PORT || 3000;


const server = http.createServer(async (req, res) => {
  const prodRoutes = new ProductsRoutes(req, res);

  console.log('prodRoutes: ', prodRoutes);

});

server.listen(PORT, () => console.log('Server Up'))
