import React from 'react';

const Notification = ({ message }) => {
  const errorMesStyle = {
    color: 'green',
    border: '2px solid',
    padding: '6px',
    margin: '1px'
  }
  if (message === null) {
    return null
  }

  return (
    <div style={errorMesStyle}>
      {message}
    </div>
  )
}

const ShowPhonebook = ({persons, filteredNames, handleDelete, message}) => {
    const toShow = filteredNames ? persons.filter( person => person.name.toLowerCase().includes(filteredNames.toLowerCase()) ) : persons
    return(
      <div>
        <Notification message={message}/>
        {toShow.map(person => 
          <div key={person.id}>
            <p>{person.name} {person.number}</p>
            {person.name && <button value={person.id} onClick={handleDelete}>Delete</button>}
            </div>
          )}
      </div>
    )
  }

  export default ShowPhonebook;