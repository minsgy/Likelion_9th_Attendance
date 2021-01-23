import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./reset.css"
// React 부트스트랩/Ant design
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "./index.css";

// 라우터 사용
import { BrowserRouter } from 'react-router-dom';

// 리덕스를 위한 참조
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import Reducer from './redux/reducers';



const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);
