import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import AddProductForm from './AddProducForm'
import AllProducts from './AllProducts'
import AdminUserMenu from './AdminUserMenu'

class AdminDashboard extends Component {
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
            <AddProductForm />
          </Grid.Column>
          <Grid.Column width={6} />
          <AllProducts />
        </Grid>
      </div>
    )
  }
}

export default AdminDashboard
