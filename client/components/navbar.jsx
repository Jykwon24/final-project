import React from 'react';

export default function Navbar() {
  return (
   <nav className='nav-bar-style'>
     <div className='nav-bar dg-background d-flex justify-content-between align-items-center ps-3 pe-3'>
       <a className='text-white' href=''>
         <i className='fa-solid fa-calendar fs-3'></i>
       </a>
       <a className='text-white' href=''>
         <i className='fa-solid fa-stopwatch fs-3'></i>
       </a>
       <a className='text-white' href="">
          <i className='fa-solid fa-bowl-food fs-3'></i>
       </a>
        <a className='text-white' href="">
          <i className='fa-solid fa-circle-plus fs-3'></i>
       </a>
     </div>
   </nav>
  );
}
