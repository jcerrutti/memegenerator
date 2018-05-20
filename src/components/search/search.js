import React from 'react'
import './search.css';
import { Button, Input, Icon } from 'semantic-ui-react'

const Search = ({ value, onSubmit, onChange, children }) => {
  return (
    <div>
      <form className="search-container" onSubmit={onSubmit}>
        <Input className="search-input" placeholder="Search..." type="text" value={value} onChange={onChange} />
        <Button primary type="submit" icon>
          <Icon name="search" />
        </Button>
      </form>
    </div>
  )
}

export default Search
