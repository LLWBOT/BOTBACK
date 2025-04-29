const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "settings",
    desc: "get env list.",
    react: '⚙️',
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

let madeMenu = `〽️ *LLW MD V1 SETTINGS* 〽️

*යටින් settings ටික බලාගන්න වෙනස් කරන්න ඕනෙ නම් .update setting එකේ තියෙන එක:ලකුන true or false...* 🔥
*EXAMPLE:* ${config.PREFIX}update AUTO_REPLY:true හරි false හරි✅

*PREFIX:* ${config.PREFIX}

*MODE:* ${config.MODE}

*AUTO READ STATUS:* ${config.AUTO_READ_STATUS}

*AUTO REPLY:* ${config.AUTO_REPLY}

*AUTO VOICE:* ${config.AUTO_VOICE}

*AUTO STICKER:* ${config.AUTO_STICKER}

> *LLW MD V1 BY LLW EDITZ* 🗿
`
await conn.sendMessage(from,{image:{url:"https://files.catbox.moe/egqzxo.jpg"},caption:madeMenu},{quoted:mek})



}catch(e){
console.log(e)
reply(`${e}`)
}
})
