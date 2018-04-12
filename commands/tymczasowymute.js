const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let mReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No chyba nie myślisz że ci na to pozwolę Somsiad!");
  if(!tomute) return message.reply("Nie znalazłem Gałgana.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie mogę go wyciszyć jest moim somsiadem!");
  let muterole = message.guild.roles.find(`name`, "wyciszony");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "wyciszony",
        color: "#ff0000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Nie podałeś mi czasu drogi somsiedzie!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> został wyciszony na ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> został odciszony!`);
  }, ms(mutetime));

//end of module

//embed part

let muteEmbed = new Discord.RichEmbed()
  .setDescription("~Wyciszenie~")
  .setColor("#e56b00")
  .addField("Wyciszono Gałgana", `${tomute} z ID: ${muterole.id}`)
  .addField("Wyciszony przez", `<@${message.author.id}> z ID ${message.author.id}`)
  .addField("Wyciszony na kanale", message.channel)
  .addField("Czas", message.createdAt)
  .addField("Czas wyciszenia | Powód", mReason);

  let muteChannel = message.guild.channels.find(`name`, "mod-log");
  if(!muteChannel) return message.channel.sned("Nie mogę znaleść kanału Mod-log.");

  muteChannel.send(muteEmbed);


}

module.exports.help = {
  name: "wycisz"
}
