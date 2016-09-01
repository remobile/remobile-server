import React, {PropTypes} from 'react';
import { Card, Menu, Icon, Modal } from 'antd';
import styles from './index.less';
import RegisterAdmin from 'components/RegisterAdmin';
import PasswordModal from './passwordModal';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;


export default class Personal extends React.Component {
    static fragments = {
        administrator: {
            _id: 1,
            username: 1,
            name: 1,
            email: 1,
            authority: 1,
            date: 1,
        }
    };
    onSubmit(newadministrator) {
        const {actions, administrator} = this.props;
        actions.updateSelfInfo(administrator._id, newadministrator);
    }
    handleClick(e) {
        const {startEditPersonalInfo, openUpdatePasswordModal} = this.props.actions;
        if (e.key == 1) {
            startEditPersonalInfo();
        } else if (e.key == 2) {
            openUpdatePasswordModal();
        }
    }
    getMenu() {
        const {isSelfEditing} = this.props.states;
        return (
            <Menu className={styles.menux}
                onClick={::this.handleClick}
                selectedKeys={[]}
                mode="horizontal"
                >
                <SubMenu title={<span><Icon type="setting" className={styles.icon}/></span>}>
                    <MenuItem key="1" disabled={isSelfEditing}>
                        <Icon type="plus-circle-o" />
                        修改信息
                    </MenuItem>
                    <MenuItem key="2" disabled={isSelfEditing}>
                        <Icon type="edit" />
                        修改密码
                    </MenuItem>
                </SubMenu>
            </Menu>
        )
    }
    render() {
        const props = this.props;
        return (
            <Card title="个人信息" extra={this.getMenu()} >
                <RegisterAdmin isSelf {...props}  onSubmit={::this.onSubmit} />
                <PasswordModal {...props}/>
            </Card>
        )
    }
}
