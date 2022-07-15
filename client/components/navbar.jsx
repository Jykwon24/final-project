import React from 'react';

export default function Navbar() {
  return (
   <nav className='nav-bar-style'>
     <div className='dg-background d-flex justify-content-between'>
       <a href=''>
         <i className='fa-solid fa-calendar'></i>
       </a>
       <a href=''>
         <i className='fa-solid fa-stopwatch'></i>
       </a>
       <a href="">
          <i className="fa-solid fa-bowl-food"></i>
       </a>
       <a href="">
          <i className="fa-solid fa-circle-plus"></i>
       </a>
     </div>
   </nav>
  );
}
