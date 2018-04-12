const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("NO PERMS")
        .addField("Za mało praw", perm)
        .setColor("#ff0000");

        message.channel.send(embed).then(m => m.delete(5000));
    
}

