import React, { useState, useEffect, createContext } from 'react';
import Schedule from './components/schedule';
import jwtDecode from 'jwt-decode';
import Header from './components/header';
import PageContent from './components/page-content';
import Navbar from './components/navbar';
import Planner from './pages/planner/planner';
import { AuthPage } from './pages/auth-page';
import { DefaultWorkoutList } from './pages/add-workout/default-workout-list';
import { CustomWorkoutForm } from './pages/add-workout/custom-workout-form';
import { Calories } from './pages/calories';
import { Stopwatch } from './pages/stopwatch';
import { parseRoute } from './lib';

export const AppContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  // const [day, setDay] = useState('1');
  const [isAuthorizing, setAuth] = useState(true);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [defaultList, setWorkoutList] = useState([]);

  useEffect(() => {
    fetch('/api/defaultList')
      .then(res => res.json())
      .then(workoutList => setWorkoutList(workoutList));
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
  });

  useEffect(() => {
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setAuth(false);
  }, [user]);

  // const handleSignIn = result => {
  //   const { user, token } = result;
  //   window.localStorage.setItem('react-context-jwt', token);
  //   setUser(user);
  // };

  // const handleSignOut = () => {
  //   window.localStorage.removeItem('react-context-jwt');
  //   setUser(null);
  // };

  const renderPage = () => {
    if (route.path === 'sign-up' || route.path === 'sign-in' || route.path === '') {
      return <AuthPage />;
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

  const contextValue = { user, isAuthorizing, route };

  return (
    <AppContext.Provider value={contextValue}>
      <>
        <Header />
        <Schedule />
        <PageContent>
          {renderPage()}
        </PageContent>
        <Navbar />
      </>
    </AppContext.Provider>
  );
};

export default App;
