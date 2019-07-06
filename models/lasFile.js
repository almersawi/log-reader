const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lasSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    headers: {
        type: Array,
        required: true
    },
    headersDesc: {
        type: Object,
        required: true
    },
    finalData: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Lasfile', lasSchema);
