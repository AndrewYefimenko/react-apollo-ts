import React, { Component, PureComponent, FormEvent } from 'react';
import styles from './Login.module.css';
import Auth from '../../services/Auth';

export class Login extends PureComponent<object> {
  public render() {
    return (
      <div className={styles.wrapper}>
        <p>Please, provide your GitHub token to access the App</p>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input className={styles.formInput} type="text" name="token"/>
          <button className={styles.formButton} type="submit">Save</button>
        </form>
      </div>
    )
  }

  public handleSubmit = (event: any): void => {
    event.preventDefault();
    const token = event.target.token.value;
    if (token) {
      Auth.login(token);
    }
  }
}
