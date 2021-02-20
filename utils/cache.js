const { readFileSync, existsSync, writeFileSync, writeFile } = require('fs')

const cachePath = `${__dirname}/../data/cache.json`
let cache

if (!existsSync(cachePath)) {
  cache = {}
  writeFileSync(cachePath, JSON.stringify(cache))
} else {
  cache = JSON.parse(readFileSync(cachePath))
}

const getCache = () => cache

const writeToCache = obj => {
  cache = { ...cache, ...obj }
  writeFile(cachePath, JSON.stringify(cache), () => {})
}

module.exports = {
  getCache,
  writeToCache,
}
