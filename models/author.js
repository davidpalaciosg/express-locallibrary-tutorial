var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date }
});

//Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
    // To avoid errors in cases where an author does not have either a family name or first name
    // We want to make sure we handle the exception by returning an empty string for that case

    var fullName = '';
    if(this.first_name && this.family_name){
        fullName = this.family_name + ', ' + this.first_name;
    }
    if(!this.first_name || !this.family_name){
        fullName = '';
    }
    return fullName;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
    let lifetime_string='';
    if(this.date_of_birth)
    {
        lifetime_string = this.date_of_birth.getFullYear().toString();
    }
    return lifetime_string;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
    return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);