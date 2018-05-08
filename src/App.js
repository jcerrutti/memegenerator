import React, { Component } from 'react'
import logo from './logo.svg'
import axios from 'axios'
import './App.css'

import Search from './components/search/search'

const API_KEY = '87564251-bffa-4deb-a642-aa29c864dbf4'

const BASE_URL = 'http://version1.api.memegenerator.net//'
const SEARCH_MEME = 'Generators_Search'
const QUERY = 'q='

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
    }

    this.searchMeme = this.searchMeme.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    event.preventDefault()
    const { searchTerm } = this.state
    this.searchMeme(searchTerm)
  }

  searchMeme(searchTerm) {
    axios
      .get(`${BASE_URL}${SEARCH_MEME}?${QUERY}${searchTerm}&apiKey=${API_KEY}`)
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  render() {
    const { searchTerm } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Search onChange={this.onSearchChange} onSubmit={this.onSearchSubmit} value={searchTerm}>
            Search
          </Search>
        </div>
      </div>
    )
  }
}

export default App
