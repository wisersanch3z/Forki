const { model, Schema } = require("mongoose");
 
let historySchema = new Schema({
  guild: String, //no colocar en registro
  usuario: String, //no colocar en registro | el sancionado
  moderador: String, //si
  razon: String, //si
  fecha: String, //si
  tipo: String, //si
  content: Array, //no
});
 
module.exports = model("historySchema", historySchema);