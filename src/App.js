import React, { Component } from 'react'
import './App.css'

import { _searchMemeByQuery, _getMostPopularMemes } from './api/memegenerator'
import Search from './components/search/search'
import Grid from './components/grid/grid'
import ModalMeme from './components/modal-meme/modal-meme'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      list: [],
      memeSelected: null,
      modalOpen: false,
      page: 0,
    }

    this.searchMeme = this.searchMeme.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.memeSelected = this.memeSelected.bind(this)
    this.openMemeModal = this.openMemeModal.bind(this)
    this.closeMemeModal = this.closeMemeModal.bind(this)
    this.showMore = this.showMore.bind(this)
  }

  memeSelected(item) {
    this.setState({
      memeSelected: item,
    })
    this.openMemeModal()
  }

  openMemeModal() {
    this.setState({
      modalOpen: true,
    })
  }

  closeMemeModal() {
    this.setState({
      modalOpen: false,
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

  showMore() {
    let { page } = this.state
    page++
    _getMostPopularMemes(page).then(result => {
      this.setState(prevState => {
        return {
          page,
          list: [...prevState.list, ...result.result],
        }
      })
    })
  }

  componentDidMount() {
    _getMostPopularMemes()
      .then(result => {
        this.setState({
          list: result,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    const { searchTerm, list, memeSelected, modalOpen } = this.state
    return (
      <div className="App">
        {
          // <header className="App-header">
          // <img src={logo} className="App-logo" alt="logo" />
          // <h1 className="App-title">Welcome to React</h1>
          // </header>
        }
        <div>
          <Search
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            value={searchTerm}
          />
          <Grid onSelect={this.memeSelected} onShowMore={this.showMore} list={list} />
          {memeSelected && (
            <ModalMeme show={modalOpen} memeSelected={memeSelected} onClose={this.closeMemeModal} />
          )}
        </div>
      </div>
    )
  }
}

export default App
