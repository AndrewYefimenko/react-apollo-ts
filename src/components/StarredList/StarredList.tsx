import React, { Component, FC } from 'react';
import { Repository } from '../../models';
import StarredListItem from '../StarredListItem/StarredListItem';
import { Unstar } from '../Unstar/Unstar';

type StarredListProps = {
  items: Repository[],
  viewerId: string
}

export const StarredList: FC<StarredListProps> = ({items, viewerId}) => (
  <ul>
    {items.map((node: Repository) => (
      <StarredListItem {...node} key={node.id}>
        <Unstar clientMutationId={viewerId} starrableId={node.id} />
      </StarredListItem>
    ))}
  </ul>
);
