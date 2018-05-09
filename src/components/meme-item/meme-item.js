import React from 'react'

const MemeItem = ({ item, onSelect }) => {
  return (
    <div onClick={() => onSelect(item)}>
      <img alt={item.urlName} src={item.imageUrl} />
    </div>
  )
}

export default MemeItem
