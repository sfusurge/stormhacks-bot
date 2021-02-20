const { getCache, writeToCache } = require('./cache')

const getPrefix = guildSnowflake => {
  const guildCache = getCache()[guildSnowflake]

  if (guildCache?.prefix) return guildCache.prefix

  writeToCache({ [guildSnowflake]: { prefix: '/' } })
  return '/'
}

const setPrefix = (newPrefix, guildSnowflake) => {
  if (typeof newPrefix !== 'string') {
    console.warn(`Attempting to set prefix to non-string '${newPrefix}'`)
    return
  }
  if (newPrefix === getCache()[guildSnowflake].prefix) {
    console.warn(`Attempting to set prefix to current prefix`)
    return
  }
  writeToCache({ [guildSnowflake]: { prefix: newPrefix } })
}

module.exports = { getPrefix, setPrefix }
