const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Product', productSchema);