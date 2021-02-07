const config = require("../config.json");
const chalk = require("chalk");

module.exports = {
	name: "help",
	description: "Returns a list of all commands, or gets info on a certain one.",
	aliases: ["commands"],
	usage: "[command name]",
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push("Here's a list of all my commands:");
			
			// Filters commands so that if the author isn't an owner of the bot,
			// it returns all the commands that are not ownerOnly. However,
			// if the author is an owner, it will display all of the commands
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
				return command.name;
			// Joins them together, but seperated by a ,
			}).join(", "));

			data.push(`\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command.`);

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

		const commandName = args.join(" ").trim().split(/ +/)
			.shift().toLowerCase();
		const command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(commandName));

		if (!command) {
			return message.reply("That's not a valid command.");
		}

		if (command.ownerOnly && !(config.owners.includes(message.author.id))) {
			if (config.verbose) { 
				return message.reply("You do not have permission to do that."); 
			} else { 
				return;
			}
		}

		// Detailed information on a command. This code is executed when an argument for a command has been passed
		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		(command.usage) ? data.push(`**Usage:** \`${config.prefix}${command.name} ${command.usage}\``) 
			: data.push(`**Usage:** \`${config.prefix}${command.name}\``);
		data.push(`**Server Only (No DMs):** ${command.guildOnly ? "yes" : "no"}`);
		if (command.permissions) data.push(`**Permissions required:** \`${command.permissions.join(", ")}\``);
		data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);
		data.push(`**Arguments required:** ${command.args ? "yes" : "no"}`);

		return message.channel.send(data, { split: true });
	}
};