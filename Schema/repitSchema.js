const { model, Schema } = require("mongoose");
 
let repitSchema = new Schema({
    Guild: String
});
 
module.exports = model("repitSchema", repitSchema);