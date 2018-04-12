const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("Nie znalazłem Gałgana!");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No chyba nie myślisz że ci na to pozwolę Somsiad!");
   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ten Somsiad nie może zostac wyrzucony.. Lubię go!");

   let kickEmbed = new Discord.RichEmbed()
     .setDescription("~Wyrzucenie~")
     .setColor("#e56b00")
     .addField("Wyrzucono Gałgana", `${kUser} z ID: ${kUser.id}`)
     .addField("Wyrzucony przez", `<@${message.author.id}> z ID ${message.author.id}`)
     .addField("Wyrzucony z kanału", message.channel)
     .addField("Czas", message.createdAt)
     .addField("Powód", kReason);

     let kickChannel = message.guild.channels.find(`name`, "mod-log");
     if(!kickChannel) return message.channel.send("Nie mogę znaleść kanału Mod-Log.");

     message.guild.member(kUser).kick(kReason);
     kickChannel.send(kickEmbed);

   return;
 }

module.exports.help = {
  name: "wyrzuc"
}
