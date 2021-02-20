const discord = require('discord.js')
const commandController = require('./commands')
const { readFileSync } = require('fs')
const { getCache } = require('./utils/cache')
const reactionListener = require('./utils/reactionListener')

const { token } = JSON.parse(readFileSync('hidden.json'))

const client = new discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  getCache().postListeners?.forEach(({ id, channel }) => {
    client.channels.fetch(channel).then(channel => {
      channel.messages.fetch(id).then(message => {
        reactionListener(message)
      })
    })
  })
})

client.on('message', message => commandController(message, client))

client.login(token)

module.exports = client
