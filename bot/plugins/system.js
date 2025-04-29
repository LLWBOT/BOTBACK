const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    react: '📊',
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `📂 *LLW MD SYSTEM INFO* 📂

📊 *UPTIME:*  ${runtime(process.uptime())}

📊 *RAM USAGE:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB

📊 *HOST:* ${os.hostname()}

📊 *LLW MD OWNER:* LLW EDITZ🧑‍💻

📊 *CONTACT LLW:* 94705564619


> *LLW MD 2025*💫
`
return reply(`${status}`)


}catch(e){
console.log(e)
reply(`${e}`)

}
})
