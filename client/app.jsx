import React, { useState, useEffect } from 'react';
import Schedule from './components/schedule';
import Header from './components/header';
import PageContent from './components/page-content';
import Navbar from './components/navbar';
import Planner from './pages/planner';
import { Calories } from './pages/calories';
import { Stopwatch } from './pages/stopwatch';
import { AddWorkout } from './pages/add-workout';
import { parseRoute } from './lib';

const App = () => {
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    window.addEventListener('hashchange', event => {
      setRoute(parseRoute(window.location.hash));
    });
  });

  const renderPage = () => {
    if (route.path === '') {
      return <Planner />;
    }
    if (route.path <= '7') {
      return <Planner />;
    }
    if (route.path === 'calories') {
      return <Calories />;
    }
    if (route.path === 'stopwatch') {
      return <Stopwatch />;
    }
    if (route.path === 'workouts') {
      return <AddWorkout />;
    }
  };

  return (
    <>
      <Header />
        <Schedule />
          <PageContent>
            {renderPage()}
          </PageContent>
            <Navbar />
    </>
  );
};

export default App;
