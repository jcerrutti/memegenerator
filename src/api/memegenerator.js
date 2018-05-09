import axios from 'axios'

const API_KEY = '87564251-bffa-4deb-a642-aa29c864dbf4'

const BASE_URL = 'http://version1.api.memegenerator.net//'
const MOST_POPULAR = 'Generators_Select_ByPopular'
const SEARCH_MEME = 'Generators_Search'

const QUERY = 'q='
const PAGE_SIZE = 'pageSize='
const PAGE_INDEX = 'pageIndex='

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
      .get(`${BASE_URL}${MOST_POPULAR}?${PAGE_INDEX}${pageIndex}&${PAGE_SIZE}20&$&apiKey=${API_KEY}`)
      .then(result => resolve(result.data))
      .catch(err => reject(err))
  })
}
