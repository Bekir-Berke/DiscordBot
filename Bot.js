const {Client, Intents, Collection} = require('discord.js');
const fs = require('fs');
const {prefix, token} = require('./config.json');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
client.commands = new Collection;

client.on('ready', () => {});

const eventFiles = fs.readdirSync('./listeners/').filter(file => file.endsWith('.js'));
for (const file of eventFiles){
    const event = require(`./listeners/${file}`);
    if (event.once){
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('messageCreate', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if (command.args && !args.length) return msg.reply('Argüman tanımlamadın');
    if(command.guildOnly && msg.channel.type !== 'GUILD_TEXT'){
        return msg.author.send('Bu komut sadece sunucu içerisinde çalışır');
    }

    try {
        command.execute(msg, args);
    } catch (error){
        return msg.reply('Hata');
    }
});

client.on('interactionCreate', interaction => {
    if (!client.command.has(interaction.name)) return;

    try {
        client.commands.get(interaction.commandName).execute(interaction);
    } catch (error){
        console.error(error);
        interaction.reply({content: 'Hata', ephemeral: true});
    }
});

client.login(token);