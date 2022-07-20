import React, { useState } from 'react';
import { PageTitle } from './page-title';

export default function Week() {

  const [currentDay, setActive] = useState('');

  const days = [
    { id: 1, name: 'Sun', active: currentDay },
    { id: 2, name: 'Mon', active: '' },
    { id: 3, name: 'Tues', active: '' },
    { id: 4, name: 'Wed', active: '' },
    { id: 5, name: 'Thurs', active: '' },
    { id: 6, name: 'Fri', active: '' },
    { id: 7, name: 'Sat', active: '' }
  ];

  let currentDayDisplay;

  const active = 'dg-background col text-white text-decoration-none font-size';
  const deactive = 'col text-black text-decoration-none font-size';

  const handleClick = element => {
    setActive(element.id);
  };

  return (
    <>
      <div className='container'>
        <div className='row text-center week-style'>
          {
            days.map(day => {
              if (currentDay === day.id) {
                currentDayDisplay = active;
              } else {
                currentDayDisplay = deactive;
              }
              return (
                <a key={day.id}
                  id={day.id}
                  href={`#${day.id}`}
                  onClick={() => handleClick(day)}
                  className={currentDayDisplay}>
                  {day.name}
                </a>
              );
            })
          }
        </div>
      </div>
      <PageTitle />
    </>
  );
}
