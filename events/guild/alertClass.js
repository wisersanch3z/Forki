
const Discord = require('discord.js');


module.exports = (client, discord, interaction) => {
   

    
  function enviarMensajeSoloViernes(msg, hora) {
    // Calcula la hora actual en El Salvador
    const ahora = new Date();
    const horaElSalvador = new Date(ahora.getTime() - (6 * 60 * 60 * 1000));
  
    // Comprueba si hoy es viernes
    if (horaElSalvador.getDay() !== 1) { // 5 representa el número del día de la semana (0 = domingo, 1 = lunes, 2 = martes, etc.)
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
      const canal = client.channels.cache.get('1092524838247219270');
      if (!canal) return console.error('El canal no existe.');
  
      // Envía el mensaje
      canal.send(msg);
    }, tiempoRestante);
  }
enviarMensajeSoloViernes('Mensaje enviado desde el STA(Sistema de Alarma) este mensaje debio enviarse a las 1:45', '2023-04-07T13:45:00.000-06:00');

console.log(`SISTEMA DE ALARMA CARGADO`);
}