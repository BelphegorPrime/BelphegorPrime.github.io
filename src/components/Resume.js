import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink, ApolloLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

import resumeData from '../assets/resumeData.json';

const token = '14fee8671afc54c452738c656e139ff9cff5de12';
const client = new ApolloClient({
  link: ApolloLink.from([
    (operation, next) => {
      operation.setContext(context => ({
        ...context,
        headers: {
          ...context.headers,
          Authorization: `Bearer ${token}`
        }
      }));

      return next(operation);
    },
    new HttpLink({ uri: 'https://api.github.com/graphql' })
  ]),
  cache: new InMemoryCache()
});

const githubQuery = gql`
  query {
    viewer {
      login
      company
      repositories(first: 50, orderBy: { field: PUSHED_AT, direction: ASC }) {
        nodes {
          id
          shortDescriptionHTML
          owner {
            avatarUrl
            login
          }
          name
          stargazers {
            totalCount
          }
          url
        }
      }
    }
  }
`;

const Resume = props => {
  const { firstname, lastname, email, github, twitter } = resumeData;
  const experiences = resumeData.experiences
    .map(d => {
      const to = Date.parse(d.to);
      return {
        ...d,
        from: Date.parse(d.from),
        to: isNaN(to) ? new Date().getTime() : to
      };
    })
    .sort((a, b) => {
      if (a.from > b.from) {
        return 1;
      }
      if (a.from <= b.from) {
        return -1;
      }
      return 0;
    });
  return (
    <ApolloProvider client={client}>
      <Query query={githubQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error {error.message}</p>;

          console.log(data);
          return <div className="App" />;
        }}
      </Query>
    </ApolloProvider>
  );
};

export default Resume;
