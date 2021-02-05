const discord = require('discord.js')
const controller = require('./commands/controller')
const { readFileSync } = require('fs')

const { token } = JSON.parse(readFileSync('hidden.json'))

const client = new discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => controller(client, message))

client.login(token)
