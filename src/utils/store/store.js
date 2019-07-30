import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import IsAuth from '../reducer/IsAuth';

export default createStore(
    IsAuth,
    applyMiddleware(logger)
);
