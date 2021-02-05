const { getCache: cache, writeToCache } = require('./cache')

const getPrefix = () => cache().prefix

const setPrefix = newPrefix => {
  if (typeof newPrefix !== 'string') {
    console.warn(`Attempting to set prefix to non-string '${newPrefix}'`)
    return
  } else if (newPrefix === cache().prefix) {
    console.warn(`Attempting to set prefix to current prefix`)
    return
  }
  writeToCache({ prefix: newPrefix })
}

module.exports = { getPrefix, setPrefix }
