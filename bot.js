const Discord = require("discord.js")
const chalk = require("chalk")

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
  } = require("discord.js");
  const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
  const { User, Message, GuildMember, ThreadMember } = Partials;
  
  const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
  });
  
  client.config = require("./config.json")
  const { loadEvents } = require("./Handlers/eventHandler");

  client.events = new Collection();
  client.commands = new Collection();
  
loadEvents(client)

const { connect } = require("mongoose");
connect(client.config.DataBaseURL, {}).then(() => {
  console.log(chalk.pink("Connected to the database"));
});

client.login(client.config.token);