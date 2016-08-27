import React, {PropTypes} from 'react';
import Sidebar from './sidebar';
import Header from './header';
import Navbar from './navbar';
import Footer from './footer';

import styles from './index.less';

export default class App extends React.Component {
    static fragments = Header.fragments;
    render() {
        const {administrator, updateNavPath, navpath} = this.props;
        return (
            <div className={styles.aside}>
                <Sidebar
                    updateNavPath={updateNavPath}
                    />
                <div className={styles.main}>
                    <Header administrator={administrator} />
                    <Navbar navpath={navpath}/>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
    render1() {
        return this.props.children;
    }
}
