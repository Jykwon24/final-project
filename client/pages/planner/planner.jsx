import React, { useContext } from 'react';
import { AppContext } from '../../app';
import Redirect from '../../components/redirect';

export default function Planner(props) {

  const { user, route, userList } = useContext(AppContext);
  // console.log('planner page', user);

  if (!user) {
    return <Redirect to='sign-up' />;
  }

  if (route.path === '') {
    return (
      <div>Welcome!</div>
    );
  }

  // console.log(userList);
  // console.log(route);
  // const selectedDayList = [];
  return (
    userList.map((element, index) => {
      return (
      <div key={index}>{element.name}</div>
      );

    })
  );

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
