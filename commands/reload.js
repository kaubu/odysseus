const config = require("../config.json");
const chalk = require("chalk");

module.exports = {
	name: "reload",
	description: "Reloads a command.",
	usage: "[command name]",
	args: true,
	ownerOnly: true,
	execute(message, args) {
		// Checks if there were any arguments passed
		if (!args.length) return message.reply("You didn't pass any command to reload.");
		
		const commandName = args.join(" ").trim().split(/ +/)
			.shift().toLowerCase();

		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return message.channel.send(`There is no command with the name or alias \`${commandName}\`, ${message.author}.`);

		// Removes the require from cache
		delete require.cache[require.resolve(`./${command.name}.js`)];

		// Try to add reloaded command to client.commands
		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);

			console.log(chalk.green(`info: command \`${command.name}\` was reloaded`));
			message.channel.send(`Command \`${command.name}\` was reloaded.`);
		} catch (error) {
			console.error(chalk.red(`error: ${error}`));
			message.channel.send(`There was an error while reloading the command \`${command.name}\`:\n\`${error.message}\`.`);
		}
	}
};