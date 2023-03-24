require("dotenv").config();
const prefix = "?"




module.exports = async (client, discord, message) => {



if (message.channel.type === "dm") return;

  if(message.content.startsWith("<@945718671450443886>")) return message.reply("<a:HyperWave:984693956744974376> ¡Hola! parece que me has mencionado, para ver mis comandos escribe: `?ayuda`")
 
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  if (command) command.execute(client, message, args, discord);


  if(message.content.length > 3) {
if(!command) return message.reply("❌ | No he encontrado ese comando, verifica mis comandos con `?ayuda`"); 
  }
};
