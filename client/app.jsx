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
  const [day, setDay] = useState(1);
  const [isAuthorizing, setAuth] = useState(true);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [defaultList, setWorkoutList] = useState([]);
  const [userList, setUserList] = useState([]);
  // const [listForDay, setListForDay] = useState({ day: 1, name: '', details: '' });

  useEffect(() => {
    fetch('/api/userList')
      .then(res => res.json())
      .then(retrievedList => setUserList(retrievedList));
  }, [setUserList]);

  useEffect(() => {
    // console.log('hash useeffect called');
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
  }, []);

  // console.log(route);

  useEffect(() => {
    fetch('/api/defaultList')
      .then(res => res.json())
      .then(workoutList => setWorkoutList(workoutList));
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem('user-Id');
    setUser(token ? jwtDecode(token) : null);
    setAuth(false);
  }, []);

  const handleSignIn = result => {
    const { user, token } = result;
    window.localStorage.setItem('user-Id', token);
    setUser(user);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('user-Id');
    setUser(null);
  };

  const handleAddWorkout = event => {
    if (event.target.tagName === 'BUTTON') {
      const target = event.currentTarget;
      const selectedDay = day;
      const name = target.firstElementChild.textContent;
      const details = target.nextElementSibling.firstElementChild.textContent;
      const userId = user.userId;

      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, selectedDay, name, details })
      };

      fetch('/api/userList/', req)
        .then(res => {
          if (!res.ok) {
            throw new Error('No network response');
          }
          return res.json();
        })
        .then(result => setUserList([...userList, result]))
        .catch(err => console.error(err));
      window.location.hash = day;
    }
  };

  const renderPage = () => {
    // console.log('renderpage', route);
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return <AuthPage />;
    }
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

  if (isAuthorizing) return null;

  const contextValue = {
    user,
    day,
    route,
    userList,
    setDay,
    isAuthorizing,
    handleSignIn,
    handleAddWorkout,
    setUserList
  };

  return (
    <AppContext.Provider value={contextValue}>
      <>
        <Header onSignOut={handleSignOut}/>
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
