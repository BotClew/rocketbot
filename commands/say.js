const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry! you dont have permission to use this command!");
    let botmessage = args.join (" ");
    message.delete().catch();
message.channel.send(botmessage);
}

module.exports.help = {
    name: "say"
}