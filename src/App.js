import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Board from './components/Board';

import store from './state/store';

store.subscribe(() => {
  //console.log('dispatch');
});

window.setInterval(() => {
  store.dispatch({ type: 'MOVE_DOWN' });
},1000);

class App extends Component {
  componentWillMount() {
    document.addEventListener('keydown', e => {
      switch(e.keyCode) {
        case 39:
          store.dispatch({ type: 'MOVE_RIGHT' });
          break;
        case 37:
          store.dispatch({ type: 'MOVE_LEFT' });
          break;
        case 40:
          store.dispatch({ type: 'MOVE_DOWN' });
          break;
      }
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Board />
      </Provider>
    );
  }
}

export default App;
