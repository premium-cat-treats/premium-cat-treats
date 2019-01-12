import React, {Component} from 'react'
import {Input, Menu, Segment} from 'semantic-ui-react'

class AdminUserMenu extends Component {
  state = {activeItem: 'home'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state

    return (
      <div>
        <Menu pointing>
          <Menu.Item
            name="products"
            active={activeItem === 'products'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="orders"
            active={activeItem === 'orders'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="users"
            active={activeItem === 'users'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search&quot; placeholder=&quot;Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default AdminUserMenu
