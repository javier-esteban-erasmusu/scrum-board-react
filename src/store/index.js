import {reducer} from './reducer.js';
import { createStore } from 'redux';

export const store = createStore(reducer);