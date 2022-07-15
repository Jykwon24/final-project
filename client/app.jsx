import React/* { useState, useEffect } */from 'react';
import Week from './pages/day';
import Header from './components/header';
import PageView from './pages/page-content';
import Navbar from './components/navbar';
// import { parseRoute } from './lib';

// export default class App extends React.Component {
//   render() {
//     return <Home />;
//   }
// }

const App = () => {
  // const [route, setRoute] = useState(parseRoute(window.location.hash));

  // useEffect(() => {
  //   window.addEventListener('hashchange', event => {
  //     setRoute(parseRoute(window.location.hash));
  //   });
  // });

  // const renderPage = () => {
  //   if (route.path === 'page1') {
  //     return <Home />;
  //   }
  //   if (route.path === 'page2') {
  //     return <CurrentDay />;
  //   }
  // };

  return (
    <>
      <Header />
      <Week />
      <PageView />
      <Navbar />
    </>
  );
};

export default App;
