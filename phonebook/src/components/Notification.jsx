import React from 'react'

const Notification = ({message}) => {
    const style = {
        color: "green",
        fontWeight: 'bold',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'green',
        
    }

  return (
    <div><h2 style={style}>test</h2></div>
  )
}

export default Notification