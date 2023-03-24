module.exports = {
    name: "verificar",
    description: "inicia el proceso de verificacion",
    aliases: ["verificarme"],


    async execute(client, message, args, discord) {


                 
const usuario = message.author;

const nombre = args.slice(0).join(" ")

if(message.member.roles.cache.has("935246597678305300")) return message.reply("Ya estas verificado!")

if(!nombre){
return message.reply("¡Hola! para verificarte en nuestro servidor debes identificarte\n\nEJEMPLO: `?verificar César Sánchez`")

}

const fechaa = usuario.createdAt.toLocaleString()
const elpepe = new discord.MessageEmbed()


.setColor("GREEN")
.setThumbnail(usuario.avatarURL())
.setTimestamp()
.setFooter("Hora/fecha de la solicitud")
.setDescription(`**🛡 | Nueva solicitud de verificación**\n\n\nEl usuario \`${usuario.username}\` ha solicitado una verificación\n\n🗃 | __Información del solicitante:__\n🏷 | Nombre a verificar: \`${nombre}\`\n🆔 | ID: \`${usuario.id}\`\n📆 | Fecha de la cuenta: \`${fechaa}\``)


usuario.send(`<a:check:943962023870496768> ¡La solicitud fue enviada con exito! en las próximas horas te avisaremos cualquier novedad sobre tu verificación\n\nNombre registrado: \`${nombre}\`\n\n⚠ | El proceso puede tardar hasta 1 dia o menos, te avisaremos si has pasado o no la verificación`)
 
message.delete()
client.channels.resolve('1013898943177957387').send({content: `@here | <@${usuario.id}> ¡Nueva solicitud!`, embeds: [elpepe]})
client.channels.resolve('967116194186424320').send(`El usuario <@${usuario.id}> ha solicitado una verificación a nombre de: \`${nombre}\`. ¿Lo conocen?`)

}
}