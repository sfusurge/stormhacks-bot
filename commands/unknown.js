const { getPrefix } = require('../prefix')

module.exports = (msg, command) => {
  msg.channel.send(
    `Uknown command \`${command}\`, use \`${getPrefix()}help\` for help`
  )
}
