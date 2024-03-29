const Discord = require('discord.js');

// Command Handler
exports.run = async (client, message, args) => {

    let quiz = [
        { q: 'What color is the sky?', a: ['no color', 'invisible', 'blue', 'red', 'dark'] },
        { q: 'Name a soft drink brand.', a: ['pepsi', 'coke', 'rc', '7up', 'sprite', 'mountain dew'] },
        { q: 'Name a programming language.', a: ['actionscript', 'coffescript', 'c', 'c++', 'c#', 'visual basic', 'perl', 'javascript', 'dotnet', 'crystal', 'lua', 'go', 'python', 'rust', 'ruby', 'java'] },
        { q: 'Name a famous person.', a: ['Michael Jackson', 'Justin Bieber', 'Snoop Doog', '2pac', 'Eminem'] },
    ];
    let options = {
        max: 1,
        time: 30050, // 30050 = 30 seconds and a half ms
        errors: ['time'],
    };

    let item = quiz[Math.floor(Math.random() * quiz.length)];
    await message.channel.send(item.q);
    try {
        let collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
        let winnerMessage = collected.first();
        return message.channel.send({
            embed: new Discord.RichEmbed()
                .setAuthor(`Winner: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
                .setTitle(`Correct Answer: \`${winnerMessage.content}\``)
                .setFooter(`Question: ${item.q}`)
                .setColor('RANDOM')
        })

    } catch (_) {
        return message.channel.send({
            embed: new Discord.RichEmbed()
                .setAuthor('No one got the answer in time!')
                .setTitle(`Correct Answer(s): \`${item.a}\``)
                .setFooter(`Question: ${item.q}`)
                .setThumbnail('http://i7.glitter-graphics.org/pub/416/416417tqc1xyn393.gif')
        })

    }

} 
module.exports.config = {
    name: "quiz",
    description: "Some questions you have to answer",
    usage: "_quiz",
    accessableby: "Members",
    aliases: ["quiz", "trivia"]
}