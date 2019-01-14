import React, {Component} from 'react'
import AdminUserMenu from './AdminUserMenu'
import {connect} from 'react-redux'

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        {this.props.user.adminAccess ? (
          <AdminUserMenu />
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
