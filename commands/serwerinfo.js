const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Informacje o Serwerze")
  .setColor("#15f153")
  .setThumbnail(sicon)
  .addField("Nazwa Serwera", message.guild.name)
  .addField("Serwer Stworzono", message.guild.createdAt)
  .addField("Ty dołączyłeś", message.member.joinedAt)
  .addField("Gałgany na Serwerze", message.guild.memberCount);

  return message.channel.send(serverembed);
}

module.exports.help = {
  name: "serwerinfo"
}
