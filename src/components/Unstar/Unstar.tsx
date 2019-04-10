import React, {FC} from 'react';
import { REMOVE_STAR, STARED_REPOSITORIES } from '../../apollo';
import { MutationState } from 'react-apollo/Mutation';
import { Mutation } from 'react-apollo';
import { Button } from '../';

type UnstarProps = {
  starrableId: string;
  clientMutationId: string;
}

export const Unstar: FC<UnstarProps> = ({starrableId, clientMutationId}) => (
  <Mutation
    mutation={REMOVE_STAR}
    variables={{input: {starrableId, clientMutationId}}}
    refetchQueries={[{query: STARED_REPOSITORIES}]}>
    {(removeStar: any, {loading, error, data}: MutationState) => (
      <Button
        disabled={loading}
        onClick={removeStar}>
        <span className="StarredListItem-star"/>
        Unstar
      </Button>
    )}
  </Mutation>
);