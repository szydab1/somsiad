const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Nie znanazłem Gałgana.");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Skarga")
  .setColor("#15f153")
  .addField("Zreportowany Gałgan", `${rUser} z ID: ${rUser.id}`)
  .addField("Zreportowany przez", `${message.author} z ID: ${message.author.id}`)
  .addField("Kanał", message.channel)
  .addField("Czas", message.createdAt)
  .addField("Powód", reason);

  let reportschannel = message.guild.channels.find(`name`, "reporty");
  if(!reportschannel) return message.channel.send("Nie mogę znaleść kanału Skarg.")


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);
}

module.exports.help = {
  name: "skarga"
}
