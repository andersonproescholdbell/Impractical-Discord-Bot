require('dotenv').config();
const vars = require('./vars');
const fetch = require('node-fetch');
const { Client, Discord } = require('discord.js');
/* --------------------------------------------------------------------------------------------------- */

const client = new Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} is online.`);

    setInterval(async () => {
        if (vars.users.length > 0) {
            var tempUser = randElement(vars.users);
            try {
                await client.user.setActivity(`${tempUser.username}`, { type: 'WATCHING' });
                console.log(`Now watching ${tempUser.username}`);
            } catch(error) {
                console.log('Error setting new activity.');
            }
        }
            
    }, 120000);

    client.user.setStatus('invisible');
    /*var i = 0;
    setInterval(async () => {
        try {
            await client.user.setStatus(vars.statuses[i%3]).then(() => console.log(`Updated status to ${vars.statuses[i%3]}`))
        } catch (error) {
            console.log(error);
        }    
        i++;
    }, 120000);*/
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
            console.log('Told the hecklers to step away from the fish.');
        }

        if (command.substr(0, 7) == 'insult ') {
            fetch(vars.urls.insult1).then((res) => {return res.text();}).then((text) => {
                message.channel.send(`Hey, ${message.mentions.users.first()},  ${text}`);
                console.log(`Insulted ${message.mentions.users.first().username}`);
            });
        }

        if (command.substr(0, 8) == 'insult2 ') {
            fetch(vars.urls.insult2).then((res) => {return res.json();}).then((json) => {
                message.channel.send(`Hey, ${message.mentions.users.first()},  ${json.insult}`);
                console.log(`Insulted ${message.mentions.users.first().username}`);
            });
        }

        if (command.substr(0,11) == 'compliment ') {
            fetch(vars.urls.compliment).then((res) => {return res.json();}).then((json) => {
                message.channel.send(`Hey, ${message.mentions.users.first()},  ${json.compliment}`);
                console.log(`Complimented ${message.mentions.users.first().username}`);
            });
        }

        if (command == 'identify') {
            message.reply(`I have consulted the gods who tell me with ${Math.floor(Math.random() * 100)}% certainty, you are a ${randElement(vars.fishEmoji)}`);
        }

        if (command.substr(0,7) == 'profile') {
            console.log('Profile request');
            if (message.embeds.length > 0) {
                try {
                    await client.user.setAvatar(message.embeds[0].url);
                    console.log('Changed avatar');
                } catch(error) {
                    console.log('Changing avatar too fast');
                }
            } else {
                console.log('No profile pic embed.');
            }
        }

        if (command.substr(0,7) == 'fishify' && message.author.id == vars.ADMIN) {
            var time = parseInt(command.split(' ')[1]);
            try {
                if (vars.fishify[message.mentions.users.first().id] == undefined) {
                    if (time == NaN || time < 60000) {
                        message.reply('Make sure time between changes is at least 60000');
                    } else {
                        message.guild.member(message.mentions.users.first()).setNickname(randElement(vars.fishSpecies));
                        console.log(`Updated nickname of ${message.mentions.users.first().username}`);
                        vars.fishify[message.mentions.users.first().id] = [
                            setInterval(() => {
                                message.guild.member(message.mentions.users.first()).setNickname(randElement(vars.fishSpecies));
                                console.log(`Updated nickname of ${message.mentions.users.first().username}`);
                            }, time), 
                            message.guild.member(message.mentions.users.first()).nickname
                        ]
                    }
                } else {
                    try {
                        clearInterval(vars.fishify[message.mentions.users.first().id][0]);
                        message.guild.member(message.mentions.users.first()).setNickname(vars.fishify[message.mentions.users.first().id][1]);
                        delete vars.fishify[message.mentions.users.first().id];
                    } catch(error) {
                        console.log('No interval to delete');
                    }
                }
            } catch(error) {
                message.reply('Something went wrong, sorry.');
            }
        }

        if (command.substr(0, 3) == 'gif') {
            try {
                if (command.substr(4, command.lenth) == 'random') {
                    fetch(vars.urls.giphyRandom.replace('MYKEY', vars.GIPHY_KEY)).then((res) => {return res.json();}).then((json) => {
                        message.channel.send(`${json.data.url}`);
                        console.log(`Sent random gif ${json.data.url}`);
                    });
                } else {
                    var search = command.substr(4, command.lenth);
                    fetch(vars.urls.giphySearch.replace('QUERY', search).replace('MYKEY', vars.GIPHY_KEY)).then((res) => {return res.json();}).then((json) => {
                        message.channel.send(`${json.data[0].url}`);
                        console.log(`Sent gif search of ${search} ${json.data[0].url}`);
                    });
                }
            } catch(error) {
                console.log('Possibly too many GIPHY requests.');
            }
        }

        if (command == 'advice') {
            fetch(vars.urls.advice).then((res) => {return res.json();}).then((json) => {
                message.channel.send(`${json.slip.advice}`);
                console.log(`Sent advice: ${json.slip.advice}`);
            });
        }

        if (command == 'dog') {
            fetch(vars.urls.dog).then((res) => {return res.json();}).then((json) => {
                message.channel.send(`${json.url}`);
                console.log(`Sent dog ${json.url}`);
            });
        }

        if (command == 'help') {
            message.channel.send(vars.helpMessage);
        }
    }

    if (vars.blacklist.includes(message.author.tag) && message.content.toLowerCase().includes('fish')) {
        Promise.all([
            fetch(vars.urls.leaveAlone),
            fetch(vars.urls.insult1)
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