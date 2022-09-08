import React, { useContext } from 'react';
import { AppContext } from '../app';

export default function Navbar(props) {
  const { user, setTarget, setView, day } = useContext(AppContext);

  const defaultTarget = {
    exerciseId: null,
    date: null,
    name: '',
    details: ''
  };

  const defaultCustomView = () => {
    setTarget(defaultTarget);
    setView('custom');
  };

  const plannerView = () => {
    setTarget(defaultTarget);
    window.location.hash = day;
  };

  if (user) {
    return (
      <nav className='container foot-bar nav-bar-style'>
        <div className='nav-bar dg-background d-flex justify-content-between align-items-center ps-3 pe-3'>
          <div className='nav-bar-items'>
            <i className='fa-solid fa-calendar fs-3 text-white' onClick={plannerView}></i>
            <i className="fa-solid fa-caret-up fs-3 text-white nav-bar-active"></i>
          </div>
          <a className='text-white' href='#stopwatch'>
            <i className='fa-solid fa-stopwatch fs-3' onClick={() => setTarget(defaultTarget)}></i>
            <i className="fa-solid fa-caret-up"></i>
          </a>
          <a className='text-white' href='#calories'>
            <i className='fa-solid fa-bowl-food fs-3' onClick={() => setTarget(defaultTarget)}></i>
            <i className="fa-solid fa-caret-up"></i>
          </a>
          <a className='text-white' href='#default-list'>
            <i className='fa-solid fa-circle-plus fs-3' onClick={() => setTarget(defaultTarget)}></i>
            <i className="fa-solid fa-caret-up"></i>
          </a>
          <a className='text-white' href='#custom-workout'>
            <i className='fa-solid fa-pen fs-3' onClick={defaultCustomView}></i>
            <i className="fa-solid fa-caret-up"></i>
          </a>
        </div>
      </nav>
    );
  }
}
