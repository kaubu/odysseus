module.exports = {
	name: "id",
	description: "Returns ID of one or more users.",
	usage: "[user mention] OR [user mention 1] [user mention 2] ...",
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(`User ID: ${message.author.id}`);
		}
		
		if (!message.mentions.users.size) {
			return message.reply("You need to tag a user in order to get their ID.");
		}

		const userList = message.mentions.users.map(user => {
			return `${user.username}#${user.discriminator}'s ID: ${user.id}`;
		});

		message.channel.send(userList);
	}
};