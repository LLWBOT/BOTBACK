const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "botrepo",
    desc: "get repo link.",
    react: '🚀',
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menu = {
main: '',
download: '',
ai:'',
owner: '',
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
 }
}

let madeMenu = `〽️ *LLW MD V1 BOT GITHUB REPO* 〽️

*REPO එක හොයාගන්න බැරි උනොත් මේක පාවිච්චි කරන්න..* 🔥

https://github.com/LLWBOT/LLWMD

> *LLW MD V1 BY LLW EDITZ* 🗿
`
await conn.sendMessage(from,{image:{url:"https://files.catbox.moe/egqzxo.jpg"},caption:madeMenu},{quoted:mek})



}catch(e){
console.log(e)
reply(`${e}`)
}
})
