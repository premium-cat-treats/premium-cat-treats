import React, {Component} from 'react'
import AdminDashboard from './AdminDashboard'
import {connect} from 'react-redux'
import UserList from './UserList'
import {fetchUsers} from '../store/user'

class AdminUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  render() {
    return (
      <div>
        <AdminDashboard />
        {this.props.users.length && this.props.users.adminAccess ? (
          <div>
            <h2>Current Users</h2>
            <UserList users={this.props.users} />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
