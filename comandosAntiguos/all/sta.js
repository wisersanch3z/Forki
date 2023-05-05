module.exports = {
    name: "sta",
    description: "Sistema de alarma",
    aliases: ["alarma"],

    async execute(client, message, args, discord) {

        
let eleccion = args[0]

if(!eleccion) return message.reply("Ingresa un numero del 1 al 4")


//enviar mensaje METODO
//client.channels.resolve('967116194186424320').send("")
        if(eleccion == "1"){
 
            //HORA SOCIALES
        const sociales = new discord.MessageEmbed()
    
        .setColor("BLUE")
        .setDescription(
"`Mensaje programado para las 1:00pm | Viernes`\n\n\
⏰ | Link de Zoom para unirse a la clase de Sociales:\n[Click aqui para unirte](https://us05web.zoom.us/j/87340813135?pwd=bkxIMnB4QXZxYjNkL2RDVFVmdXNRdz09)\
\n\n⏹ | **Detalles del enlace**:\n🆔 | ID de reunión: 873 4081 3135\n🔐 | Código de acceso: Sociales23")
.setFooter("[STA] | Sistema de Tortura Alarmista")
        client.channels.resolve('1101362256408760402').send({content: `<@&1101361745261502614>`, embeds: [sociales]})

        message.reply("enviado - clase sociales")
        }
            
        if(eleccion == "2"){

            //HORA INFORMATICA
            const informatica = new discord.MessageEmbed()
    
            .setColor("RED")
            .setDescription(
    "`Mensaje programado para las 1:45pm | Viernes`\n\n\
⏰ | Link de Zoom para unirse a la clase de Informática:\n[Click aqui para unirte](https://us04web.zoom.us/j/78561115699?pwd=kiGbfURj9e3sYAOdDnrUBWqNBTg2b2.1)\
    \n\n⏹ | **Detalles del enlace**:\n🆔 | ID de reunión: 785 6111 5699\n🔐 | Código de acceso: INFO9-23")
    .setFooter("[STA] | Sistema de Tortura Alarmista")
            client.channels.resolve('1101362256408760402').send({content: `<@&1101361745261502614>`, embeds: [informatica]})

            message.reply("enviado - clase informatica")
        }

        if(eleccion == "3"){

            //HORA ARTISTICA

            const artistica = new discord.MessageEmbed()
    
            .setColor("ORANGE")
            .setDescription(
    "`Mensaje programado para las 2:30pm | Viernes`\n\n\
⏰ | Link de Zoom para unirse a la clase de Artística:\n[Click aqui para unirte](https://us05web.zoom.us/j/81373137268?pwd=V3FEK29EdW1ZS2U3UjZWK0FPMjk1dz09)\
    \n\n⏹ | **Detalles del enlace**:\n🆔 | ID de reunión: 813 7313 7268\n🔐 | Código de acceso: CCJSJ2023")
    .setFooter("[STA] | Sistema de Tortura Alarmista")
            client.channels.resolve('1101362256408760402').send({content: `<@&1101361745261502614>`, embeds: [artistica]})

            message.reply("enviado - clase artistica")
            
        }

        if(eleccion == "4"){

            //HORA LENGUAJE

            const lenguaje = new discord.MessageEmbed()
    
            .setColor("YELLOW")
            .setDescription(
    "`Mensaje programado para las 3:15pm | Viernes`\n\n\
⏰ | Link de Zoom para unirse a la clase de Lenguaje:\n[Click aqui para unirte](https://us05web.zoom.us/j/86430265687?pwd=UERMOS91MXl4bkZrRHUvOGFoKzZFdz09)\
    \n\n⏹ | **Detalles del enlace**:\n🆔 | ID de reunión: 864 3026 5687\n🔐 | Código de acceso: LENGUAJE23")
    .setFooter("[STA] | Sistema de Tortura Alarmista")
            client.channels.resolve('1101362256408760402').send({content: `<@&1101361745261502614>`, embeds: [lenguaje]})

            message.reply("enviado - clase lenguaje")
            
        }

      




    }

        }