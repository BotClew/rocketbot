const Discord = require('discord.js'); 
const moment = require('moment');

exports.run = async (client, message, args) => {

    let user;

    if (message.mentions.users.first()) {
         user = message.mentions.users.first();
    } else {
         user = message.author;
     }

     const member = message.guild.member(user);

     // Forming the Embed
     const embed = new Discord.RichEmbed() // Use Discord.MessageEmbed if you use the master version
        .setColor('a07ae4') // I just put random in here, but you can chnage it to anything else.
        .setThumbnail(user.avatarURL)
        .setTitle(`${user.username}#${user.discriminator}`)
        .addField('ID:', `${user.id}`, true)
        .addField('Nickname:', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField('Created at:', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY')}`, true)
        .addField('Joined server:', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY')}`, true)
        .addField('Status:', `${user.presence.status}`, true)
        .addField('Game:', `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField('Roles:', member.roles.map(roles => `${roles.name}`).join(', '), true)
        .setTimestamp()
        .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)

    // Send the Embed
    message.channel.send({embed});

}

module.exports.help = {
  name: 'userinfo',
  description: 'descrption here'
}