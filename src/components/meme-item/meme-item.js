import React from 'react'
import './meme-item.css'

const MemeItem = ({ item, onSelect }) => {
  return (
    <div className="meme-item__content" onClick={() => onSelect(item)}>
      <img className="meme-item__image" alt={item.urlName} src={item.imageUrl} />
    </div>
  )
}

export default MemeItem
