const { getPrefix } = require('../utils/prefix')

module.exports = (msg, command) => {
  msg.channel.send(
    `Unknown command \`${command}\`, use \`${getPrefix(
      userMessage.guild.id
    )}help\` for help`
  )
}
