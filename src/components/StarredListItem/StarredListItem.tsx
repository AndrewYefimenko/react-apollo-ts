import React, { PureComponent } from 'react';
import { Repository } from '../../models';
import './StarredListItem.css';

export default class StarredListItem extends PureComponent<Repository> {
  public render() {
    const {url, nameWithOwner, description, children} = this.props;
    
    return (
      <li className="StarredListItem-wrapper">
        <div className="StarredListItem-header">
          <a className="StarredListItem-title" href={url} target="_blank">{nameWithOwner}</a>
          {children}
        </div>
        <div className="StarredListItem-description">{description}</div>
      </li>
    );
  }
}