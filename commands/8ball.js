const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


if(!args[1]) return message.reply("Somsiad napisz pełnym zdaniem!")
let replies = ["Tak.", "Nie.", "Nie wiem.", "Zapytoj kiedy indziej.", "Muszę iść Halyna mruga! Będzie sex!", "Ty sam wiesz najlepiej", "To wina somsiada", "Nie masz nic lepszego do roboty? Tylko byś te Discordy grał."];

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(0).join(" ");

let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#ff9900")
  .addField("Pytanie", question)
  .addField("Odpowiedź", replies[result]);

  message.channel.send(ballembed);


}

module.exports.help = {
  name: "8ball"
}
