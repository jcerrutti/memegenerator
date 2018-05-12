import React from 'react'
import MemeItem from '../meme-item/meme-item'

const Grid = ({list, onSelect}) => {
  return (
    <div className="row">
      {list.length > 0 && list.map((item) => 
        <MemeItem
          onSelect={onSelect}
          key={item.generatorID}
          item={item}>
        </MemeItem>
      )}
    </div>
  )
}

export default Grid