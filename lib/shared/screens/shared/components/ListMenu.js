import React, {PropTypes} from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

export default class MenuContainer extends React.Component {
    render() {
        return (
            <Menu onClick={(e)=>{this.props.handleClick(e.key)}}
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
