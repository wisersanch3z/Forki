module.exports = (client, discord, interaction) => {


    if (interaction.isCommand()) {
        const command = client.slash.get(interaction.commandName);
        try {
          command.run(client, interaction);
        } catch (error) {
          console.log("Error iC: " + error);
        }
      }
      

      
}