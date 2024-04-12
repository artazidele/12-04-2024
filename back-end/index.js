const express = require('express');
const Product = require('./models/product');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();

// Middleware to let Front End acccess the Back End
app.use(cors());

// For getting Front End POST request
app.use(express.json());

app.use(methodOverride('__method'));

// Coonect to MongoDB
// Have to add <PASSWORD>
const dbURI = 'mongodb+srv://artazidele2:<PASSWORD>@cluster0.mpqdias.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then((result) => app.listen(3003))
    .catch((err) => console.log(err));

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 'desc' });
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(400).send('failure');
  }
});

// Get one product by id
app.get('/products/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(400).send('failure');
  }
});

// Add new product
app.post('/products', async (req, res) => {
  let product = new Product();
  product.title = req.body.title;
  product.description = req.body.description;
  try {
    product = await product.save();
    res.status(200).send('success');
  } catch (err) {
    console.log(err);
    res.status(400).send('failure');
  }
});

// Update one product by id
app.put('/products/:id', async (req, res) => {
  try{
    await Product.findOneAndUpdate(
      { id: req.params.id }, 
      { title: req.body.title, description: req.body.description},
      { new: true }
    );
    await Product.findByIdAndUpdate(req.params.id, 
      {
        "title": req.body.title,
        "description": req.body.description
      }
    );
    res.status(200).send('success');
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
});

// Delete one product by id
app.delete('/products/:id', async (req, res) => {
  try{
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).send('success');
  } catch (err) {
      console.log(err);
      res.status(400).send('failure');
  }
});

// Error page
app.use((req, res) => {
  res.status(400).send("Error");
})

module.exports = app;