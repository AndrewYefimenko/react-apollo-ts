import React from 'react';
import {Profile} from './Profile';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { fakeRepos } from '../../utils/testUtil';
import { STARED_REPOSITORIES } from '../../apollo';
import { MockedResponse } from 'react-apollo/test-links';
import wait from 'waait';
import toJson from 'enzyme-to-json';

let mocks: MockedResponse = {
  request: {query: STARED_REPOSITORIES },
  result: {"data": {"viewer": {"id": "111", "starredRepositories": {"nodes": fakeRepos(3)}}}},
};
let wrapper: ReactWrapper;

describe('<Profile />', () => {
  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });
  
  it('renders and matches snapshot', () => {
    let wrapper = shallow(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Profile/>
      </MockedProvider>
    );
    
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  
  it('displays loading message', () => {
    wrapper = mount(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Profile />
      </MockedProvider>
    );
    expect(wrapper.text()).toContain('Loading...');
  });
  
  it('it renders three items', async () => {
    wrapper = mount(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Profile/>
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    expect(wrapper.find('StarredListItem').length).toEqual(3);
  });
  
  it('should display error', async () => {
    mocks.error = new Error();
    wrapper = mount(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Profile/>
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    expect(wrapper.text()).toContain('Error')
  });
});