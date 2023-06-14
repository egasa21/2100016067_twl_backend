const express = require('express');
const router = express.Router();


// Model produk
const Product = require('../models/product');

// Rute GET untuk mendapatkan semua produk
router.get('/', (req, res) => {
  try {
    const products = Product.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rute GET untuk mendapatkan produk berdasarkan ID
router.get('/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const product = Product.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... tambahkan rute lainnya untuk operasi CRUD
// Rute POST untuk membuat produk baru
router.post('/', (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = Product.createProduct(name, price);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rute PUT untuk memperbarui produk berdasarkan ID
router.put('/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price } = req.body;
    const updatedProduct = Product.updateProduct(productId, name, price);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Rute DELETE untuk menghapus produk berdasarkan ID
router.delete('/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const products = Product.getAllProducts();
    const index = products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      res.json({message: "Product deleted successfully"});
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
