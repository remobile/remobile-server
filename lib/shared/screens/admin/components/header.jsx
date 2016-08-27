import React , {PropTypes} from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import styles from './header.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

export default class Header extends React.Component {
    static fragments = {
        administrator: {
            _id: 1,
            email: 1,
            name: 1
        }
    };
    static propTypes = {
        administrator: PropTypes.object.isRequired
    };
    render () {
        const {_id, email, name} = this.props.administrator || {};
        return (
            <div className={styles.header}>
                <Menu className={styles.menu} mode="horizontal">
                    <SubMenu title={<span><Icon type="administrator" />{name}</span>}>
                        <MenuItem key="1">
                            <Link to='/admin/personal'>
                                <Icon type="info-circle-o" />
                                个人中心
                            </Link>
                        </MenuItem>
                        <MenuItem key="2"><a href='/admin/logout'><Icon type="logout" />注销</a></MenuItem>
                    </SubMenu>
                    <MenuItem key="3">
                        <Icon type="question" />
                        帮助
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}
