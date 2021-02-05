const { setPrefix } = require('../prefix')

module.exports = (userMessage, args) => {
  if (args.length !== 1) {
    userMessage.channel.send(
      `Incorrect usage, syntax: \`${prefix()}prefix {new prefix}\``
    )
    return
  }

  setPrefix(args[0])
  userMessage.channel.send(`Set prefix to ${args[0]}`)
}
