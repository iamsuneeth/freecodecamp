import React from 'react';
import ReactDOM from 'react-dom';
import './vendors/bootstrap-grid.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers/simon-reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
