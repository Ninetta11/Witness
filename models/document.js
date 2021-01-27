const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    // the hash received back from the blockchain as confirmation of record
    hash: { type: Schema.Types.Mixed, required: true, immutable: true },
    // the declarants blockchain address 
    declarant: { type: Schema.Types.Mixed, required: true, immutable: true },
    // the requestors blockchain address
    requestor: { type: Schema.Types.Mixed, required: false, immutable: true },
});

const document = mongoose.model("Document", documentSchema);

module.exports = document;