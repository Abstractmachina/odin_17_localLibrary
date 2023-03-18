const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: "Book", required: true},
    imprint: { type: String, required:true},
    status: {
        type: String,
        required:true,
        enum: ["Available", "Maintenance", "Loaned", "Reserved"],
        default: "Maintenance",
    },
    due_back: {type: Date, default: Date.now},
});

BookInstanceSchema.virtual("url").get(function () {
    return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATETIME_MED)
})

BookInstanceSchema.virtual("due_back_formatted_form").get( function () {
    return DateTime.fromJSDate(this.due_back).toFormat('yyyy-mm-dd')
    // DateTime.fromISO('2014-08-06T13:07:04.054').toFormat('yyyy LLL dd'); //=> '2014 Aug 06'
})

module.exports = mongoose.model("BookInstance", BookInstanceSchema);