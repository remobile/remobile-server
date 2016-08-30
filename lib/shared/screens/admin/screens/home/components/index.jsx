import React, {PropTypes} from 'react';
import { Modal, Button, Spin } from 'antd';
import styles from './index.less';

export default class Home extends React.Component {
    state = {
        passwordModalVisile: false,
    }
    handleSubmit() {
        this.setState({passwordModalVisile: true});
    }
    render () {
        return (
            <div className={styles.container}>
                <Button type="primary" onClick={::this.handleSubmit}>登录</Button>
                <Modal
                    visible={this.state.passwordModalVisile}
                    footer={null}
                    className={styles.container}
                    wrapClassName="vertical-center-modal"
                    closable={false}
                    >
                    <div style={{textAlign:'center', padding: 250}}>
                        <div style={{textAlign:'center', backgroundColor:'white', width:50, height:50, borderRadius:25, padding:14}}>
                            <Spin />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
