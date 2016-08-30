import React, {PropTypes} from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

export const DELETE_KEY = (1 << 0);
export const ADD_KEY = (1 << 1);
export const EDIT_KEY = (1 << 2);

export default class MenuContainer extends React.Component {
    static defaultProps = {
        keys: 0x7,
    };
    render() {
        const {keys} = this.props;
        const deleteKey = !!(keys&DELETE_KEY), addKey = !!(keys&ADD_KEY), editKey = !!(keys&EDIT_KEY);
        return (
            <Menu onClick={(e)=>{this.props.handleClick(e.key)}}
                selectedKeys={[]}
                mode="horizontal"
                >
                {
                    deleteKey &&
                    <MenuItem key={DELETE_KEY}>
                        <Icon type="minus-circle-o" />
                        删除
                    </MenuItem>
                }
                {
                    addKey &&
                    <MenuItem key={ADD_KEY}>
                        <Icon type="plus-circle-o" />
                        新增
                    </MenuItem>
                }
                {
                    editKey &&
                    <MenuItem key={EDIT_KEY}>
                        <Icon type="edit" />
                        修改
                    </MenuItem>
                }
            </Menu>
        )
    }
}
