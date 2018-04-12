const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No chyba nie myślisz że ci na to pozwolę Somsiad!");
  if(!rMember) return message.reply("Nie znalazłem takiej roli.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Wybierz role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nie znalazłem takiej roli.");

  if(!rMember.roles.has(gRole.id)) return message.reply("Ten somsiad nie posiada takiej roli.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`Somsiedzie ukradli ci ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`Przykro mi <@${rMember.id}>, usunięto tobie ${gRole.name}. Próbowaliśmy się skontaktować, ale somsiad nie otwierał.`)
  }
}

module.exports.help = {
  name: "usunrole"
}
