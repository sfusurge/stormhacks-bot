const { getPrefix } = require('../utils/prefix')

module.exports = userMessage => {
  userMessage.channel.send(
    `\`\`\`Verify your email using this command to get access to other channels:\n${getPrefix(
      userMessage.guild.id
    )}verify email@address.com\`\`\``
  )
}
