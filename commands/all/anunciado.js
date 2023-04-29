module.exports = {
    name: "anunciado",
    description: "Anuncia un texto ingresado al canal STA",
    aliases: ["anunciar"],

    async execute(client, message, args, discord) {

        
let anunciado = args.slice(0).join(" ")

if(!anunciado) return message.reply("Ingresa un anunciado para publicarlo en el canal STA")

const coso = new discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`> ${anunciado}`)
.setFooter("Mensaje automatizado por STA")

client.channels.resolve('1101362256408760402').send({embeds: [coso]})


    }
}