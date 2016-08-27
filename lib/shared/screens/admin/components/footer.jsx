import React from 'react';
import styles from './footer.less';

export default class Footer extends React.Component {
    render () {
        return (
            <div className={styles.footer}>
                贵阳千陌科技有限公司 版权所有 © 2015 gycc.com
            </div>
        )
    }
}
