import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

const NOOP = () => null;

describe('<Button />', () => {
  it('renders', () => {
    const wrapper = shallow(<Button onClick={NOOP}>Button</Button>);
    expect(wrapper.matchesElement(<button className="Button">Button</button>))
      .toEqual(true);
  })
});