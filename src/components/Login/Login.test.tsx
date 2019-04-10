import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {Login} from './Login';
import Auth from '../../services/Auth';

describe('<Login />', () => {
  let props: {
    onLogin: () => any
  };
  let wrapper: ReactWrapper;
  
  afterEach(() => {
    Auth.logout();
    wrapper.unmount();
  });
  
  it('should not submit empty form', () => {
    wrapper = mount(<Login {...props}/>);
    const event = {
      target: {token: {value: ''}},
      preventDefault: () => null
    };
    
    (wrapper.instance() as Login).handleSubmit(event);
    expect(Auth.getToken()).toBeNull();
  });
  
  it('should submit login form with value and execute "onLogin" callback', () => {
    const onLogin = jest.fn();
    props = {
      onLogin
    };
    wrapper = mount(<Login {...props}/>);
    const event = {
      target: {token: {value: '12345'}},
      preventDefault: () => null
    };
    
    (wrapper.instance() as Login).handleSubmit(event);
    expect(Auth.getToken()).toEqual('12345');
  });
});