import React from 'react';
import RootContainer from './src/root';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { mainReducer } from './src/reducers/main-reducer';

const store = createStore(mainReducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
