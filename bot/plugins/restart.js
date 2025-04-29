const config = require('../config')
const {cmd , commands} = require('../command')
const {sleep} = require('../lib/functions')

cmd({
    pattern: "restart",
    desc: "restart the bot",
    react: '⚠️️',
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const {exec} = require("child_process")
reply("⚠️️ *LLW MD IS RESTARTING* ♻️\n\n*llw බොට් ආයෙ connect වෙනකම් වැඩ නැහෑ...බය වෙන්න එපා තප්පර 20ක් වගේ කාලයක් විතරයි යන්න්...බොට්ගෙ ප්‍රශ්නයක් ආවොත් මේ restart command එක use කරන්න තියෙන්නෙ...* 🔥")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})
