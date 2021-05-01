require('dotenv').config();
const vars = require('./vars');
const fetch = require('node-fetch');
const { Client } = require('discord.js');
/* --------------------------------------------------------------------------------------------------- */

const client = new Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('message', async (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.mentions.has(client.user)) {
        message.reply(`I'll mess you up :${randElement(vars.allEmojis)}:`);
    }

    if (message.content.startsWith('#')) {
        const command = message.content.replace('#', '');
        
        if (command == 'fishindanger') {
            var dangerous = '';
            for (var s of vars.blacklist) {
                dangerous += s.substr(0,s.length-5).toUpperCase() + ', ';
            }
            dangerous = dangerous.substr(0, dangerous.length-2);
            message.channel.send(`STEP AWAY FROM THE FISH ${dangerous}`);
        }

        if (command.substr(0, 7) == 'insult ') {
            fetch(vars.url2).then((res) => {return res.text();}).then((text) => {
                message.channel.send(`Hey, ${command.split(' ')[1]},  ${text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&gt;/g, '>')}`);
            });
        }

        if (command.substr(0, 8) == 'insult2 ') {
            fetch(vars.url3).then((res) => {return res.text();}).then((text) => {
                message.channel.send(`Hey, ${command.split(' ')[1]},  ${text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&gt;/g, '>')}`);
            });
        }

        if (command == 'identify') {
            message.reply(`I have consulted the gods who tell me with ${Math.floor(Math.random() * 100)}% certainty, you are a ${randElement(vars.fishEmoji)}`);
        }
    }

    if (vars.blacklist.includes(message.author.tag) && message.content.toLowerCase().includes('fish')) {
        Promise.all([
            fetch(vars.url1),
            fetch(vars.url2)
        ]).then((responses) => {
            return Promise.all(responses.map((response) => {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) { // if response is in json format
                    return response.json();
                } else {
                    return response.text();
                }
            }));
        }).then((data) => {
            var retort = "";
            for (var i = 0; i < data.length; i++) {
                if (data[i].insult == undefined) {
                    retort += data[i] + " ";
                } else {
                    retort += data[i].insult + " ";
                }
            }
            message.reply(retort);
        }).catch((error) => {
            console.log(error);
        });
    }
});

function randElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}