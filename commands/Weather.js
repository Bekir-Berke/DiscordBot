const{WEATHER_API_KEY} = require('../config.json');
const{MessageEmbed} = require('discord.js');
const{SlashCommandBuilder} = require('@discordjs/builders');
const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('havadurumu')
        .setDescription('girdiğiniz yer ile ilgili havadurumu bilgisi verir')
        .addStringOption(Option => Option.setName('yer').setDescription('yer giriniz')),
    async execute(interaction){
        const argument = interaction.options.getString('yer');
        if(!argument){
            await interaction.reply({content:'Ülke ismi giriniz'});
        }else{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${argument}&appid=${WEATHER_API_KEY}&units=metric&lang=tr`;
            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    let sunrise = new Date(data.sys.sunrise * 1000).toLocaleString();
                    let sunset = new Date(data.sys.sunset * 1000).toLocaleString();
                    let imageUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    let weatherEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setThumbnail(imageUrl)
                        .setAuthor(`${interaction.user.tag}`, interaction.user.displayAvatarURL())
                        .addFields(
                            {name:'Şehir', value:`**\`${data.name}\`**`,inline:true},
                            {name:'Ülke',value:`**\`${data.sys.country}\`**`,inline:true},
                            {name:'Hava durumu',value:`**\`${data.weather[0].description}\`**`,inline:true},
                            {name:'Sıcaklık',value:`**\`${data.main.temp} °C\`**`,inline:true},
                            {name:'En yüksek sıcaklık',value:`**\`${data.main.temp_max} °C\`**`,inline:true},
                            {name:'Hissedilen',value:`**\`${data.main.feels_like} °C\`**`,inline:true},
                            {name:'Enlem',value:`**\`${data.coord.lat}\`**`,inline:true},
                            {name:'Boylam',value:`**\`${data.coord.lon}\`**`,inline:true},
                            {name:'Güneşin doğuş zamanı', value:`**\`${sunrise.slice(11,16)}\`**`, inline:true},
                            {name:'Güneşin batış zamanı', value:`**\`${sunset.slice(11,16)}\`**`, inline:true}
                        );
                    interaction.reply({content:`${argument} için hava durumu verileri :white_sun_small_cloud:`,embeds:[weatherEmbed]});
                })
                .catch(err => {
                    console.error(err);
                    interaction.reply({content:'hata', ephemeral:true});
                });
        }
    }
};