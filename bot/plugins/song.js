const { cmd, commands } = require('../command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3'); // Importing the denethdev-ytmp3 package for downloading

cmd({
  pattern: "song",
  desc: "Download songs.",
  category: "download",
  react: '🎵',
  filename: __filename
}, async (messageHandler, context, quotedMessage, { from, reply, q }) => {
  try {
    if (!q) return reply("*Please Provide A Song Name or Url 🙂*");
    
    // Search for the song using yt-search
    const searchResults = await yts(q);
    if (!searchResults || searchResults.videos.length === 0) {
      return reply("*No Song Found...🙄*");
    }

    const songData = searchResults.videos[0];
    const songUrl = songData.url;

    // Using denethdev-ytmp3 to fetch the download link
    const result = await ddownr.download(songUrl, 'mp3'); // Download in mp3 format
    const downloadLink = result.downloadUrl; // Get the download URL

    let songDetailsMessage = `〽️ *LLW MD V1 SONG DOWNLOADER* 〽️\n\n`;
    songDetailsMessage += `*📊 TITLE:* ${songData.title}\n`;
    songDetailsMessage += `*📊 VIEWS:* ${songData.views}\n`;
    songDetailsMessage += `*📊 TIME:* ${songData.timestamp}\n`;
    songDetailsMessage += `*📊 AGO:* ${songData.ago}\n`;
    songDetailsMessage += `*📊 CHANNEL:* ${songData.author.name}\n`;
    songDetailsMessage += `*📊 URL:* ${songData.url}\n\n`;
    songDetailsMessage += `*Choose Your Download Format:*\n\n`;
    songDetailsMessage += `1 || AUDIO FORMAT 🎵\n`;
    songDetailsMessage += `2 || DOCUMENT FORMAT 📂\n\n`;
    songDetailsMessage += `> *LLW MD V1 BY LLW EDITZ*`;

    // Send the video thumbnail with song details
    const sentMessage = await messageHandler.sendMessage(from, {
      image: { url: songData.thumbnail },
      caption: songDetailsMessage,
    }, { quoted: quotedMessage });

    // Listen for the user's reply to select the download format
    messageHandler.ev.on("messages.upsert", async (update) => {
      const message = update.messages[0];
      if (!message.message || !message.message.extendedTextMessage) return;

      const userReply = message.message.extendedTextMessage.text.trim();

      // Handle the download format choice
      if (message.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
        switch (userReply) {
          case '1': // Audio File
            await messageHandler.sendMessage(from, {
              audio: { url: downloadLink },
              mimetype: "audio/mpeg"
            }, { quoted: quotedMessage });
            break;
          case '2': // Document File
            await messageHandler.sendMessage(from, {
              document: { url: downloadLink },
              mimetype: 'audio/mpeg',
              fileName: `${songData.title}.mp3`,
              caption: `${songData.title}\n\n*LLW MD SONG DOWNLOADED* ✅`
            }, { quoted: quotedMessage });
            break;
          default:
            reply("*OPTION NOT FOUND... 🚫*");
            break;
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply("*ERROR OCCURED ON LLW MD...🚫*");
  }
});
