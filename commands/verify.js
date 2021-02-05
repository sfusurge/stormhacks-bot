const { readFileSync, writeFileSync } = require('fs')
const { getPrefix } = require('../prefix')

const verifyFilePath = `${__dirname}/../verify.json`
const verifyFileData = JSON.parse(readFileSync(verifyFilePath))

module.exports = (userMessage, args) => {
  if (args.length != 1) {
    userMessage.channel.send(
      `Unknown command \`${command}\`, use \`${getPrefix()}verify {email address}\``
    )
  }

  const [emailAddress] = args

  if (verifyFileData[emailAddress] === undefined) {
    userMessage.channel.send(
      `Unknown email address. Try again with the email you used to apply for StormHacks or contact an organizer`
    )
    return
  }

  if (userMessage.member.roles.cache.find(role => role.name === 'Hacker')) {
    userMessage.channel.send(
      `${userMessage.author.toString()}, you have already been verified.`
    )
    return
  }

  if (verifyFileData[emailAddress] === true) {
    userMessage.channel.send(
      `\`${emailAddress}\` has already been verified by another user.`
    )
    return
  }

  const hackerRole = userMessage.guild.roles.cache.find(
    role => role.name === 'Hacker'
  )

  userMessage.member.roles.add(hackerRole.id)

  userMessage.channel.send(
    `${userMessage.author.toString()}, you have been verified as \`${emailAddress}\`.`
  )

  verifyFileData[emailAddress] = true
  writeFileSync(verifyFilePath, JSON.stringify(verifyFileData), () => {})
}
