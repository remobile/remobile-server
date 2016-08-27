import React, {PropTypes} from 'react';
import { Menu, Icon, Modal } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

export default class MenuContainer extends React.Component {
    handleClick(e) {
        const {actions, states} = this.props;
        if (e.key == 1) {
            actions.openRemove();
        } else if (e.key == 2) {
            actions.openModal({isEdit: false});
        } else {
            if (states.selectedAdministrator) {
                actions.openModal({isEdit: true});
            } else {
                Modal.warning({
                    title: '请选择你要编辑的用户',
                });
            }
        }
    }
    render() {
        return (
            <Menu onClick={::this.handleClick}
                selectedKeys={[]}
                mode="horizontal"
                >
                <MenuItem key="1">
                    <Icon type="minus-circle-o" />
                    删除
                </MenuItem>
                <MenuItem key="2">
                    <Icon type="plus-circle-o" />
                    新增
                </MenuItem>
                <MenuItem key="3">
                    <Icon type="edit" />
                    修改
                </MenuItem>
            </Menu>
        )
    }
}
