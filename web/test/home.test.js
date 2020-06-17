
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../src/modules/pages/Home'
 
const mockStore = configureStore([]);
 
describe('My Connected React-Redux Component', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });
 
    component = renderer.create(
      <Provider store={store}>
        <Router>
        <Home />
        </Router>);
        
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});