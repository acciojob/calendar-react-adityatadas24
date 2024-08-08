import React, {Component, useState} from "react";
import '../styles/App.css';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [newYear, setNewYear] = useState(selectedYear);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    if (!isEditingYear) {
      setIsEditingYear(true);
    } else {
      setSelectedYear(newYear);
      setIsEditingYear(false);
    }
  };

  const handleYearInputChange = (e) => {
    setNewYear(e.target.value);
  };

  const handleNavigation = (direction) => {
    if (direction === 'prevMonth') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else if (direction === 'nextMonth') {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    } else if (direction === 'prevYear') {
      setSelectedYear(selectedYear - 1);
    } else if (direction === 'nextYear') {
      setSelectedYear(selectedYear + 1);
    }
  };

  const generateDays = () => {
    const days = [];
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(<td key={day}>{day}</td>);
    }
    return days;
  };

  return (
    <div id="main">
      <h1 id="heading">Calendar</h1>
      <div>
        <button id="prevMonth" onClick={() => handleNavigation('prevMonth')}>&lt;</button>
        <select id="monthDropdown" value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <span
          id="yearDisplay"
          onDoubleClick={handleYearChange}
        >
          {isEditingYear ? (
            <input
              type="number"
              value={newYear}
              onChange={handleYearInputChange}
              onBlur={() => {
                setSelectedYear(newYear);
                setIsEditingYear(false);
              }}
              autoFocus
            />
          ) : (
            selectedYear
          )}
        </span>
        <button id="nextMonth" onClick={() => handleNavigation('nextMonth')}>&gt;</button>
      </div>
      <div>
        <button id="prevYear" onClick={() => handleNavigation('prevYear')}>&lt;&lt;</button>
        <button id="nextYear" onClick={() => handleNavigation('nextYear')}>&gt;&gt;</button>
      </div>
      <table id="calendarTable">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          <tr>{generateDays()}</tr>
        </tbody>
      </table>
    </div>
}


export default App;
