interface QueryResponse {
  __typename: string;
}

export interface Repository extends QueryResponse {
  id: string;
  description: string;
  nameWithOwner: string;
  url: string;
}