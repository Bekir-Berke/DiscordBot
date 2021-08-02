const{WEATHER_API_KEY} = require('../config.json');
const{MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name:'Weather Forecast',
    aliases:['havadurumu'],
    usage:'.havadurumu',
    execute(message, args){
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${args}&appid=${WEATHER_API_KEY}&units=metric&lang=tr`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let sunrise = new Date(data.sys.sunrise * 1000).toLocaleString();
                let sunset = new Date(data.sys.sunset * 1000).toLocaleString();
                let imageUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                let weatherEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(imageUrl)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
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
                return message.reply({content:`${args} için hava durumu verileri :white_sun_small_cloud:`,embeds:[weatherEmbed]});
            })
            .catch(err => {
                console.error(err);
                return message.reply('Veri bulunamadı');
            });
    }
};