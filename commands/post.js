const { readFileSync, writeFileSync } = require('fs')
const { getPrefix } = require('../utils/prefix')
const { getCache, writeToCache } = require('../utils/cache')
const reactionListener = require('../utils/reactionListener')

const verifiedListPath = `${__dirname}/../verified.json`
const attendedFilePath = `${__dirname}/../attend.json`

module.exports = (userMessage, args) => {
  if (args.length < 2) {
    return userMessage.channel.send(
      `Invalid usage, use \`${getPrefix(
        userMessage.guild.id
      )}post #channel message\``
    )
  }

  const channelToPost = args[0].slice(2, -1)

  const messageToPost = args.slice(1)

  if (!userMessage.member.roles.cache.find(role => role.name === 'Moderator')) {
    return userMessage.channel.send(
      `You do not have permission to use this command.`
    )
  }

  userMessage.client.channels.fetch(channelToPost).then(channel => {
    channel.send(messageToPost.join(' ')).then(sent => {
      writeToCache({
        postListeners: [
          ...(getCache().postListeners ?? []),
          { id: sent.id, channel: sent.channel.id },
        ],
      })

      reactionListener(sent)
    })
  })
}
