module.exports = {
    name: "ayuda",
    description: "muestra los comandos disponibles a los usuarios comunes",
    aliases: ["help"],

    async execute(client, message, args, discord) {

        const usuario = message.author;

        const elpepe = new discord.MessageEmbed()
        .setTitle("ℹ | Panel de comandos")
        .setColor("BLUE")
        .setFooter(`Solicitado por ${usuario.username}`, usuario.avatarURL())
        
        .setDescription("> Lista de comandos disponibles:\n\n```\n?ayuda\n?discord\n\n```\n\n> Comandos exclusivos para la administración:\n\n```\n?cmdstaff\n```")
        message.reply({embeds:[elpepe]})

    
} 
}