import React, {Component} from 'react'
import {fetchUsers, updateUserById} from '../store/user'
import {connect} from 'react-redux'
import {Icon, Button, Radio} from 'semantic-ui-react'

class ManageableUser extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  deleteUser = (id, user) => {
    user.deleted = true
    this.props.updateUser(user, id)
    console.log(this.props.history)
    this.props.history.push('/admin/users')
  }

  changeAdmin = (id, user) => {
    user.adminAccess = !user.adminAccess
    this.props.updateUser(user, id)
  }

  render() {
    const user = this.props.users.find(
      specificUser => specificUser.id === Number(this.props.match.params.userId)
    )

    return user ? (
      <div>
        <h1>USER INFO</h1>

        <h3>
          <Icon name="address card" />
          {user.email}
        </h3>

        <Button
          toggle
          active={user.adminAccess}
          icon="clipboard"
          label="Admin"
          onClick={() => this.changeAdmin(user.id, user)}
        />

        <h5>{`Created On: ${user.createdAt}`}</h5>

        <Button
          onClick={() => this.deleteUser(user.id, user)}
          style={{color: '#944317'}}
        >
          Delete this User
        </Button>
      </div>
    ) : null
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  updateUser: (userInfo, id) => dispatch(updateUserById(userInfo, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageableUser)
