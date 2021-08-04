const{MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name:'Covid',
    aliases:['covid'],
    usage:'.covid',
    guildOnly:true,
    execute(message, args){
        let url = `https://disease.sh/v3/covid-19/countries/${args}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let covidEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setThumbnail(`${data.countryInfo.flag}`)
                    .setTitle(`${data.country}(${data.countryInfo.iso2}) için veriler`)
                    .addFields(
                        {name:'Bugünkü vaka sayısı', value:`**\`${Intl.NumberFormat().format(data.todayCases)}\`**`, inline:true},
                        {name:'Bugünkü ölüm sayısı', value:`**\`${Intl.NumberFormat().format(data.todayDeaths)}\`**`, inline:true},
                        {name:'Bugünkü iyileşen sayısı', value:`**\`${Intl.NumberFormat().format(data.todayRecovered)}\`**`, inline:true},
                        {name:'Toplam vaka sayısı', value:`**\`${Intl.NumberFormat().format(data.cases)}\`**`, inline:true},
                        {name:'Toplam iyileşen sayısı', value:`**\`${Intl.NumberFormat().format(data.recovered)}\`**`,inline:true},
                        {name:'Toplam ölüm sayısı', value:`**\`${Intl.NumberFormat().format(data.deaths)}\`**`, inline:true},
                        {name:'Toplam test sayısı', value:`**\`${Intl.NumberFormat().format(data.tests)}\`**`,inline:true},
                        {name:'Kritik vaka sayısı', value:`**\`${Intl.NumberFormat().format(data.critical)}\`**`, inline:true},
                        {name:'Aktif vaka sayısı', value:`**\`${Intl.NumberFormat().format(data.active)}\`**`, inline:true}
                    );
                return message.reply({content:`${data.countryInfo.iso2} için günlük koronavirüs verileri :microbe:`,embeds:[covidEmbed]});
            })
            .catch(err => {
                console.error(err);
                return message.reply('Veri bulunamadı');
            });
    }
};