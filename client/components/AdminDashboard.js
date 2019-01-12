import React, {Component} from 'react'
import {Grid, Button} from 'semantic-ui-react'
import AddProductForm from './AddProductForm'
import AllProducts from './AllProducts'
import AdminUserMenu from './AdminUserMenu'
import {connect} from 'react-redux'

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
      { this.props.user.adminAccess ? 
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
        </Grid> : (
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
