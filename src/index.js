import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

//import * as actions from './actions';

const store = createStore(reducers);

// console.log(store.getState());
// // store에 변화가 있을때, 실행될 Callback 함수를 등록 시킴.
// const unsubscribe = store.subscribe(() => console.log(store.getState()));
//
// store.dispatch(actions.increment());
// store.dispatch(actions.increment());
// store.dispatch(actions.decrement());
// store.dispatch(actions.setColor([200, 200, 200]));
//
// unsubscribe();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)