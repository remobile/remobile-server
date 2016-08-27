import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Auth extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <div className={styles.content}>
        {this.props.children}
      </div>
    );
  }
}
