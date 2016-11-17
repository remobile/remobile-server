import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Button, Icon } from 'antd';
import styles from './sidebar.less';
import menudata from 'config/menu';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

export default class Sidebar extends React.Component {
    static propTypes = {
        updateNavPath: PropTypes.func.isRequired,
    };
    state = {
        current: '1',
        openKeys: [],
    };
    handleClick(e) {
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1),
        });
        this.props.updateNavPath(e.key.split('_'));
    }
    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        });
    }
    showMenuItem(data, key) {
        return data.map((item, i)=>{
            const newkey = key ? key+'_'+i : i;
            if (item === '-') {
                return <MenuDivider key={newkey}/>
            }
            const {label, icon, link, child} = item;
            if (!child) {
                return (
                    <MenuItem key={newkey}>
                        <Link to={link}>{icon&&<Icon type={icon} />}{label}</Link>
                    </MenuItem>
                )
            } else {
                return (
                    <SubMenu key={newkey} title={<span>{icon&&<Icon type={icon} />}{label}</span>}>
                        {this.showMenuItem(child, newkey)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        return (
            <aside className={styles.sider}>
                <div className={styles.logo}></div>
                <Menu onClick={::this.handleClick}
                    openKeys={this.state.openKeys}
                    onOpen={::this.onToggle}
                    onClose={::this.onToggle}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                    theme="dark"
                    >
                    {this.showMenuItem(menudata)}
                </Menu>
            </aside>
        )
    }
}
