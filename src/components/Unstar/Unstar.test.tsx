import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MockedResponse } from 'react-apollo/test-links';
import {Unstar} from './Unstar';
import { MockedProvider } from 'react-apollo/test-utils';
import { REMOVE_STAR, STARED_REPOSITORIES } from '../../apollo';
import { fakeRepos } from '../../utils/testUtil';
import wait from 'waait';
import { ApolloConsumer } from 'react-apollo';

let repos = fakeRepos(1);
const starrableId = repos[0].id;
let mocks: MockedResponse[] = [
  {
    request: {query: STARED_REPOSITORIES },
    result: {"data": {"viewer": {"id": "111", "starredRepositories": {"nodes": repos}}}},
  },
  {
    request: {query: REMOVE_STAR, variables: {"input": {"clientMutationId": "111", "starrableId": starrableId}}},
    result: {
      "data": {
        "removeStar": {
          "clientMutationId": "111",
          "starrable": {
            "id": starrableId,
            "viewerHasStarred": false
          }
        }
      }
    }
  },
  {
    request: {query: STARED_REPOSITORIES },
    result: {"data": {"viewer": {"id": "111", "starredRepositories": {"nodes": []}}}},
  }
];
let wrapper: ReactWrapper;

describe('<Unstar />', () => {
  afterEach(() => {
    wrapper.unmount();
  });
  
  it('it renders and displays props', async () => {
    wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Unstar starrableId={starrableId} clientMutationId="111"/>
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    expect(toJson(wrapper.find('button'))).toMatchSnapshot();
  });
  
  it('should be disabled after click', async () => {
    let apolloClient: any;
    let res;
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {(client: any) => {
            apolloClient = client;
            return <Unstar starrableId={starrableId} clientMutationId="111"/>
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
  
    const beforeClick = wrapper.find('button');
    wrapper.find('button').simulate('click');

    const afterClick = wrapper.find('button');
    expect(afterClick.props().disabled).toBe(true);
    expect(afterClick.props().disabled).not.toBe(beforeClick.props().disabled);
  });
  
  it('it unstars item when clicked', async () => {
    let apolloClient: any;
    let res;
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {(client: any) => {
            apolloClient = client;
            return <Unstar starrableId={starrableId} clientMutationId="111"/>
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait(0);
    wrapper.update();
    
    res = await apolloClient.query({query: STARED_REPOSITORIES});
    expect(res.data.viewer.starredRepositories.nodes).toHaveLength(1);
    wrapper.find('button').simulate('click');
    await wait(0);
    
    res = await apolloClient.query({query: STARED_REPOSITORIES});
    expect(res.data.viewer.starredRepositories.nodes).toHaveLength(0);
  })
});