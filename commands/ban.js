const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No chyba nie myślisz że ci na to pozwolę Somsiad!"); 
   if(!message.member.hasPermission("MANAGE_MEMBERS")) return errors.noPerms(message, "MANAGE_MEMBERS");
   if(args[0] == "help"){
    message.reply("Użyj: !ban <Użytkownik> <Powód>");
    return;
   }
   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!bUser) return message.channel.send("Nie znalazłem Gałgana!");
   let bReason = args.join(" ").slice(22);
   if(bUser.haspermission("MANAGE_MESSAGES")) return message.channel.send("Ten somsiad nie może być wyrzucony!");

   let banEmbed = new Discord.RichEmbed()
     .setDescription("~Banicja~")
     .setColor("#bc0000")
     .addField("Zbanowano Gałgana", `${bUser} z ID: ${bUser.id}`)
     .addField("Zbanowany przez", `<@${message.author.id}> z ID ${message.author.id}`)
     .addField("Zbanowany z kanału", message.channel)
     .addField("Czas", message.createdAt)
     .addField("Powód", bReason);

     let banChannel = message.guild.channels.find(`name`, "mod-log");
     if(!banChannel) return message.channel.send("Nie mogę znaleść kanału Mod-Log.");

     message.guild.member(bUser).ban(bReason);
     banChannel.send(banEmbed);

   return;
 }

module.exports.help = {
  name: "ban"
}
