import request from 'superagent';
import React, {PropTypes} from 'react';
import { notification } from 'antd';

import Login from './components/login';

export default class LoginContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  onSubmit (administrator) {
    const {username, password} = administrator;

    request
      .post('/admin/login')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({username, password})
      .end((error, res) => {
        if (error) {
            notification.error({description: res.body.message});
        } else {
          window.location.href = '/admin';
        }
      });
  }

  render () {
    return (
      <Login
        {...this.props}
        onSubmit={::this.onSubmit}
      />
    );
  }
}
