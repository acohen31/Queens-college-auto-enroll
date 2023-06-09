import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [
  {
    name: "add_class",
    description: "add class to class list",
    options: [
      {
        name: "class",
        description: "eg. CSCI 313, must include space",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "url",
        description:
          "https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController?...",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "class_list",
    description: "lists all classes currently being queried",
    options: [],
  },
  {
    name: "remove",
    description: "remove course from status checker",
    options: [
      {
        name: "class",
        description: "eg. CSCI 313, must include space",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Slash commands were registered successfully.");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
