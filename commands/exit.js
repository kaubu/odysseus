const config = require("../config.json");
const chalk = require("chalk");

module.exports = {
	name: "exit",
	description: "Restarts the bot program when using pm2, but exits when running normally.",
	aliases: ["restart", "ex", "rs"],
	ownerOnly: true,
	cooldown: 0,
	async execute(message, args) {
		if (config.verbose) { 
			await message.channel.send("Shutting down or restarting bot..."); 
		}

		await console.log(chalk.magenta("debug: shutting down or restarting bot"));

		process.exit();
	}
};