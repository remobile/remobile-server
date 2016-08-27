import React from 'react';
import {Breadcrumb} from 'antd';
import styles from './navbar.less';
import menudata from 'config/menu';
const BreadcrumbItem = Breadcrumb.Item;

export default class NavBar extends React.Component {
    getBreadcrumbItem(navpath) {
        let items = [];
        let data = menudata;
        navpath.forEach((p, i)=>{
            let item = data[p];
            items.push(<BreadcrumbItem key={i}>{item.label}</BreadcrumbItem>);
            data = item.child;
        });
        return items;
    }
    render () {
        const {navpath} = this.props;
        return (
            <div className={styles.breadcrumb}>
                <Breadcrumb>
                    { this.getBreadcrumbItem(navpath) }
                </Breadcrumb>
            </div>
        )
    }
}
