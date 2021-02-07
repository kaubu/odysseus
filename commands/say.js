module.exports = {
	name: "say",
	description: "Says the message back to the user, and deletes the user's original message. Does not delete in DMs.",
	aliases: ["echo"],
	usage: "[message]",
	cooldown: 3,
	args: true,
	execute(message, args) {
		message.delete().catch(_ => {});
		message.channel.send(args.join(" "));
	}
};