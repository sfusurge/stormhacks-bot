const { readFileSync, writeFileSync } = require('fs')
const { getPrefix } = require('../prefix')

const verifyFilePath = `${__dirname}/../verify.json`

module.exports = (userMessage, args) => {
  const sendError = error =>
    userMessage.channel.send(error).then(() => userMessage.delete())

  if (args.length != 1) {
    sendError(`Invalid usage, use \`${getPrefix()}verify {email address}\``)
    return
  }

  const [emailAddress] = args
  const verifyFileData = JSON.parse(readFileSync(verifyFilePath))

  if (verifyFileData[emailAddress] === undefined) {
    sendError(
      `Unknown email address. Try again with the email you used to apply for StormHacks or contact an organizer in the #verify-help channel`
    )
    return
  }

  if (userMessage.member.roles.cache.find(role => role.name === 'Hacker')) {
    sendError(
      `${userMessage.author.toString()}, you have already been verified.`
    )
    return
  }

  if (verifyFileData[emailAddress] !== false) {
    sendError(
      `That email has already been verified. Contact an organizer in the #verify-help channel if you think that was a mistake.`
    )
    return
  }

  const hackerRole = userMessage.guild.roles.cache.find(
    role => role.name === 'Hacker'
  )

  if (!hackerRole) {
    console.warn('Filed to find role Hacker!')
    return
  }

  userMessage.member.roles.add(hackerRole.id)

  verifyFileData[emailAddress] = {
    user: userMessage.member.user.tag,
    time: Date.now(),
  }
  writeFileSync(verifyFilePath, JSON.stringify(verifyFileData), () => {})
  userMessage.channel
    .send(`${userMessage.author.toString()}, you have now been verified.`)
    .then(() => userMessage.delete())
}
