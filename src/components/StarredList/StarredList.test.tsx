import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {StarredList} from './StarredList';
import { fakeRepos } from '../../utils/testUtil';
import { Repository } from '../../models';

let nodes: Repository[] = fakeRepos(3);

describe('<StarredList />', () => {
  it('renders and displays properties', () => {
    const wrapper = shallow(<StarredList items={nodes} viewerId={'123'} />)
    const items = wrapper.find('StarredListItem');
    expect(items.length).toBe(3);
    expect(items.at(1).prop('id')).toEqual(nodes[1].id);
  });
  
  it('matches snapshot', () => {
    const wrapper = shallow(<StarredList items={nodes} viewerId={'123'} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});