import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import MainPage from './components/MainPage/MainPage'
import AuthPage from './components/AuthPage/AuthPage'
const App = () => {
  return (
    <Switch>
      {/* 메인 페이지 연결 */}
      <Route exact path='/' render={() => <Redirect to="auth" />} />
      <Route exact path='/auth' component={AuthPage} />
      <Route exact path='/main' component={MainPage} />
    </Switch>
  );
}

export default App;
