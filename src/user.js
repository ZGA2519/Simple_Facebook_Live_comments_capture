const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
// mongoose.set('bufferTimeoutMS', 30000);

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
