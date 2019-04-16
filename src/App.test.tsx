import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Auth from './services/Auth';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('login component shown by default', () => {
    const wrapper = shallow(<App />);
    const login = wrapper.find('Login');
    expect(toJSON(wrapper.find('Profile'))).toBeNull();
    expect(login).toBeTruthy();
  });
  
  it('change state on login',  async () => {
    const wrapper = shallow(<App />);
    Auth.login('12345');
    const instance = wrapper.instance();
    expect(instance.state).toHaveProperty('isAuthenticated', true);
  });
  
  it('profile component after logged in', () => {
    const wrapper = mount(<App />);
  
    wrapper.instance().setState({isAuthenticated: true});
    wrapper.update();
    expect(wrapper.find('Login').exists()).toBe(false);
    expect(wrapper.find('Profile').exists()).toBe(true);
    wrapper.unmount();
  });
  
  it('should log out on log out button click', async () => {
    const wrapper = mount(<App />);
    wrapper.instance().setState({isAuthenticated: true});
    wrapper.update();
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().state).toHaveProperty('isAuthenticated', false);
    wrapper.unmount();
  });
});
