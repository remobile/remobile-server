import React, {PropTypes} from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

export const NULL_TYPE = (0);
export const DELETE_TYPE = (1 << 0);
export const ADD_TYPE = (1 << 1);
export const EDIT_TYPE = (1 << 2);

export default class MenuContainer extends React.Component {
    static defaultProps = {
        keys: 0x7,
    };
    render() {
        const {keys} = this.props;
        const menus = [];
        if (keys&DELETE_TYPE) {
            menus.push(
                <MenuItem key={DELETE_TYPE}>
                    <Icon type="minus-circle-o" />
                    删除
                </MenuItem>
            );
        }
        if (keys&ADD_TYPE) {
            menus.push(
                <MenuItem key={ADD_TYPE}>
                    <Icon type="plus-circle-o" />
                    新增
                </MenuItem>
            );
        }
        if (keys&EDIT_TYPE) {
            menus.push(
                <MenuItem key={EDIT_TYPE}>
                    <Icon type="edit" />
                    修改
                </MenuItem>
            );
        }
        return (
            <Menu onClick={(e)=>{this.props.handleClick(e.key)}}
                mode="horizontal"
                >
                {menus}
            </Menu>
        )
    }
}
