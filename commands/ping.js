module.exports = {
	name: "ping",
	description: "Returns the ping of the bot.",
	aliases: ["latency"],
	cooldown: 0,
	execute(message, args) {
		const data = [];

		data.push(`Websocket heartbeat: \`${message.client.ws.ping}ms\``);
		message.channel.send("Pinging...").then(sent => {
			data.push(`Roundtrip latency: \`${sent.createdTimestamp - message.createdTimestamp}ms\``);
			sent.delete().catch(_ => {});
			message.channel.send(data);
		});
	}
};