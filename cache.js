const { readFileSync, existsSync, writeFileSync, writeFile } = require('fs')

const CACHE_PATH = 'cache.json'
let cache

if (!existsSync(CACHE_PATH)) {
  cache = { prefix: '/' }
  writeFileSync(CACHE_PATH, JSON.stringify(cache))
} else {
  cache = JSON.parse(readFileSync(CACHE_PATH))
}

const getCache = () => cache

const writeToCache = obj => {
  cache = { ...cache, ...obj }
  writeFile(CACHE_PATH, JSON.stringify(cache), () => {})
}

module.exports = {
  getCache,
  writeToCache,
}
