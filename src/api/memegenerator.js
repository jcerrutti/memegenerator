import axios from 'axios'

const API_KEY = '87564251-bffa-4deb-a642-aa29c864dbf4'

const BASE_URL = 'http://version1.api.memegenerator.net//'
const MOST_POPULAR = 'Generators_Select_ByPopular'
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
      .get(`${BASE_URL}${MOST_POPULAR}?${PAGE_INDEX}${pageIndex}&${PAGE_SIZE}20&apiKey=${API_KEY}`)
      .then(result => resolve(result.data))
      .catch(err => reject(err))
  })
}

export function _generateNewInstance(instance) {
  const { text0, text1, generatorID } = instance
  debugger
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${BASE_URL}${GENERATE_INSTANCE}?${GENERATOR_ID}${generatorID}&${TEXT_0}${text0}&${TEXT_1}${text1}&$&apiKey=${API_KEY}`
      )
      .then(result => resolve(result.data.result))
      .catch(err => reject(err))
  })
}
