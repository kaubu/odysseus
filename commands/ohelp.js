const config = require("../config.json");
const chalk = require("chalk");

module.exports = {
	name: "ohelp",
	description: "Lists all commands that are only available to the owners.",
	aliases: ["ocommands"],
	ownerOnly: true,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		const commandName = message.content.slice(config.prefix.length).trim().split(/ +/)
			.shift().toLowerCase();
		const command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(commandName));

		if (command.ownerOnly && !(config.owners.includes(message.author.id))) {
			if (config.verbose) { 
				return message.reply("You do not have permission to do that."); 
			} else { 
				return;
			}
		}

		data.push("Here's a list of all commands only available to the owners:");
		data.push(commands.filter(function(c) {
			// Don't need to check for permissions, as it has already been checked
			if (c.ownerOnly) {
				// Pushes the command to the .map function
				return true;
			} else {
				// Skips the command, and doesn't map it
				return false;
			}
		// Returns the name, not the whole command object
		}).map(c => {
			return c.name;
		// Joins them together, but seperated by a ,
		}).join(", "));

		return message.author.send(data, { split: true })
			.then(() => {
				if (message.channel.type === "dm") return;
				return config.verbose ? message.reply("I have sent you a DM with all the commands available to owners.") : false;
			})
			.catch(error => {
				console.error(chalk.red(`error: Could not send help DM to ${message.author.tag}.\n`, error));
				return config.verbose ? message.reply("I am unable to DM you. Do you have DMs disabled?") : false;
			});
	}
};