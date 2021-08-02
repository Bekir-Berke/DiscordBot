module.exports = {
    name: 'Dice',
    aliases: ['zar'],
    usage: '.zar',
    execute(message){
        let number = Math.floor((Math.random() * 12) + 1).toString();
        return message.reply(number);
    }
};