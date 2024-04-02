import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export const Crud = () => {
  const titles = [
    "Editor de Maestros",
    "Editor de Eventos",
    "Editor de Periodos",
    "Asingacion de clases",
    "Clases",
    "Alumnos",
    "Materias",
    "Grupos",
    "Plan de Estudios", 
    "Calificaciones" ]
    
  return (
    <div>
      {Object.keys(Objeto).map(key => (
        <p key={key}>{key}</p>
      ))}
    </div>
  )
}
