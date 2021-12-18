import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// => Redux & Store
import { Provider } from 'react-redux';
import { createStore, Store, applyMiddleware } from 'redux';
import reducers from './Reducers/ReducerCombiner';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
// redux dev tools
//const devToolsExtension: string = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
//const composeEnhancer = window[devToolsExtension] || compose;
// export const store: Store<any> = enhancer(reducers, applyMiddleware(thunk));
export const store: Store<any> = createStore(reducers, applyMiddleware(thunk));
// new Startup(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <App loading={false} />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
