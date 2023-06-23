module.exports = {
    name: "aceptarv",
    description: "inicia el proceso de verificacion",
    aliases: ["aceptv"],


    async execute(client, message, args, discord) {


    //let persona =  message.mentions.users.first()

    let persona = message.mentions.members.first() || message.guild.members.resolve(args[0]); 

      
    if(!message.member.roles.cache.has('942498820875509760')) return message.reply("No eres parte del staff")

 
    if(!persona) return message.reply("Usa ?aceptarv (mencion del solicitante)")
    // message.guild.members.resolve(args[0])
   let rol = message.guild.roles.resolve("935246597678305300")


message.reply(`Has aceptado la entrada a <@${persona.id}>`)

client.channels.resolve('967116194186424320').send(`✅ | ¡El usuario <@${persona.id}> ha pasado la verificación! darle una buena bienvenida.`)



persona.roles.add(rol).catch((e) => message.reply('Ocurrio un error')).then(() => {
    message.channel.send(`Listo, rol \`${rol.name}\` al solicitante \`${persona.user.username}\``);
});
    }
}