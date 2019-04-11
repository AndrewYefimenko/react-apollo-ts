import React, { Component, Props } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './apollo';
import Auth from './services/Auth';
import { Login, Layout, Button } from './components';
import './App.css';
import { Profile } from './components/Profile/Profile';

const initialState = {isAuthenticated: false};
type State = Readonly<typeof initialState>

export default class App extends Component<Props<object>, State> {
  public readonly state: State = initialState;
  
  public componentDidMount() {
    this.checkAuthentication();
    Auth.subscribe('root', this.checkAuthentication.bind(this));
  }
  
  public shouldComponentUpdate(nextProps: object, nextState: State) {
    return this.state.isAuthenticated !== nextState.isAuthenticated;
  }
  
  public render() {
    const {isAuthenticated} = this.state;
    
    return (
      <ApolloProvider client={client}>
        <Layout>
          <div className="App-header">
            <h2 className="App-title">Starred Repositories</h2>
            {isAuthenticated && <Button onClick={() => this.logout()}>Log Out</Button>}
          </div>
          {isAuthenticated ? <Profile/> : <Login/>}
        </Layout>
      </ApolloProvider>
    );
  }
  
  public componentWillUnmoutn() {
    Auth.unsubscribe('root');
  }
  
  private checkAuthentication(): void {
    const isAuthenticated = Auth.isLoggedIn();
    this.setState({isAuthenticated});
  }
  
  private logout(): void {
    Auth.logout();
    client.clearStore();
  }
}
