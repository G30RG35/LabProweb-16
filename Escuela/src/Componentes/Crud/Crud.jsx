import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


export const Crud = ({Objeto}) => {
  return (
    <div>
      {Object.keys(Objeto).map(key => (
        <p key={key}>{key}</p>
      ))}
    </div>
  )
}
