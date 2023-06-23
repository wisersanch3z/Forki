const { model, Schema } = require("mongoose");

const sampSchema = new Schema({
  guildId: { type: String, require: true },
  ip: { type: String, require: true },
  port: { type: String, require: true },
});


module.exports = model("samp", sampSchema);
