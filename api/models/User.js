const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
    phone: {type: Schema.Types.ObjectId, ref: 'Phone', required: false }
});

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
