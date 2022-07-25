import React, { useState, useEffect, createContext } from 'react';
import Schedule from './components/schedule';
import Header from './components/header';
import PageContent from './components/page-content';
import Navbar from './components/navbar';
import Planner from './pages/planner/planner';
import { DefaultWorkoutList } from './pages/add-workout/default-workout-list';
import { CustomWorkoutForm } from './pages/add-workout/custom-workout-form';
import { Calories } from './pages/calories';
import { Stopwatch } from './pages/stopwatch';
import { parseRoute } from './lib';

export const AppContext = createContext(null);

const App = () => {
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [defaultList, setWorkoutList] = useState([]);

  useEffect(() => {
    fetch('/api/defaultList')
      .then(res => res.json())
      .then(workoutList => setWorkoutList(workoutList));
  }, []);

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
    if (route.path === 'default-list') {
      return <DefaultWorkoutList list={defaultList} />;
    }
    if (route.path === 'custom-workout') {
      return <CustomWorkoutForm />;
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
