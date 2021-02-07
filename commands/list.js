const config = require("../config.json");
const chalk = require("chalk");

module.exports = {
	name: "list",
	description: "Returns a list of all commands, and their descriptions.",
	aliases: ["ls", "allcommands"],
	cooldown: 0,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		data.push("Here's a list of all commands:");

		data.push(commands.filter(function(command) {
			if (command.ownerOnly && !(config.owners.includes(message.author.id))) {
				// Skips the command, and doesn't map it
				return false;
			} else {
				// Pushes the command to the .map function
				return true;
			}
		// Returns the name, not the whole command object
		}).map(command => {
			return `\`${command.name}\`: ${command.description}`;
		// Joins them together, but seperated by a ,
		}).join("\n"));

		// Sends a message to the author of the command, which will DM it
		return message.author.send(data, { split: true })
			.then(() => {
				if (message.channel.type === "dm") return;
				message.reply("I have sent you a DM with all my commands.");
			})
			.catch(error => {
				console.error(chalk.red(`error: Could not send help DM to ${message.author.tag}.\n`, error));
				message.reply("I am unable to DM you. Do you have DMs disabled?");
			});
	}
};