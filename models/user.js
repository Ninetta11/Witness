const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DocumentSchema = require('./document');

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 30 },
  last_name: { type: String, required: true, maxlength: 30 },
  state: { type: String, required: true, enum: ["VIC", "NSW", "QLD", "ACT", "TAS", "WA", "NT", "SA"] },
  postcode: { type: Number, required: true, minlength: 4, maxlength: 4 },
  suburb: { type: String, required: true },
  street: { type: String, required: true },
  street_no: { type: Schema.Types.Mixed, required: true },
  occupation: { type: String, required: true },
  email: { type: Schema.Types.Mixed, required: true, immutable: true },
  password: { type: Schema.Types.Mixed, required: true },
  IOTA_address: { type: Schema.Types.Mixed, required: true, immutable: true },
  IOTA_seed: { type: Schema.Types.Mixed, required: true, immutable: true },
  documents: [DocumentSchema],
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
