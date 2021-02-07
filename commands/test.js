const config = require("../config.json");
const chalk = require("chalk");

module.exports = {
	name: "test",
	description: "Returns a confirmation that the bot is running.",
	aliases: ["ts"],
	cooldown: 0,
	execute(message, args) {
		console.log(chalk.green(`info: test successful`));
		return message.channel.send(`${config.name} ${config.version} is running.`);
	}
};