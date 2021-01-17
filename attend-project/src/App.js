import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import MainPage from './components/MainPage/MainPage'
import AuthPage from './components/AuthPage/AuthPage'

const App = () => {
  return (
    <Switch>
      {/* 메인 페이지 연결 */}
      <Route exact path='/' component={MainPage} />
      <Route exact path='/auth' component={AuthPage} />
    </Switch>
  );
}

export default App;
