module.exports = {
	name: "server",
	description: "Returns information of the current server.",
	guildOnly: true,
	execute(message, args) {
		// Fetch the User object from the ID of the Owner, then...
		message.client.users.fetch(message.guild.ownerID).then(function(owner) { 
			// Send the information
			message.channel.send(`**Server name:** ${message.guild.name}\n**Server owner:** ${owner.tag}
**Members:** ${message.guild.memberCount}\n**Region:** ${message.guild.region}\n**Server ID:** ${message.guild.id}`);
		});
	}
};