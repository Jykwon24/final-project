import React from 'react';

export default function Header(props) {
  return (
   <div>
     <div className='d-flex justify-content-between'>
       <div>
          <h1 className='d-inline pt-2 ms-4'>Fit Track</h1>
          <i className="fa-solid fa-fire-flame-curved"></i>
       </div>
       <div>
        <button className='mt-3 me-4' onClick={() => props.onSignOut()}>Sign Out</button>
       </div>
     </div>
      <hr />
   </div>
  );
}
