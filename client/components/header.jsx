import React, { useContext } from 'react';
import { AppContext } from '../app';

export default function Header(props) {

  const { calories, user } = useContext(AppContext);

  return (
   <div>
     <div className='d-flex justify-content-between'>
       <div className='d-flex justify-content-between align-items-center'>
          <h1 className='ms-4 mb-0'>Fit Track</h1>
          <i className='fa-solid fa-fire-flame-curved fs-4 logo-style'></i>
       </div>
       <div>
        <h6 className='mt-3 me-4 sign-out-style' onClick={() => props.onSignOut()}>Sign Out</h6>
       </div>
     </div>
     <div className='ms-4'>
        <p className='mb-0'>Lets get started <span className='user-style'>{user.username}</span>!</p>
     </div>
      <hr className='mt-1 mb-1' />
      {
         calories
           ? <div className='ms-4'>
              <h6>Daily calorie goal:{calories}</h6>
             </div>
           : null
      }
   </div>
  );
}
