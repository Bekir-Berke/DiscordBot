const fetch = require('node-fetch');
const{MessageEmbed} = require('discord.js');
module.exports = {
    name:'Reddit memes',
    aliases:['reddit'],
    usage:'.reddit',
    execute(message,args){
        try {
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
                    });
            }
        } catch (error){
            return message.reply('Veri bulunamadı');
        }
    }
};