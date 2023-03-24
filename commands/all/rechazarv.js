module.exports = {
    name: "rechazarv",
    description: "inicia el proceso de verificacion",
    aliases: ["rechav"],


    async execute(client, message, args, discord) {


    //let persona =  message.mentions.users.first()

    let persona = message.mentions.members.first() 
   
    if(!message.member.roles.cache.has('942498820875509760')) return message.reply("No eres parte del staff")

 
    if(!persona) return message.reply("Usa ?rechazarv (mencion del solicitante)")
    // message.guild.members.resolve(args[0])
   let rol = message.guild.roles.resolve("935246597678305300")


message.reply(`Has rechazado la entrada a <@${persona.id}>`)

client.channels.resolve('967116194186424320').send(`❎ | Ha sido rechazada la petición de \`${persona.username}\`, ha sido expulsado del servidor`)


persona.kick({reason: 'verificación anulada'});

    }
}