import React from 'react'
import './grid.css'
import MemeItem from '../meme-item/meme-item'
import { Button } from 'semantic-ui-react'

const Grid = ({list, onSelect, onShowMore}) => {
  return (
    <div className="grid">
      {list.length > 0 && list.map((item) => 
        <MemeItem
          onSelect={onSelect}
          key={item.generatorID}
          item={item}>
        </MemeItem>
      )}
      <Button onClick={onShowMore} basic>Show more...</Button>
    </div>
  )
}

export default Grid