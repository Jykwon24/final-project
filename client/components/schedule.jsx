import React, { useContext } from 'react';
import { PageTitle } from './page-title';
import { AppContext } from '../app';

export default function Week() {
  // const [currentDay, setActive] = useState('');
  const { user, setDay, day, setTarget } = useContext(AppContext);

  const days = [
    { id: 1, name: 'Sun', active: day },
    { id: 2, name: 'Mon', active: '' },
    { id: 3, name: 'Tues', active: '' },
    { id: 4, name: 'Wed', active: '' },
    { id: 5, name: 'Thurs', active: '' },
    { id: 6, name: 'Fri', active: '' },
    { id: 7, name: 'Sat', active: '' }
  ];

  let currentDayDisplay;

  const active = 'dg-background-active col text-white text-decoration-none font-size';
  const deactive = 'col text-black text-decoration-none font-size';

  const handleClick = element => {
    setDay(element.id);
    setTarget({ exerciseId: null, date: null, name: '', details: '' });
  };

  if (user) {
    return (
    <>
      <div className='container'>
        <div className='row text-center week-style'>
          {
            days.map(element => {
              if (day === element.id) {
                currentDayDisplay = active;
              } else {
                currentDayDisplay = deactive;
              }
              return (
                <a key={element.id}
                  id={element.id}
                  href={`#${element.id}`}
                  onClick={() => handleClick(element)}
                  className={currentDayDisplay}>
                  {element.name}
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
}
