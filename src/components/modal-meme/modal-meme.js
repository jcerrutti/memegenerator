import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Loader, Input, Button } from 'semantic-ui-react'
import { _generateNewInstance } from '../../api/memegenerator'
import './modal-meme.css'

class ModalMeme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text0: '',
      text1: '',
      imageLoaded: false,
      imageRendered: null,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.generateNewInstance = this.generateNewInstance.bind(this)
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.resetModal = this.resetModal.bind(this)
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      imageRendered: nextProps.memeSelected.imageUrl,
    }
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true })
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  generateNewInstance(event) {
    event.preventDefault()
    const { text0, text1 } = this.state
    const { generatorID } = this.props.memeSelected
    const obj = {
      generatorID,
      text0,
      text1,
    }
    this.setState({
      imageLoaded: false,
    })
    _generateNewInstance(obj)
      .then(result => {
        this.setState({
          imageRendered: result.instanceImageUrl,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  resetModal() {
    const { onClose } = this.props
    this.setState({
      text0: '',
      text1: '',
      imageRendered: null,
      imageLoaded: false,
    })

    onClose()
  }

  render() {
    const { show, memeSelected } = this.props
    const { text0, text1, imageRendered, imageLoaded } = this.state
    return (
      <React.Fragment>
        {memeSelected && (
          <Modal show={show} onHide={this.resetModal}>
            <Modal.Header closeButton>
              <Modal.Title>{memeSelected.displayName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className={!imageLoaded ? 'image-loading' : ''}
                alt={memeSelected.urlName}
                src={imageRendered}
                onLoad={this.handleImageLoaded}
              />
              {!imageLoaded && <Loader active size="huge"/>}
              <form className="meme-form" onSubmit={this.generateNewInstance}>
                <Input
                  type="text"
                  name="text0"
                  placeholder="Top text"
                  value={text0}
                  onChange={this.handleInputChange}
                />
                <Input
                  type="text"
                  name="text1"
                  placeholder="Bottom text"
                  value={text1}
                  onChange={this.handleInputChange}
                />
                <Button className="form-action-button" primary type="submit">
                  Generate
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        )}
      </React.Fragment>
    )
  }
}

export default ModalMeme
