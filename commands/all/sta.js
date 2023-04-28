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
        .setFooter("[STA] | Sistema de Tortura Alarmista")
        .setDescription(
"`Mensaje programado para las 1:00pm`\n\
⏰ | Link de Zoom para unirse a la clase de Sociales\n(Click aqui para unirte)[https://us05web.zoom.us/j/87340813135?pwd=bkxIMnB4QXZxYjNkL2RDVFVmdXNRdz09]\
\n⏹ | Detalles del enlace:\n🆔 | ID de reunión: 873 4081 3135\n🔐 | Código de acceso: Sociales23")

        client.channels.resolve('1092524838247219270').send({embeds: [sociales]})
        }
            
        if(eleccion == "2"){

            //HORA INFORMATICA
        
            message.reply("info")
        }

        if(eleccion == "3"){

            //HORA ARTISTICA
            
        }

        if(eleccion == "4"){

            //HORA LENGUAJE
            
        }

      




    }

        }