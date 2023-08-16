import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const Auth = React.lazy(() => import('./user/pages/Auth'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));

const App = () => {

  const { login, logout, token, userId} = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/places/new" element={<NewPlace />}></Route>
        <Route path="/:userID/places" element={<UserPlaces />}></Route>
        <Route path="/places/:placeID" element={<UpdatePlace />}></Route>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/:userID/places" element={<UserPlaces />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={
            <div className='center'>
              <LoadingSpinner/>
            </div>
          }>
          {routes}
          </Suspense>
          </main>
      </Router>
    </AuthContext.Provider>
  )

};

export default App;
