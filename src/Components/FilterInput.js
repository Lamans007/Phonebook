import React from 'react';


const FilterInput = ({filteredNames, handleFilter}) => {
    return(
      <input value={filteredNames} onChange={handleFilter}/>
    )
  }


  export default FilterInput;