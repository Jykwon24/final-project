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
        <table key={index} id='accordionFlush' className='accordion container accordion-flush pt-3'>
          <tbody className='accordion-item card'>
            <tr className='card-header d-flex justify-content-between text-bg-light' id={`flush-heading${index}`}>
              <td className='collapsed text-black' data-bs-toggle='collapse' data-bs-target={`#flush-collapse${index}`} aria-expanded='true' aria-controls={`flush-collapse${index}`}>
                <h5>
                  {element.name}
                </h5>
              </td>
              <td>
                <i className='fa-solid fa-pen-to-square fs-3'></i>
                <i className='fa-solid fa-xmark ms-2 fs-3'></i>
              </td>
            </tr>
            <tr id={`flush-collapse${index}`} className='collapse' aria-labelledby={`flush-heading${index}`} data-parent='#accordionFlush'>
             <td>
              {element.details}
             </td>
            </tr>
          </tbody>
        </table>

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
