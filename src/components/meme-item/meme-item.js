import React from 'react'
import './meme-item.css'
import { Loader } from 'semantic-ui-react'

class MemeItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      item: null,
      onSelect: null,
      imageLoaded: false,
      imageErrored: false,
    }

    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.handleImageErrored = this.handleImageErrored.bind(this)
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      item: nextProps.item,
      onSelect: nextProps.onSelect,
    }
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true })
  }

  handleImageErrored() {
    this.setState({ imageErrored: true })
  }

  render() {
    const { item, onSelect, imageLoaded } = this.state
    return (
      <div className="meme-item__content" onClick={() => onSelect(item)}>
        <img
          className="meme-item__image"
          alt={item.urlName}
          src={item.imageUrl}
          onLoad={this.handleImageLoaded}
          onError={this.handleImageErrored}
        />
        {!imageLoaded && <Loader active inline/>}
      </div>
    )
  }
}

export default MemeItem
