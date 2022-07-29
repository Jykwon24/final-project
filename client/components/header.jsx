import React from 'react';

export default function Header(props) {
  return (
   <div>
     <div className='d-flex justify-content-space-between'>
        <h1 className='d-inline pt-2 ms-4'>Fit Track</h1>
        <i className="fa-solid fa-fire-flame-curved"></i>
        <hr />
        <button onClick={() => props.onSignOut()}>Sign Out</button>
        <a href='#test'>click me</a>
     </div>
   </div>
  );
}
