module.exports = {
    name: 'Dice',
    aliases: ['zarat'],
    usage: '.zarat',
    guildOnly:true,
    execute(message){
        let number = Math.floor((Math.random() * 12) + 1).toString();
        return message.reply(number);
    }
};