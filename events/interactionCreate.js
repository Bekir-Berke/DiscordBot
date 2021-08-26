module.exports = {
    name:'interactionCreate',
    async execute(interaction, client){
        if(!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if(!command) return;
        try {
            await command.execute(interaction, interaction.client);
        } catch (error){
            await interaction.reply({content:'Hata', ephemeral:true});
        }
    }
};