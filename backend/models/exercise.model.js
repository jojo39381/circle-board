const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({

    id: Number,
    category: String,
    tasks:[{content: {type: String},
        assigned: {type: String},
        date: {type: String},
        color: {type: String}}]
    
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
