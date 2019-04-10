import React, { FC } from 'react';
import { StarredList } from '../StarredList/StarredList';
import { STARED_REPOSITORIES } from '../../apollo';
import Query from 'react-apollo/Query';
import { QueryResult } from 'react-apollo';

export const Profile: FC<object> = () => (
  <div className="Profile">
    <Query query={STARED_REPOSITORIES}>
      {({data, loading, error}: QueryResult) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        return <StarredList viewerId={data.viewer.id} items={data.viewer.starredRepositories.nodes}/>;
      }}
    </Query>
  </div>
);
