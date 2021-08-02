const chalk = require('chalk');
const moment = require('moment');
module.exports = { 
    name:'messageCreate',
    once:false,
    execute(message){
        console.log(chalk.yellow(`${message.author.tag} in #${message.channel.name} of ${message.guild.name} sent: ${message.content}  ${chalk.magenta(moment(message.createdAt).format('MMMM Do YYYY, hh:mm:ss A Z'))}`));
    }
};