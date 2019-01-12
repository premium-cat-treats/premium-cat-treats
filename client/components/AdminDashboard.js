import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import AddProductForm from './AddProducForm'
import AllProducts from './AllProducts'
import AdminUserMenu from './AdminUserMenu'
import {connect} from 'react-redux'

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        {this.props.user.adminAccess ? (
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
        ) : (
          <div>
            <h1>You don't have access to this page!</h1>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(AdminDashboard)
