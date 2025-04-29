const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "ping",
    alias: ["status","botinfo"],
    react: '🎾',
    desc: "check bot speed",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = ` *PONG......* ✅


> *LLW MD V1 BY LLW* 🗿
`
return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)

}
})
