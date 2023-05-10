const { Message, EmbedBuilder } = require("discord.js");
const axios = require('axios');
const moment = require('moment-timezone');


module.exports = {
  name: "xrp",
  /**
   *
   * @param {Message} message
   */
  async execute(message, args) {
  


 

async function getCoinPrice() {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: 'ripple',
    },
  });

  return response.data[0].current_price;
}


    const price = await getCoinPrice();
    const formattedPrice = price.toFixed(2);

  
    const horaActual = moment.tz('America/El_Salvador');
    const horasv = horaActual.format('h:mm A');

    const currentDate = new Date();
    const dia = { timeZone: 'America/El_Salvador', year: 'numeric', month: 'long', day: 'numeric' };
    const eldia = currentDate.toLocaleDateString('es-SV', dia);

    const woah = new EmbedBuilder()
    .setColor("22CDFF")
    .setDescription(`<:RISAS:962627633932296222> Valor del XRP`)
    .addFields(
      {
      name: "➜ Valor en USD:",
      value: `$${formattedPrice}`,
    },
    {   
      name: `➜ Fecha de la petición:`,
      value: `El ${eldia} a las ${horasv} Hora salvadoreña`,
    }
    )
    .setFooter({text: `Petición a la pagina por: ${message.author.username}`, iconURL: message.author.avatarURL({dynamic: true}) })
    .setThumbnail("https://media.giphy.com/media/KzcamVeEJlaxCE4OAt/giphy.gif")

    message.reply({embeds: [woah]});




  },
};
