const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let reason = args.join(" ").slice(22);
  message.delete();

  let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#a07ae4")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

  //return message.channel.send(reportEmbed); //send msg in current channel
  let reportsChannel = message.guild.channels.find(`name`, "reports") //TODO: set reports channel


  message.delete().catch(O_o=>{}); //delete previous message (input command)

  return reportsChannel.send(reportEmbed);
}

module.exports.help = {
  name : "report"
}