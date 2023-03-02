import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../app';
import Redirect from '../components/redirect';

export default function Planner(props) {
  const [clicked, setClick] = useState(false);

  const { day, user, route, userList, setUserList, setTarget, setView } = useContext(AppContext);

  async function getUserList() {
    const response = await fetch('/api/userList/' + `${day}`, {
      headers: {
        authorization: localStorage.getItem('user-Id')
      }
    });
    const uList = await response.json();
    // console.log(uList);
    setUserList(uList);
  }

  useEffect(() => {
    getUserList();
    // .then(res => res.json())
    // .then(retrievedList => setUserList(retrievedsList));
  }, [day]);

  if (!user) {
    return <Redirect to='sign-up' />;
  }

  if (route.path === '') {
    return (
      <div>Welcome!</div>
    );
  }

  // async function getUserList() {
  //   const req = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ day })
  //   };
  //   const uList = await (await fetch('/api/userList', req)).json();
  //   setUserList(uList);
  // }

  // useEffect(() => {
  //   getUserList();
  //   // .then(res => res.json())
  //   // .then(retrievedList => setUserList(retrievedList));
  // }, [day]);

  const userListCopy = userList;
  // console.log(userList);

  // const selectedDayList = userListCopy.filter(workout => workout.date === day);

  const updateTarget = event => {
    const databaseId = event.currentTarget.getAttribute('exerciseid');

    // console.log('shallow copy of list:', userListCopy);
    // console.log('exercise iD in database:', databaseId);

    const editTargetIndex = userListCopy.findIndex(element => element.exerciseId === Number(databaseId));
    // console.log(userListCopy[editTargetIndex]);
    setTarget(userListCopy[editTargetIndex]);
    setView('update');

    window.location.hash = 'custom-workout';
  };

  const handleDelete = event => {
    const databaseId = event.currentTarget.getAttribute('exerciseid');
    const bodyData = { exerciseId: databaseId };
    const deleteTargetIndex = userList.findIndex(element => element.exerciseId === Number(databaseId));
    const currentDayTargetIndex = userListCopy.findIndex(element => element.exerciseId === Number(databaseId));

    userList.splice(deleteTargetIndex, 1);
    userListCopy.splice(currentDayTargetIndex, 1);
    setUserList(userList);

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

  // return (
  //   userListCopy.map((element, index) => {
  //     return (
  //       <div key={index} id='accordionFlush' className='accordion container accordion-flush'>
  //         <div className='accordion-item card'>
  //           <div className='d-flex justify-content-between' id={`flush-heading${index}`} >
  //             <div className='collapsed text-black flex-fill card-header' data-bs-toggle='collapse' data-bs-target={`#flush-collapse${index}`} aria-expanded='true' aria-controls={`flush-collapse${index}`}>
  //               <h5>
  //                 {element.name}
  //               </h5>
  //             </div>
  //             <div className='card-header'>
  //               <i id={index} exerciseid={element.exerciseId} onClick={updateTarget} className='fa-solid fa-pen-to-square fs-3'></i>
  //               <i id={index} exerciseid={element.exerciseId} onClick={handleDelete} className='fa-solid fa-xmark ms-2 fs-3'></i>
  //             </div>
  //           </div>
  //           <div id={`flush-collapse${index}`} className='collapse' aria-labelledby={`flush-heading${index}`} data-parent='#accordionFlush'>
  //            <div>
  //             {element.details}
  //            </div>
  //           </div>
  //         </div>
  //       </div>

  //     );

  //   })
  // );

  // console.log('inside planner:', userListCopy);

  return (
    userListCopy.map((element, index) => {
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
                <i id={index} exerciseid={element.exerciseId} onClick={updateTarget} className='fa-solid fa-pen-to-square fs-3'></i>
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
