import { Client, IntentsBitField } from "discord.js";
import { getCourseInfo } from "./grpcClient.js";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
const classList = new Map();

client.on("ready", (c) => {
  console.log(`${client.user.tag} is online.`);
  setInterval(getClassStatus, 5000);
});

client.on(`interactionCreate`, async (interaction) => {
  // Guard, will only run if it is a / command
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "check_status") {
    const myClass = interaction.options.get("class").value;
    const url = interaction.options.get("url").value;
    if (classList.has(myClass)) {
      interaction.reply(`${myClass} is already listed`);
    } else {
      classList.set(myClass, url)
      const status = await getCourseInfo(url);
      interaction.reply(`${status}`);
    }
  }

  if (interaction.commandName === "remove") {
    const myClass = interaction.options.get("class").value;
    if (!classList.has(myClass)){
        interaction.reply(`${myClass} is not listed`)
    }
  }
});

function getClassStatus() {
  console.log("Performing action...");
  classList.forEach(async (value, key) => {
    const status = await getCourseInfo(classList.get(key));
    console.log(`Key: ${key}, Value: ${value}`);
      console.log(`${status}`);
  });
}

client.login(TOKEN);
