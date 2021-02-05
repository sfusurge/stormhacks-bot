const { getPrefix } = require('../prefix')

const commands = {
  setPrefix: require('./setPrefix'),
  verify: require('./verify'),
  unknown: require('./unknown'),
}

module.exports = (client, userMessage) => {
  let prefix = getPrefix()

  if (userMessage.mentions.has(client.user)) {
    userMessage.channel.send(
      `Listing for prefix \`${prefix}\`\nUse \`${prefix}help\` for help`
    )
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

    // switch (command) {
    //   case 'prefix':
    //     setPrefix(userMessage, args)
    //     break
    //   case 'help':
    //     commands.help(userMessage, args)
    //     break
    //   default:
    //     commands.unknown(userMessage, command)
    //     break
    // }
  }
}
