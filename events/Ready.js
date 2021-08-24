module.exports = {
    name:'ready',
    once:true,
    execute(client){
        client.user.setActivity('Hello World',{type:'LISTENING'});
        console.log(`Logged as a ${client.user.tag}`);
    }
};