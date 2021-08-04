const fetch = require('node-fetch');
const{MessageEmbed} = require('discord.js');
module.exports = {
    name:'Reddit memes',
    aliases:['reddit'],
    usage:'.reddit',
    guildOnly:true,
    execute(message,args){
        if(args !== null){
            let url = `https://meme-api.herokuapp.com/gimme/${args}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    let memeEmbed = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL())
                        .setColor('RANDOM')
                        .setTitle(`${data.title}`)
                        .setURL(`${data.postLink}`)
                        .setImage(`${data.url}`)
                        .setTimestamp();
                    return message.reply({embeds:[memeEmbed]});
                })
                .catch(err => {
                    console.error(err);
                    return message.reply('Veri bulunamadı');
                });
        }else{
            let url = 'https://meme-api.herokuapp.com/gimme';
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    let memeEmbed = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL())
                        .setColor('RANDOM')
                        .setTitle(`${data.title}`)
                        .setURL(`${data.postLink}`)
                        .setImage(`${data.url}`)
                        .setTimestamp();
                    return message.reply({embeds:[memeEmbed]});
                })
                .catch(err => {
                    console.error(err);
                    return message.reply('Veri bulunamadı');
                });
        }
    }
};