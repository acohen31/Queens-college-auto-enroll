import { Client, IntentsBitField } from "discord.js";
import { getCourseInfo } from "./grpcClient.js"
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

client.on("ready", (c) => {
    console.log(`${client.user.tag} is online.`);
});

client.on(`interactionCreate`, async (interaction) => { // user sends a command, handle it
    // Guard, will only run if it is a / command
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "check_status") {
        const url = interaction.options.get("url").value;
        const status = await getCourseInfo(url);  
        interaction.reply(`${status}`)
    }
});

client.login(TOKEN);