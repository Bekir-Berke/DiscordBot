const{MessageEmbed} = require('discord.js');
module.exports = {
    name:'Avatar',
    aliases:['avatar'],
    usage:'.avatar',
    execute(message){
        let avatarEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${message.author.tag} kullanıcısının avatarı`)
            .setImage(message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
            .setTimestamp();
        return message.reply({embeds:[avatarEmbed]});
    }
};