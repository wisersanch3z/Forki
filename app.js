const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadbMenus } = require("./Handlers/menuHandler");
const { loadModals } = require("./Handlers/modalHandler");
const { loadbButtons } = require("./Handlers/buttonHandler");

client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();

loadEvents(client);
loadbButtons(client);
loadbMenus(client);
loadModals(client);


// Anti-Crash
require("./Handlers/anti-crash.js")(client);

require("dotenv").config();

client
  .login(process.env.token)
  .then(() => {
    console.log(`Cliente ${client.user.username} conectado a Discord`);
    client.user.setActivity(`NOS VAMOS PA LA V14 PENDEJOS DE MIERDA`);
  })
  .catch((err) => console.log(err));
