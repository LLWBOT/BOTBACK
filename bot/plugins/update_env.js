const { updateEnv, readEnv } = require('../lib/database');
const EnvVar = require('../lib/mongodbenv');
const { cmd } = require('../command');

cmd({
    pattern: "update",
    alias: ["updateenv"],
    desc: "Check and update environment variables",
    category: "owner",
    filename: __filename,
},
async (conn, mek, m, { from, q, reply, isOwner }) => {
    if (!isOwner) return;

    if (!q) {
        return reply("⚠️️ *Please provide the command* \n\nExample: `.update ALIVE_MSG: LLW MD EXAMPLE✅`");
    }

    // Find the position of the first colon or comma
    const colonIndex = q.indexOf(':');
    const commaIndex = q.indexOf(',');

    // Ensure we have a valid delimiter index
    const delimiterIndex = colonIndex !== -1 ? colonIndex : commaIndex;
    if (delimiterIndex === -1) {
        return reply("⚠️️ *wrong command.please use:* `.update KEY:VALUE`");
    }

    // Extract key and value
    const key = q.substring(0, delimiterIndex).trim();
    const value = q.substring(delimiterIndex + 1).trim();
    
    // Extract mode if provided
    const parts = value.split(/\s+/).filter(part => part.trim());
    const newValue = value; // Use the full value as provided by the user
    const mode = parts.length > 1 ? parts.slice(1).join(' ').trim() : '';
    
    const validModes = ['public', 'private', 'groups', 'inbox'];
    const finalMode = validModes.includes(mode) ? mode : '';

    if (!key || !newValue) {
        return reply("⚠️️ *wrong command.please use:* `.update KEY:VALUE`");
    }

    // Specific checks for MODE, ALIVE_IMG, and AUTO_READ_STATUS
    if (key === 'MODE' && !validModes.includes(newValue)) {
        return reply(`⚠️️ *wrong mode. Valid modes are: ${validModes.join(', ')}*`);
    }

    if (key === 'ALIVE_IMG' && !newValue.startsWith('https://')) {
        return reply("⚠️️ *URL not found..*");
    }

    if (key === 'AUTO_READ_STATUS' && !['true', 'false'].includes(newValue)) {
        return reply("⚠️️ *wrong command for AUTO_READ_STATUS. Please use `true` or `false`.*");
    }

    try {
        // Check if the environment variable exists
        const envVar = await EnvVar.findOne({ key: key });

        if (!envVar) {
            // If the variable does not exist, fetch and list all existing env vars
            const allEnvVars = await EnvVar.find({});
            const envList = allEnvVars.map(env => `${env.key}: ${env.value}`).join('\n');
            return reply(`⚠️️ *The command ${key} not found.*\n\n*Here are the existing environment variables:*\n\n${envList}`);
        }

        // Update the environment variable
        await updateEnv(key, newValue, finalMode);
        reply(`✅ *llw command updated sucess*\n\n🗃️ *${key}* to ${newValue} ${finalMode ? `\n*Mode:* ${finalMode}` : ''}`);
        
    } catch (err) {
        console.error('Error updating environment variable:' + err.message);
        reply("⚠️️ *Failed to update command. Please try again.*" + err);
    }
});
