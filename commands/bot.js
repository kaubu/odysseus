const config = require("../config.json");

module.exports = {
	name: "bot",
	description: "Returns information on the bot.",
	aliases: ["info", "bot-info"],
	cooldown: 0,
	execute(message, args) {
		const data = [];

		data.push("__**General Information**__");
		data.push(`**Name:** ${config.name}`);
		if (config.version) data.push(`**Version:** \`${config.version}\``);
		data.push(`**Prefix:** "${config.prefix}"`);
		if (config.devServer || config.botInvite) {
			data.push("__**Invites**__");
			if (config.botInvite) data.push(`**Invite me to your server:** ${config.botInvite}`);
			if (config.devServer) data.push(`**Join the development server:** ${config.devServer}`);
		}
		data.push("__**Credits**__");
		data.push(`**Owner: ${config.owner}**`);
		if (config.credits) data.push(`**Credits:** ${config.credits}`);
		if (config.source) data.push(`**Source Code:** ${config.source}`);

		return message.channel.send(data, { split: true });
	}
};