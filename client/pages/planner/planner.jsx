import React from 'react';

export default function Planner(props) {
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
