import React, {Component} from 'react'
import {Input, Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class AdminUserMenu extends Component {
  state = {activeItem: 'home'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state

    return (
      <div>
        <Menu pointing>
          <Menu.Item
            as={Link}
            to="/admin/products"
            name="products"
            active={activeItem === 'products'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/admin/users"
            name="users"
            active={activeItem === 'users'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default AdminUserMenu
