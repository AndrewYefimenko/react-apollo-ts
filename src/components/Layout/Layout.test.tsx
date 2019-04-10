import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from './Layout';
import toJson from 'enzyme-to-json';

describe('<Layout />', () => {
  it('renders and displays properties', () => {
    const wrapper = shallow(<Layout><p>text</p></Layout>);
  
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
