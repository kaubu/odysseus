# Odysseus
A bot for Discord, written in JS using the Discord.js module.  
The spiritual successor to Alliad.  

## Prerequisites
* Node.js
* Chalk
* Dotenv (Optional)
* Eslint (Optional)
* PM2 (Optional)

## Commands (without prefix)
`ban`: Bans a user.  
`bot`: Returns information on the bot.  
`help`: Returns a list of all commands, or gets info on a certain one.  
`id`: Returns ID of one or more users.  
`kick`: Kicks a user from the server.  
`list`: Returns a list of all commands, and their descriptions.  
`ping`: Returns the ping of the bot.  
`say`: Says the message back to the user, and deletes the user's original message. Does not delete in DMs.  
`server`: Returns information of the current server.  
`test`: Returns a confirmation that the bot is running.  
`unban`: Unbans a user.  
`user`: Returns information of a user.

## Owner Commands
These are commands that only the owner/s can use. You can set the IDs of the owners in the config.json file.  
  
`exit`: Restarts the bot program when using pm2, but exits when running normally.  
`ohelp`: Lists all commands that are only available to the owners.  
`olist`: Returns a list of all owner-only commands, and their descriptions.  
`reload`: Reloads a command.  

## Changelog
**v1.0.0**
* Initial build

## Extra
Join the development server: https://discord.gg/KqkhyTdmGg
