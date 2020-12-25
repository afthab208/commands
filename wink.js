const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "wink",
    description: "wink",

    run: async (client, message, args) => {
        const url = 'https://some-random-api.ml/animu/wink';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An Error Occured , Try Again Later`)
        }

        const embed = new MessageEmbed()
        .setTitle(`@${message.author.username} winks at @${message.mentions.users.first().username || message.mentions.members.first()}`)
        .setImage(data.link)

        await message.channel.send(embed)
    }
}