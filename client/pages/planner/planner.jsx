import React, { useContext } from 'react';
import { AppContext } from '../../app';
import Redirect from '../../components/redirect';

export default function Planner(props) {

  const { user, route, userList, day } = useContext(AppContext);

  if (!user) {
    return <Redirect to='sign-up' />;
  }

  if (route.path === '') {
    return (
      <div>Welcome!</div>
    );
  }

  // console.log('user list in side planner comp:', userList);
  // console.log('user in planner:', user);
  // console.log('day:', day);
  // console.log('current route:', route);
  const selectedDayList = userList.filter(workout => workout.date === day);

  return (
    selectedDayList.map((element, index) => {
      return (
        <div key={index} className='accordion-item card'>
          <div className='card-header d-flex justify-content-center text-bg-light p-2' id={`flush-heading${index}`}>
            <button className='collapsed dg-background' data-bs-toggle='collapse' data-bs-target={`#flush-collapse${index}`} aria-expanded='true' aria-controls={`flush-collapse${index}`}>
              <h3 className='text-white'>
                {element.name}
              </h3>
            </button>
          </div>
          <div id={`flush-collapse${index}`} className='collapse' aria-labelledby={`flush-heading${index}`} data-parent='#accordionFlush'>
            {element.details}
          </div>
        </div>
      );

    })
  );

  // const WorkoutDetails = props => {
  //   const selectedDayList = userList.filter(workout => workout.date === day);
  //   selectedDayList.map()

  // };

  // return (
  //   <>
  //     {selectedDayList}
  //   </>
  // );

  // return (
  //   <table className='w-100'>
  //       <tbody className='container'>
  //       <tr className='row'>
  //         <td className='col ms-4'>
  //           exercise list
  //         </td>

  //         <td className='col'>
  //           set/reps list
  //         </td>

  //       </tr>

  //       </tbody>

  //     </table>
  // );

}
