const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Nie mogłem znaleść commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} wczytane!`);
    bot.commands.set(props.help.name, props);
});

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("💀discord.me/wagon", {type: "WATCHING"});

bot.on("guildMemberAdd", async member =>{
  console.log(`${member.id} Joined.`)

//array XD
  var listHi = [`Halyna! Spójrz! Mamy nowego pjotera do zabawy.`,`A ty co somsiad nie masz niczego lepszego do roboty tylko te discordy?`,`O jak dobrze że już jesteś. Potrzebuje twojej pomocy z tym złodziejem!`,`Wagon płaci mi abym po prosty był sobą somsiad.`,];
  var hi = listHi[Math.floor(Math.random() * listHi.length)];

  let welcomechannel = member.guild.channels.find(`name`, "witaj-żegnaj")
  welcomechannel.send(`Witaj drogi somsiedzie ${member}! ${hi}`);
});

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} Opuścił serwer.`)

  let welcomechannel = member.guild.channels.find(`name`, "witaj-żegnaj")
  welcomechannel.send(`SOMSIAD SZYBKO POMÓŻ MI DOGONIĆ ${member}! UKRADŁ MI HALYNE!<:somsiad:433710168115773441> Odszedł z serwera!`);

});

bot.on("channelCreate", async channel => {
  console.log(`${channel.name} został stworzony.`);

  let sChannel = channel.guild.channels.find(`name`, "code-test");
  sChannel.send(`${channel} kanał został stworzony.`);

});

bot.on("channelDelete", async channel => {
  console.log(`${channel.name} został usunięty.`);

  let sChannel = channel.guild.channels.find(`name`, "code-test");
  sChannel.send(`${channel.name} kanał został usunięty`);
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.lenght));
  if(commandfile) commandfile.run(bot, message, args);


});




});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(botconfig.token);
