import React, { Component } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'

class ModalMeme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topText: '',
      bottomText: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.log = this.log.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }

  log(event) {
    event.preventDefault()
    console.log(this.state)
  }

  render() {
    const { onClose, show, memeSelected } = this.props
    const { topText, bottomText } = this.state
    return (
      <React.Fragment>
        {memeSelected && (
          <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>{memeSelected.displayName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="show-grid">
                <Col xs={12} md={8}>
                  <img alt={memeSelected.urlName} src={memeSelected.imageUrl} />
                </Col>
                <Col xs={6} md={4}>
                  <form onSubmit={this.log}>
                    <input
                      type="text"
                      name="topText"
                      placeholder="Top text"
                      value={topText}
                      onChange={this.handleInputChange}
                    />
                    <input
                      type="text"
                      name="bottomText"
                      placeholder="Bottom text"
                      value={bottomText}
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
