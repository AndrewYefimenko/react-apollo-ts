import React from 'react';
import { shallow } from 'enzyme';
import StarredListItem from './StarredListItem';
import toJson from 'enzyme-to-json';
import { Repository } from '../../models';
import { Button } from '../Button/Button';

describe('<StarredListItem />', () => {
  let props: Repository;
  
  beforeEach(() => {
    props = {
      id: '1',
      description: 'react component',
      nameWithOwner: 'creator',
      url: 'http://localhost:3000',
      __typename: '__type'
    }
  });
  
  it('renders and matches snapshot', () => {
    const wrapper = shallow(
      <StarredListItem {...props}>
        <Button onClick={() => null}>Nested</Button>
      </StarredListItem>
    );
    
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  
  it('renders and displays properties', () => {
    const wrapper = shallow(<StarredListItem {...props} />);
    const title = wrapper.find('.StarredListItem-title');
    const description = wrapper.find('.StarredListItem-description');
    
    expect(title.text()).toBe(props.nameWithOwner);
    expect(title.props().href).toBe(props.url);
    expect(description.text()).toBe(props.description);
  });
  
  it('renders child components', () => {
    const wrapper = shallow(
      <StarredListItem {...props}>
        <Button onClick={() => null}>Nested</Button>
      </StarredListItem>
    );
    const nestedButton = wrapper.find('Button').childAt(0);
    
    expect(nestedButton.exists()).toBe(true);
    expect(nestedButton.text()).toBe('Nested');
  });
});