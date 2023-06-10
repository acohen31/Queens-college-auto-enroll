import { Client, IntentsBitField } from "discord.js";
import { getCourseInfo } from "./grpcClient.js";
import * as dotenv from "dotenv";
dotenv.config();

const classList = new Map();
const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

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
      classList.set(myClass, url);
      const status = await getCourseInfo(url);
      if(status){
        interaction.reply(`${myClass} is open`)
        } else {
            interaction.reply(`${myClass} is closed`)
        }
    }
  }

  if (interaction.commandName === "remove") {
    const myClass = interaction.options.get("class").value;
    if (!classList.has(myClass)) {
      interaction.reply(`${myClass} is not listed`);
    } else {
      classList.delete(myClass);
      interaction.reply(`${myClass} was successfully removed`)
    }
  }
});

function getClassStatus() {
  console.log("Performing action...");
  classList.forEach(async (value, key) => {
    const status = await getCourseInfo(classList.get(key));
    console.log(`Key: ${key}, Value: ${value}`);
    if (status) console.log(`${status}`);
  });
}

client.login(TOKEN);
