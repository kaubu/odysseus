const chalk = require("chalk");

module.exports = {
	name: "unban",
	description: "Unbans a user.",
	usage: "[user ID]",
	guildOnly: true,
	permissions: ["BAN_MEMBERS"],
	cooldown: 3,
	args: true,
	// Check if mentioned
	async execute(message, args) { 
		const id = args[0];
		
		try {
			const banList = await message.guild.fetchBans();
			// console.log("banList:");
			// console.log(banList);
			const bannedUser = banList.find(userObject => userObject.user.id === id);

			if (bannedUser) {
				// await message.channel.send(`${bannedUser.tag} is banned.`);
				message.guild.members.unban(id);
				console.log(chalk.magenta(`admin: Unbanned user ${bannedUser.user.tag}/${bannedUser.user.id} from guild "${message.guild.name}" by ${message.author.tag}`));
				message.channel.send(`${bannedUser.user.tag} has been unbanned.`);
			} else {
				await message.channel.send("That user is not banned.");
			}
		} catch(error) {
			console.log(chalk.red(`error: Unable to unban user with user ID: "${id}"`));
			console.log(chalk.red(`error: ${error}`));
			message.reply(`Unable to unban user with user ID: "${id}". Perhaps the ID is invalid?`);
		}

		// try {
		// 	message.guild.members.unban(id);
		// } catch (error) {
		// 	console.log(chalk.red(`error: Unable to unban user with user ID: "${id}"`));
		// 	message.reply(`Unable to unban user with user ID: "${id}". Perhaps the ID is invalid?`);
		// }
	}
};