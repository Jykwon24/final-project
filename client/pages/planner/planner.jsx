import React, { useContext } from 'react';
import { AppContext } from '../../app';
import Redirect from '../../components/redirect';

export default function Planner(props) {

  const { user } = useContext(AppContext);

  if (!user) return <Redirect to='sign-up' />;
  return (
  // <div className='row'>
  //   <ul className='col ms-4'>exercise list</ul>
  //   <ul className='col text-center'>set/reps list</ul>
  // </div>
    <table className='w-100'>
        <tbody className='container'>
        <tr className='row'>
          <td className='col ms-4'>
            exercise list
          </td>

          <td className='col'>
            set/reps list
          </td>

        </tr>

        </tbody>

      </table>
  );
}
