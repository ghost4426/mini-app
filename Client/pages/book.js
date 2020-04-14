import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'cross-fetch/polyfill'
//Components
import BookList from '../components/BookList';
import AddBook from '../components/AddBook';
import Layout from '../components/MyLayout';


// const client = new ApolloClient({
//   link: createHttpLink({
//     uri: 'http://localhost:4000/graphql',
//     fetch: fetch,
//   }),
//   cache: new InMemoryCache(),
// })

const client = new ApolloClient({
  uri: 'https://lit-depths-99775.herokuapp.com/',
});

class App extends Component {
  render() {
    return (
      <Layout>
        <ApolloProvider client={client}>
          <div id="main">
            <h1>My Book Store</h1>
            <BookList />
            <AddBook />
          </div>
        </ApolloProvider>
      </Layout>
    );
  }
}

export default App;
