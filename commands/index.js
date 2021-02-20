const { getPrefix } = require('../utils/prefix')

const commands = {
  // setPrefix: require('./setPrefix'),
  verify: require('./verify'),
  unknown: require('./unknown'),
  help: require('./help'),
  post: require('./post'),
}

module.exports = (userMessage, client) => {
  const guildSnowflake = userMessage.guild.id
  const prefix = getPrefix(guildSnowflake)

  if (userMessage.mentions.has(client.user)) {
    commands.help(userMessage)
  }

  if (userMessage.content.indexOf(prefix) === 0) {
    const args = userMessage.content
      .slice(prefix.length)
      .split(' ')
      .map(arg => arg.toLowerCase())

    const command = args.shift()

    console.log(`new command '${command}' with args`, args)

    if (commands[command]) {
      commands[command](userMessage, args)
    } else {
      commands.unknown(userMessage, command)
    }
  }
}
