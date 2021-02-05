const { getPrefix } = require('../prefix')

module.exports = userMessage => {
  userMessage.channel.send(
    `\`\`\`Verify your email using this command to get access to other channels:\n${getPrefix()}verify <your email>\`\`\``
  )
}
