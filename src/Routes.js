import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Reducer from './Store/Reducer';

const store = createStore(Reducer);

const routes = () => {

    return (
        <Provider store = {store} >
            <BrowserRouter>
            <App/>
            </BrowserRouter>
        </Provider>
    )
}


export default routes;