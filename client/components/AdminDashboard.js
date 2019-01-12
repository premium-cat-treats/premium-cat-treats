import React, {Component} from 'react'
import {Grid, Button} from 'semantic-ui-react'
import AddProductForm from './AddProductForm'
import AllProducts from './AllProducts'
import AdminUserMenu from './AdminUserMenu'

class AdminDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    })
  }
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={9}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <AdminUserMenu />
            <br />
            <Button
              onClick={this.handleFormOpen}
              positive
              content="Add New Product"
            />
            {this.state.isOpen && (
              <AddProductForm handleClose={this.handleClose} />
            )}
          </Grid.Column>
          <Grid.Column width={6} />
          <AllProducts />
        </Grid>
      </div>
    )
  }
}

export default AdminDashboard
