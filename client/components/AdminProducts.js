import React, {Component} from 'react'
import AdminDashboard from './AdminDashboard'
import {Grid, Button} from 'semantic-ui-react'
import AddProductForm from './AddProductForm'
import AllProducts from './AllProducts'

class AdminProducts extends Component {
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
        <AdminDashboard />
        <h2>Admin Products</h2>

        <Grid>
          <Grid.Column width={9}>
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

export default AdminProducts
