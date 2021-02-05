const discord = require('discord.js')
const controller = require('./commands/controller')
// const {addGuild} = require('./roleManager')

const client = new discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => controller(client, message))

const discordSecret = process.env.discordSecret

client.login(discordSecret)
