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
 
/*
// Obtener la fecha actual en formato dd/mm/yy
const date = new Date().toLocaleDateString('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
});

// Buscar la última sanción del usuario en la base de datos
Warning.findOne({ serverId: message.guild.id, userId: member.id }).sort({ sanctionNumber: -1 })
  .then(lastWarning => {
    let sanctionNumber = 1; // Número de sanción por defecto

    if (lastWarning) {
      sanctionNumber = lastWarning.sanctionNumber + 1; // Incrementar el número de sanción
    }

    // Crear una nueva sanción en la base de datos
    const warning = new Warning({
          guild: interaction.guild.id,
          usuario: elwe.id,
          moderador: interaction.author.tag,
          razon: motivo,
          fecha: date, 
          tipo: tipo,
          numero: numero,
        });

    warning.save()
      .then(() => {
        message.channel.send(`Se ha aplicado la sanción número ${sanctionNumber} de tipo ${command} a ${member.user.tag}. Motivo: ${reason}`);
      })
      .catch(err => {
        console.error('Error al guardar la sanción en la base de datos:', err);
        message.channel.send('Ha ocurrido un error al guardar la sanción.');
      });
  })
  .catch(err => {
    console.error('Error al obtener la última sanción desde la base de datos:', err);
    message.channel.send('Ha ocurrido un error al obtener la última sanción.');
  });

  */
module.exports = model("historySchema", historySchema);