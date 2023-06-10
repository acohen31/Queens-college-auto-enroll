import { Client, IntentsBitField } from "discord.js";
import { getCourseInfo } from "./grpcClient.js";
import * as dotenv from "dotenv";
dotenv.config();

const classList = new Map();
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`${client.user.tag} is online.`);
  const delay = 30000;
  setInterval(() => {
    //Checks status of all classes on an interval
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
      classList.forEach(async (value, key) => {
        const status = await getCourseInfo(classList.get(key));
        if (status) {
          channel.send(`${key} is open`);
        }
      });
    }
  }, delay);
});

client.on(`interactionCreate`, async (interaction) => {
  // Guard, will only run if it is a / command
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add_class") {
    const myClass = interaction.options.get("class").value;
    const url = interaction.options.get("url").value;
    if (classList.has(myClass)) {
      interaction.reply(`${myClass} is already listed`);
    } else {
      classList.set(myClass, url);
      const status = await getCourseInfo(url);
      if (status) {
        interaction.reply(`${myClass} is open`);
      } else {
        interaction.reply(`${myClass} is closed`);
      }
    }
  }

  if (interaction.commandName === "class_list") {
    interaction.reply(`CLASS LIST:\n   ${[...classList.keys()].join("\n   ")}`);
  }

  if (interaction.commandName === "remove") {
    const myClass = interaction.options.get("class").value;
    if (!classList.has(myClass)) {
      interaction.reply(`${myClass} is not listed`);
    } else {
      classList.delete(myClass);
      interaction.reply(`${myClass} was successfully removed`);
    }
  }
});

client.login(TOKEN);
