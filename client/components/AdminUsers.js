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
    console.log(this.props.users)
    return (
      <div>
        <AdminDashboard />
        <h2>Current Users</h2>
        {this.props.users.length ? (
          <div>
            <UserList users={this.props.users} />
          </div>
        ) : (
          <div>No users in database.</div>
        )}
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
