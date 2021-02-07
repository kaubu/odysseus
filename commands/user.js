module.exports = {
	name: "user",
	description: "Returns information of a user.",
	execute(message, args) {
		message.channel.send(`__**Info for ${message.author.tag}**__\n**Name:** ${message.author.username}\n**Tag:** #${message.author.discriminator}\n**ID:** ${message.author.id}`);
	}
};