require('dotenv').config();
const vars = require('./vars');
const fetch = require('node-fetch');
const { Client } = require('discord.js');
/* --------------------------------------------------------------------------------------------------- */

const client = new Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} is online.`);

    setInterval(async () => {
        if (vars.users.length > 0) {
            var tempUser = randElement(vars.users);
            await client.user.setActivity(`${tempUser.username}`, { type: 'WATCHING' });
        }
    }, 60000);

    var i = 0;
    setInterval(async () => {
        try {
            await client.user.setStatus(vars.statuses[i%3]).then(() => console.log(`Updated status to ${vars.statuses[i%3]}`))
        } catch (error) {
            console.log(error);
        }    
        i++;
    }, 60000);
});

client.on('message', async (message) => {
    if (!vars.users.includes(message.author)) {
        vars.users.push(message.author);
    }

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

        if (command.substr(0,7) == 'profile') {
            if (message.embeds.length > 0) {
                try {
                    await client.user.setAvatar(message.embeds[0].url);
                    console.log('Changed avatar');
                } catch(error) {
                    console.log('Changing avatar too fast');
                }
            }
            /*} else {
                client.user.setAvatar(message.author.displayAvatarURL());
            }*/
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