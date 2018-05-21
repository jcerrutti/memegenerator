import axios from 'axios'

const API_KEY = '87564251-bffa-4deb-a642-aa29c864dbf4'

const BASE_URL = 'https://memegen.link/'
const API = 'api/'
const TEMPLATE = 'templates/'
const SEARCH_MEME = 'Generators_Search'
const GENERATE_INSTANCE = 'Instance_Create'

const QUERY = 'q='
const PAGE_SIZE = 'pageSize='
const PAGE_INDEX = 'pageIndex='
const GENERATOR_ID = 'generatorID='
const TEXT_0 = 'text0='
const TEXT_1 = 'text1='

export function _searchMemeByQuery(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}${SEARCH_MEME}?${QUERY}${query}&apiKey=${API_KEY}`)
      .then(result => resolve(result.data))
      .catch(err => reject(err))
  })
}

export function _getMostPopularMemes(pageIndex = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}${API}${TEMPLATE}`)
      .then(result => {
        const data = result.data
        let templateArray = []
        let limit = 0
        for (const key in data) {
          limit++
          const segments = data[key].split('/')
          const meme = segments[segments.length - 1]
          const memeURI = `${BASE_URL}${meme}`
          templateArray.push(memeURI)
          if (limit === 20) {
            break
          }
        }
        resolve(templateArray)
      })
      .catch(err => reject(err))
  })
}

export function _generateNewInstance(instance) {
  const { text0, text1, generatorID } = instance
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${BASE_URL}${GENERATE_INSTANCE}?${GENERATOR_ID}${generatorID}&${TEXT_0}${text0}&${TEXT_1}${text1}&$&apiKey=${API_KEY}`,
      )
      .then(result => resolve(result.data.result))
      .catch(err => reject(err))
  })
}
