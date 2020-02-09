const Discord = require("discord.js");
require('dotenv').config();
const bot = new Discord.Client();
const ytdl = require("ytdl-core");

const token = process.env.TOKEN_KEY;

const PREFIX = "?";
const AUTHOR = "DSBxASSASSIN";
const VERSION = "1.0.0";
const BOTNAME = "DSB_bot";
var servers = {};

bot.on("ready", ()=>{
	console.log(`logged in as ${bot.user.tag}`);
});


bot.on('message', message=>{
	let args = message.content.substring(PREFIX.length).split(" ");
	let message_list = message.content.split(" ");
	
	for(let i = 0; i < message_list.length; i++){
		if(message_list[i] === "furry" || message_list[i] === "furries"){
			message.reply("Fucking FURRY");
		}
	}


	
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

		case "play":
			function  play(connection, message){
				var server = servers[message.guild.id];

				server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

				server.queue.shift();

				server.dispatcher.on("end", function(){
					if(server.queue[0]){
						play(connection, message);
					}else{
						connection.disconnect();
					}
				});

			}

			if(!args[1]){
				message.reply("Invallid Argument");
				return;
			}
			
			if(!message.member.voiceChannel){
				message.reply("you must be in an channel to play music");
				return;
			}

			if(!servers[message.guild.id]) servers[message.guild.id] = {
				queue: []
			}

			var server = servers[message.guild.id];

			server.queue.push(args[1]);

			if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
				play(connection, message);
			})
			
		break;

		case "skip":
			var server = servers[message.guild.id];
			if(server.dispatcher) server.dispatcher.end();
			message.channel.send("skipped song")
		break;
			
		case "stop":
			var server = servers[message.guild.id];
			if(message.guild.voiceConnection){
				for(var i = server.queue.length -1; i >= 0; i--){
					server.queue.splice(i, 1);
				}

				server.dispatcher.end();
			}

			if(message.guild.connection) message.guild.voiceConnection.disconnect();
		break;
			
	}
})

bot.login(token);