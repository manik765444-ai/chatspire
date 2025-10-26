// Import required modules
const express = require('express');
const Discord = require('discord.js');
const client = new Discord.Client();
const app = express();
const port = process.env.PORT || 3000;

// Create a new Express app
app.use(express.json());

// Discord bot token
const token = process.env.DISCORD_TOKEN;

// Event listener for when the bot is ready
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

// Event listener for when a message is sent
client.on('message', (message) => {
    if (message.author.bot) return;

    // Check if the message content starts with the prefix
    if (message.content.startsWith('!')) {
        const args = message.content.slice(1).split(' ');
        const command = args.shift().toLowerCase();

        // Handle different commands
        switch (command) {
            case 'ping':
                message.channel.send('Pong!');
                break;
            default:
                message.channel.send(`Unknown command: ${command}`);
        }
    }
});

// Event listener for errors
client.on('error', (error) => {
    console.error('Error occurred:', error);
});

// Event listener for unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection:', reason);
});

// Event listener for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

// Login to Discord
client.login(token);

// Start the Express app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});