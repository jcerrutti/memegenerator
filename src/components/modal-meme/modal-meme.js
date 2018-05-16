import React, { Component } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import { _generateNewInstance } from '../../api/memegenerator'

class ModalMeme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text0: '',
      text1: '',
      imageRendered: null,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.generateNewInstance = this.generateNewInstance.bind(this)
    this.resetModal = this.resetModal.bind(this)
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      imageRendered: nextProps.memeSelected.imageUrl,
    }
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
    _generateNewInstance(obj)
      .then(result => {
        console.log(result)
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
    })

    onClose()
  }

  render() {
    const { show, memeSelected } = this.props
    const { text0, text1, imageRendered } = this.state
    return (
      <React.Fragment>
        {memeSelected && (
          <Modal show={show} onHide={this.resetModal}>
            <Modal.Header closeButton>
              <Modal.Title>{memeSelected.displayName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="show-grid">
                <Col xs={12} md={8}>
                  <img alt={memeSelected.urlName} src={imageRendered} />
                </Col>
                <Col xs={6} md={4}>
                  <form onSubmit={this.generateNewInstance}>
                    <input
                      type="text"
                      name="text0"
                      placeholder="Top text"
                      value={text0}
                      onChange={this.handleInputChange}
                    />
                    <input
                      type="text"
                      name="text1"
                      placeholder="Bottom text"
                      value={text1}
                      onChange={this.handleInputChange}
                    />
                    <button type="submit">Generate</button>
                  </form>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        )}
      </React.Fragment>
    )
  }
}

export default ModalMeme
