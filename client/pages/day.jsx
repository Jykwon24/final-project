import React from 'react';

const days = [
  { name: 'Sun', active: true },
  { name: 'Mon', active: '' },
  { name: 'Tues', active: '' },
  { name: 'Wed', active: '' },
  { name: 'Thurs', active: '' },
  { name: 'Fri', active: '' },
  { name: 'Sat', active: '' }
];

export default function Week() {
  return (
    <div className='container'>
      <div className='row text-center week-style'>
        {
          days.map((day, index) => (
            <a key={index}
              href={day.name}
              className={day.active ? 'dg-background col text-white text-decoration-none font-size' : 'col text-black text-decoration-none font-size'}>
              {day.name}
            </a>
          ))
        }
      </div>

    </div>

  );
}
