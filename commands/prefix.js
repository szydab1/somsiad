const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No chyba nie myślisz że ci na to pozwolę Somsiad!");
  if(!args[0] || args[0 == "help"]) return message.reply(`Użyj aktualnego prefixu & <dowolna kombinacja na nowy prefix tutaj>`);

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#ff9900")
  .setTitle("Prefix został zmieniony!")
  .setDescription(`Zmieniony na ${args[0]}`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "prefix"
}
