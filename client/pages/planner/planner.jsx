import React, { useState, useContext } from 'react';
import { AppContext } from '../../app';
import Redirect from '../../components/redirect';

export default function Planner(props) {
  const [clicked, setClick] = useState(false);

  const { user, route, userList, setUserList, day } = useContext(AppContext);

  if (!user) {
    return <Redirect to='sign-up' />;
  }

  if (route.path === '') {
    return (
      <div>Welcome!</div>
    );
  }
  // console.log(userList);
  // console.log('user list in side planner comp:', userList);
  // console.log('user in planner:', user);
  // console.log('day:', day);
  // console.log('current route:', route);

  const selectedDayList = userList.filter(workout => workout.date === day);

  // console.log(selectedDayList);

  const handleDelete = event => {
    const databaseId = event.currentTarget.getAttribute('exerciseid');
    const bodyData = { exerciseId: databaseId };
    // const exerciseIndex = event.target.id;

    const deleteTargetIndex = userList.findIndex(element => element.exerciseId === Number(databaseId));

    const currentDayTargetIndex = selectedDayList.findIndex(element => element.exerciseId === Number(databaseId));

    userList.splice(deleteTargetIndex, 1);
    selectedDayList.splice(currentDayTargetIndex, 1);
    setUserList(userList);

    // console.log('edited list:', userList);
    // console.log(deleteTargetIndex);
    // console.log('databaseId:', databaseId);
    // console.log('index for selectlist:', exerciseIndex);
    // console.log(bodyData);
    // console.log(userList);

    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    };

    fetch('/api/userList', req)
      .then(res => {
        if (!res.ok) {
          throw new Error('No network response');
        }
        return res.json();
      })
      .catch(err => console.error(err));

    setClick(!clicked);
  };

  return (
    selectedDayList.map((element, index) => {
      return (
        <div key={index} id='accordionFlush' className='accordion container accordion-flush'>
          <div className='accordion-item card'>
            <div className='d-flex justify-content-between' id={`flush-heading${index}`} >
              <div className='collapsed text-black flex-fill card-header' data-bs-toggle='collapse' data-bs-target={`#flush-collapse${index}`} aria-expanded='true' aria-controls={`flush-collapse${index}`}>
                <h5>
                  {element.name}
                </h5>
              </div>
              <div className='card-header'>
                <i id={index} className='fa-solid fa-pen-to-square fs-3'></i>
                <i id={index} exerciseid={element.exerciseId} onClick={handleDelete} className='fa-solid fa-xmark ms-2 fs-3'></i>
              </div>
            </div>
            <div id={`flush-collapse${index}`} className='collapse' aria-labelledby={`flush-heading${index}`} data-parent='#accordionFlush'>
             <div>
              {element.details}
             </div>
            </div>
          </div>
        </div>

      );

    })
  );

}
