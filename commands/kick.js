const chalk = require("chalk");

module.exports = {
	name: "kick",
	description: "Kicks a user from the server.",
	usage: "[user mention]", // TODO: Change to also use ID
	guildOnly: true,
	permissions: ["KICK_MEMBERS"],
	cooldown: 3,
	args: true,
	execute(message, args) {
		const user = message.mentions.members.first();
		// const user_tag = user.user.tag;
		// console.log("user = ");
		// console.log(user);

		try {
			user.kick();
			console.log(chalk.magenta(`admin: Kicked user ${user.user.tag}/${user.id} from guild "${message.guild.name}" by ${message.author.tag}`));
			message.channel.send(`${user.user.tag} has been kicked.`);
		} catch (error) {
			console.log(chalk.red(`error: problem kicking user "${user.user.tag}"`));
			console.log(chalk.red(`error: ${error}`));
			message.channel.send(`Error kicking user: "${user.user.tag}".`);
		}
	}
};