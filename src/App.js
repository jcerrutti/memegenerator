import React, { Component } from 'react'
import './App.css'

import { _searchMemeByQuery, _getMostPopularMemes } from './api/memegenerator'
import Search from './components/search/search'
import Grid from './components/grid/grid'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      list: [],
      memeSelected: null,
    }

    this.searchMeme = this.searchMeme.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.memeSelected = this.memeSelected.bind(this)
  }

  memeSelected(item) {
    this.setState({
      memeSelected: item,
    })
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
    _searchMemeByQuery(searchTerm)
      .then(result => {
        this.setState({
          list: result.result,
          memeSelected: null,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentDidMount() {
    _getMostPopularMemes()
      .then(result => {
        this.setState({
          list: result.result,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    const { searchTerm, list, memeSelected } = this.state
    return (
      <div className="App">
        {
          // <header className="App-header">
          // <img src={logo} className="App-logo" alt="logo" />
          // <h1 className="App-title">Welcome to React</h1>
          // </header>
        }
        <div>
          <Search onChange={this.onSearchChange} onSubmit={this.onSearchSubmit} value={searchTerm}>
            Search
          </Search>
          {memeSelected && memeSelected.displayName}
          <Grid onSelect={this.memeSelected} list={list} />
        </div>
      </div>
    )
  }
}

export default App
