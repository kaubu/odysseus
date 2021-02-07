// Requirements
// Place token in a ".env" file in the root directory as TOKEN. Disable if you set your own environmental variables
const dotenv = require("dotenv");
const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");
const chalk = require("chalk");

// Creates a client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Sets the message that says "Playing..."
const defaultGame = `${config.prefix}help or ${config.prefix}list`;

// Loads a Collection of all .js file names, in the commands folder
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

// Iterate through all files in the Collection
for (const file of commandFiles) {
	// Require the current command in the scope
	const command = require(`./commands/${file}`);

	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Loads the environmental variables from a .env file, comment out if you have your own environmental variables
dotenv.config();

// On a message, do this code
client.on("message", message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	// args is whole message, minus the prefix, .trim removes whitespaces on both sides of the string, .split splits it from spaces
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	
	// Gets the first element of args, takes it out, then lowercases it
	const commandName = args.shift().toLowerCase();
	// Gets the command object from the name, or from the aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(c => c.aliases && c.aliases.includes(commandName));

	// if command or alias does not exist, return
	if (!command) return;

	// If the command is only meant for servers, and it is typed in a DM, reply with this
	if (command.guildOnly && message.channel.type === "dm") {
		return message.reply("I can't execute that command inside DMs.");
	}

	// If the command has the property ownerOnly set to true, and the author isn't an owner, execute this
	if (command.ownerOnly && !(config.owners.includes(message.author.id))) {
		// If the verbose method is true, reply. Set this to false if you don't want to acknowledge the existence of owner commands, for safety reasons
		if (config.verbose) { 
			return message.reply("You do not have permission to do that."); 
		} else { 
			return;
		}
	}

	// Checks if the command has the permissions field
	if (command.permissions) {
		// Set authorPerms to the permissions that the author has
		const authorPerms = message.channel.permissionsFor(message.author);
		// Set botPerms to the permissions that the bot has
		const botPerms = message.channel.permissionsFor(client.user.id);
		// If the author either has no permissions or their permissions are not completely present in the permissions needed, execute this
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply("You do not have the required permissions to do that.");
		}

		// If the bot does not have the permissions needed, execute this
		if (!botPerms.has(command.permissions)) {
			return message.reply("I do not have the required permissions to do that.");
		}
	}

	// If a command requires arguments, and there are none, execute this
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments.`;

		// If the command has a usage example, execute this
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
		
		console.log(chalk.gray(`command: "${command.name}" "${args}" by author ${message.author.tag} in "${message.guild ? message.guild.name
			: "DM"}"`));
	} catch (error) {
		console.error(chalk.red(`error: ${error}`));
		message.reply("There was an error trying to execute that command.");
	}
});

// Once the client is ready, log to the console
client.once("ready", () => {
	console.log(chalk.green(`info: ${config.name} ${config.version} has started.`));
	// Sets the activity, and the type of activity
	// client.user.setActivity(defaultGame, { type: "PLAYING" })
	// 	.then(presence => console.log(chalk.green(`info: Bot Activity set to "${presence.activities[0].name}"`)))
	// 	.catch(error => console.error(chalk.red(`error: ${error}`)));

	// Using setPresence instead of setActivity because I might add stuff to this in the future.
	client.user.setPresence({
		activity: { name: defaultGame }
	}).then(presence => console.log(chalk.green(`info: Bot Activity set to "${presence.activities[0].name}"`)))
		.catch(error => console.error(chalk.red(`error: ${error}`)));
});

// Upon being invited to a server
client.on("guildCreate", guild => {
	console.log(chalk.green(`info: I have joined the guild "${guild.name}"/"${guild.id}"`));
});

// Upon being removed from a server
client.on("guildDelete", guild => {
	console.log(chalk.green(`info: I have been removed from the guild "${guild.name}"/"${guild.id}"`));
});

// Logs in to the bot using the token
client.login(process.env.DISCORD_TOKEN);

// TODO
/*
- In ban.js/kick.js add a function to ban using ID. Check if user with ID exists in server first, of course.
	-- unban.js already only uses an ID.
1.1 - 1.1 Will have embeds, as well as icons for servers and users in the embeds
1.x or 2.0 will have audio functionality, probably, maybe, might be too much for 1gb of RAM to handle
*/