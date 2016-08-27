import * as React from 'react';

export default class Icon extends  React.Component {
  render() {
    const props = this.props;
    const { type, className = '' } = props;
    return <i {...props} className={`${className} anticon anticon-${type}`.trim()} />;
  }
}
