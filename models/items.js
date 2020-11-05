const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    img: {type: String, default: 'https://cdn11.bigcommerce.com/s-dcsloyymm7/stencil/1ec41ef0-865c-0137-a020-0242ac11000d/e/9ef6a820-929e-0138-836c-0242ac110012/icons/icon-no-image.svg'},
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