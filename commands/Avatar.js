const{MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('avatarını gösterir'),
    async execute(interaction){
        let avatarEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${interaction.user.tag} kullanıcısının avatarı`)
            .setImage(interaction.user.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
            .setTimestamp();
        await interaction.reply({embeds:[avatarEmbed]});
    }
};