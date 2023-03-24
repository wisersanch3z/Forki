module.exports = {
    name: "cmdstaff",
    description: "muestra los comandos de staff",
    aliases: ["cmds"],

    async execute(client, message, args, discord) {



     
    if(!message.member.roles.cache.has('942498820875509760')) return message.reply("No eres parte del staff")

 

message.reply("Comandos para el staff:\n\n?aceptarv (usuario)\n?rechazarv (usuario)")

}
}