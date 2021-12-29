import React from 'react';
import Home from './pages/home/Home';
import './app.scss';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Watch from './pages/watch/Watch';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import pagePath from './constants/pagepath';

const App = () => {
  const user = true;

  return (
    <Router>
      <Routes>
        <Route
          exact
          path={pagePath.defaultPath}
          element={
            user ? <Home /> : <Link  to={pagePath.register} />
          }
        />
        <Route path={pagePath.movies} element={<Home type='movies' />} />
        <Route path={pagePath.series} element={<Home type='series' />} />

        <Route path={pagePath.register} element={<Register />} />
        <Route path={pagePath.login} element={<Login />} />
        <Route path={pagePath.watch} element={<Watch />} />
      </Routes>
    </Router>
  );
};

export default App;
