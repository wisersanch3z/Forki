const {
  Client,
  Partials,
  Collection,
  PermissionFlagsBits,
  Events,
  EmbedBuilder,
  WebhookClient,
} = require("discord.js");
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
  ws: { properties: { browser: "Discord iOS" } },
  shard: "auto",
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadbMenus } = require("./Handlers/menuHandler");
const { loadModals } = require("./Handlers/modalHandler");
const { loadbButtons } = require("./Handlers/buttonHandler");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();
client.prefixs = new Collection();


loadEvents(client);
loadbButtons(client);
loadbMenus(client);
loadModals(client);

require("./Handlers/distube")(client);
require("./Handlers/anti-crash")(client);
require("dotenv").config();



client.on(Events.InteractionCreate, async interaction => {

  const webhook = new WebhookClient({
    url: "https://discord.com/api/webhooks/1117215077582524487/5-ogyjzZiZGwNSItRaktk8T1GhegPbDATYW7V2Vduir2ldMzZSG7uSs2JhvME2EW_zCO",
  });

  if (!interaction) return;
  if (!interaction.isChatInputCommand()) return;
  else {
    const server = interaction.guild.name
    const serverId = interaction.guild.id
    const user = interaction.user.username
    const userId = interaction.user.id

    const embed = new EmbedBuilder()
      .setColor("0077ba")
      .setTitle(`⚠ | Comando usado`)
      .addFields({ name: `Server`, value: `${server} | \`(${serverId})\`` })
      .addFields({ name: `Command`, value: `${interaction}` })
      .addFields({ name: `User`, value: `${user} | \`(${userId})\`` })
      .setTimestamp()
      .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })

    await webhook.send({ embeds: [embed] });

  }
})

client
  .login(process.env.token)
  .then(() => {
    console.log(`Cliente ${client.user.username} conectado a Discord`);
    
  })
  .catch((err) => console.log(err));
