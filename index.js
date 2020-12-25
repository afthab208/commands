const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json')


const { readdirSync } = require('fs');

const { join } = require('path')

client.commands= new Discord.Collection();

const prefix = "cd";


const { profile } = require('console');
const { config } = require('process');

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () =>{
    console.log('i am ready');
});



client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;


   

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})






client.login(token);