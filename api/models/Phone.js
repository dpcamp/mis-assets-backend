const mongoose = require('mongoose'), 
Schema = mongoose.Schema; 

//create schema
const phoneSchema = new Schema({
    number: String, 
    slug: {
        type: String, 
        unique: true
    },
    location: String, 
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: false },
    function: String,
//    model: String,
//    lineType: String,
//    ldProvider: String,
//    dropNum: String,
//    portNum: String,
//    extension: String,
//    vmID: String,
//    binding: String,
//    provider: String,
//    monthlyCost: String,
//    dateInstalled: String,
});
//middleware -- 
phoneSchema.pre('save', function(next) {
    this.slug = slugify(this.number);
    next();
});

//create model
const phoneModel = mongoose.model('Phone', phoneSchema);

//export model 
module.exports = phoneModel;

// function to slugify a name
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}