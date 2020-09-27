const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    },
    lat: {
        type: String,
        required: true,
        trim: true
    },
    long: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Photos', photoSchema);