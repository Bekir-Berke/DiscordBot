const{SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('zarat')
        .setDescription('1 ve 12 arasında bir sayı gösterir'),
    async execute(interaction){
        let number = Math.floor((Math.random() * 12) + 1).toString();
        await interaction.reply(number);
    }
};