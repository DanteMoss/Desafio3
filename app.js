import Express from "express";


import ProductManager from "./ProductManager.js"
const app = Express()

const productManager = new ProductManager('user.json'); // Ajusta la ruta del archivo de productos según tu configuración

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit; // Obtener el valor del query param "limit"
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }   
});

// Endpoint para obtener un producto por su id
app.get('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'El producto no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Puerto en el que escucha el servidor
const PORT = 8080;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});


