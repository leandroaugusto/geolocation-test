import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toBe('Scaffold App');
    expect(wrapper).toMatchSnapshot();
  });
});
