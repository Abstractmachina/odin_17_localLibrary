const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { DateTime } = require('luxon');

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100},
    family_name: { type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function() {
    // To avoid errors in cases where an author does not have either a family name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    let fullName = '';
    if (this.first_name && this.family_name) {
        fullName = `${this.family_name}, ${this.first_name}`;
    }
    if (!this.first_name || !this.family_name) {
        fullName = '';
    }

    return fullName;
})

// Virtual for author's URL
AuthorSchema.virtual("url").get(function() {
     // We don't use an arrow function as we'll need the this object
     return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function() {
    if (!this.date_of_birth) return 'N/A';
    return DateTime.fromJSDate(this.date_of_birth).toISODate();
})

AuthorSchema.virtual("date_of_death_formatted").get(function() {
    if (!this.date_of_death) return 'N/A';
    return DateTime.fromJSDate(this.date_of_death).toISODate();
})

module.exports = mongoose.model("Author", AuthorSchema);