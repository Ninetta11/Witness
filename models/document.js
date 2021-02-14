const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    // the hash received back from the blockchain as confirmation of record
    hash: { type: Schema.Types.Mixed, immutable: true },
    title: { type: Schema.Types.Mixed, immutable: true },
    date: { type: Date, default: Date.now }
});

module.exports = DocumentSchema;