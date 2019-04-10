import gql from "graphql-tag";

export const STARED_REPOSITORIES = gql`
  query STARED_REPOSITORIES {
    viewer {
      id
      starredRepositories(
        first: 10,
        orderBy: {
          direction: DESC,
          field: STARRED_AT
        }
      ) {
        nodes {
          id
          nameWithOwner
          description
          url
        }
      }
    }
  }
`;