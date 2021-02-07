const chalk = require("chalk");

module.exports = {
	name: "ban",
	description: "Bans a user.",
	usage: "[user mention]",
	guildOnly: true,
	permissions: ["BAN_MEMBERS", "KICK_MEMBERS"],
	cooldown: 3,
	args: true,
	// Check if mentioned
	execute(message, args) { 
		const user = message.mentions.users.first();

		if (!user) return message.reply("You need to mention a user to ban.");

		try {
			message.guild.members.ban(user);
			console.log(chalk.magenta(`admin: Banned user ${user.tag}/${user.id} from "${message.guild.name}" by ${message.author.tag}`));
			message.channel.send(`${user.tag} has been banned.`);
		} catch (error) {
			console.log(chalk.red(`error: Unable to ban user: "${user.tag}"`));
			message.channel.send(`Unable to ban user: "${user.tag}"`);
		}
	}
};