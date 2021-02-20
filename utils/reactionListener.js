const { getCache, writeToCache } = require('./cache')

module.exports = message => {
  const reactionListener = message.createReactionCollector(() => true)

  reactionListener.on('collect', (reaction, user) => {
    const cache = getCache()
    let verificationList = cache.verificationList

    if (!verificationList) {
      verificationList = JSON.parse(readFileSync(verifiedListPath))
      writeToCache({ verificationList })
    }

    if (verificationList[user.tag]) {
      const attendanceList = cache.attendanceList ?? {}

      if (!attendanceList[verificationList[user.tag]]) {
        attendanceList[verificationList[user.tag]] = true
        writeToCache({ attendanceList })
      }
    }
  })
}
