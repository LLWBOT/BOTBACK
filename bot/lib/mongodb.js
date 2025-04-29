const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://files.catbox.moe/egqzxo.jpg' },
    { key: 'ALIVE_MSG', value: '`LLW MD IS ALIVE!` ✅\n\n🔥 *අනේ පැන්චො බොට් වැඩ* ✅🔥\n\n⚠️️ *ඉතින් බොට් ගැන ප්‍රශ්නයක් තිබේ නම්* 👇\n\n*LLW (ඔව් ඔව් තමා හැදුවෙ bot😅) CONTACT කරගන්න -* 94705564619\n\n> *DEVELOPED BY LLW EDITZ* 〽️' },
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'MODE', value: 'public' },
    { key: 'AUTO_VOICE', value: 'true' },
    { key: 'AUTO_STICKER', value: 'true' },
    { key: 'AUTO_REPLY', value: 'true' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected to llw ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
