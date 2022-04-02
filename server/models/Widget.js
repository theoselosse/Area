const { exists } = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const widgetSchema = new Schema ({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        unique: false
    },
    parameter: {
        type: String,
        required: true,
        unique: false
    },
    exists: {
        type: Boolean,
        required: false,
        unique: false
    }
});

const Widget = mongoose.model('widget', widgetSchema);

module.exports = Widget;
