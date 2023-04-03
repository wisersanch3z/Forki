
const Discord = require('discord.js');


module.exports = (client, discord, interaction) => {
    console.log(`SISTEMA DE ALARMA CARGADO`);

// Crea la función para enviar el mensaje solo los viernes
function enviarMensajeSoloViernes(msg, hora, canal) {
  // Calcula la hora actual en El Salvador
  const ahora = new Date();
  const horaElSalvador = new Date(ahora.getTime() - (6 * 60 * 60 * 1000));


  const msg = "Mensaje de prueba: 1h class";
  const hora = "2023-04-03T13:30:00.000-06:00";
  // Comprueba si hoy es viernes
  if (horaElSalvador.getDay() !== 5) { // 5 representa el número del día de la semana (0 = domingo, 1 = lunes, 2 = martes, etc.)
    console.log(`No es viernes, el mensaje no será enviado.`);
    return;
  }



  // Calcula cuánto tiempo queda hasta la hora deseada en El Salvador
  const horaDeseada = new Date(hora);
  horaDeseada.setHours(horaDeseada.getHours() - 6);
  const tiempoRestante = horaDeseada.getTime() - horaElSalvador.getTime();

  // Espera hasta la hora deseada antes de enviar el mensaje
  setTimeout(() => {
    // Encuentra el canal donde deseas enviar el mensaje
    const canalDiscord = "1092524838247219270";
    if (!canalDiscord) return console.error('El canal no existe.');

    // Envía el mensaje
    canalDiscord.send(msg);
  }, tiempoRestante);
}
}