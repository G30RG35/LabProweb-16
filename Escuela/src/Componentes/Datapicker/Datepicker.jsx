import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
const Datepicker = ({ onDateSelected }) => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(3); // April (0-indexed)
  const [day, setDay] = useState(20);

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  const handleDayChange = (event) => {
    setDay(parseInt(event.target.value));
  };

  const selectedDate = new Date(year, month, day);

  const handleDateSelection = () => {
    onDateSelected(selectedDate);
  };

  return (
    <div className="datepicker">
        <p>Fecha de nacimeinto</p>
      <label>Año:</label>

      <Form.Control
        type="number"
        size="sm"
        value={year}
        onChange={handleYearChange}
      />

      <label>Mes:</label>

      <Form.Control
        type="number"
        size="sm"
        value={month + 1}
        min={1}
        max={12}
        onChange={handleMonthChange}
      />

      <label>Día:</label>

      <Form.Control
        size="sm"
        type="number"
        value={day}
        min={1}
        max={31}
        onChange={handleDayChange}
      />

      <Button className="mt-2" onClick={handleDateSelection} >Seleccionar</Button>
      <div className="selected-date">
        Fecha seleccionada: {selectedDate.toLocaleDateString()}
      </div>
    </div>
  );
};

export default Datepicker;
