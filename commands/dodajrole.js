const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No chyba nie myślisz że ci na to pozwolę Somsiad!");
  if(!rMember) return message.reply("Nie mogę znaleść gałgana.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Wybierz role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nie znalazłem takiej roli.");

  if(rMember.roles.has(gRole.id)) return message.reply("Ten somsiad już ma taką role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Moje gratulacje somsiedzie dostałeś role! ${gRole.name}`)
  }catch(e){
    message.channel.send(`Gratulacje <@${rMember.id}>, dostałeś rolę: ${gRole.name}. próbowaliśmy się skontaktować, ale somsiad nie otwierał.`)
  }
}

module.exports.help = {
  name: "dodajrole"
}
