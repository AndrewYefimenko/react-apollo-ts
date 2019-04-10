import gql from "graphql-tag";

export const REMOVE_STAR = gql`
  mutation REMOVE_STAR($input: RemoveStarInput!) {
    removeStar(input: $input) {
      clientMutationId
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;