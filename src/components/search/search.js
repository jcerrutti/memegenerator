import React from 'react'

const Search = ({ value, onSubmit, onChange, children }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {children}
        <input type="text" value={value} onChange={onChange} />
        <button type="submit">{children}</button>
      </form>
    </div>
  )
}

export default Search
