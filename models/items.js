const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, default: 0},
    category: {type: String, required: true, default: 'Uncategorized'},
    make: String,
    model: String,
    item_id: String,
    location: String,
    units: Number, 
    insured: Boolean
});

const Items = mongoose.model('Item', itemSchema);

module.exports = Items;