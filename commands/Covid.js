const{MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
const{SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('covid')
        .setDescription('Girdiğiniz ülke ile ilgili covid verilerini gösterir')
        .addStringOption(Option => Option.setName('ülke').setDescription('Ülke adı giriniz')),
    async execute(interaction){
        const argument = interaction.options.getString('ülke');
        if(!argument){
            await interaction.reply({content:'Ülke adı giriniz',epheremal:true});
        }else{
            let url = `https://disease.sh/v3/covid-19/countries/${argument}`;
            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    let covidEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
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
                    return interaction.reply({content:`${data.countryInfo.iso2} için günlük koronavirüs verileri :microbe:`,embeds:[covidEmbed]});
                })
                .catch(err => {
                    console.error(err);
                    return interaction.reply({content:'Veri bulunamadı',ephemeral:true});
                });
        }
    }
};