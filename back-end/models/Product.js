const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;