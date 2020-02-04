const Discord = require("discord.js");
require('dotenv').config();
const bot = new Discord.Client();

const token = process.env.TOKEN_KEY;

const PREFIX = "?";
const AUTHOR = "DSBxASSASSIN";
const VERSION = "1.0.0";
const BOTNAME = "DSB_bot"

bot.on("ready", ()=>{
	console.log(`logged in as ${bot.user.tag}`);
});


bot.on('message', message=>{
	let args = message.content.substring(PREFIX.length).split(" ")
	
	switch(args[0]){
		case "info":
			switch(args[1]){
				case "author":
					message.channel.send(`the author is ${AUTHOR}`);
					break;
				case "version":
					message.channel.send(`the version is ${VERSION}`);
					break;
				default:
					const embed = new Discord.RichEmbed()
					.setTitle("bot info")
					.setThumbnail("https://cdn.discordapp.com/app-icons/671780802555805729/e49f550721bf957f91218d58057e7b54.png?size=256")
					.addField("Bot Name", BOTNAME)
					.addField("Bot Version", VERSION)
					.addField("Current Server", message.guild.name)
					.setColor("9B0000")
					message.channel.send(embed);
					break;
			}
			break;
		case "clear":
			if(!args[1]){
				mesasge.channel.send("Invallid Argument");
			}else{
				message.channel.bulkDelete(args[1]);
			}
			break;
	}
})

bot.login(token);