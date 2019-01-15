import React, {Component} from 'react'
import {fetchUsers, updateUserById} from '../store/user'
import {connect} from 'react-redux'
import {Icon, Button, Card} from 'semantic-ui-react'
import AdminDashboard from './AdminDashboard'

class ManageableUser extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  deleteUser = (id, user) => {
    user.deleted = true
    this.props.updateUser(user, id)
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
        <AdminDashboard />
        <h1>USER INFO</h1>

        <Card.Group>
          <Card>
            <Card.Content>
              <Card.Header>
                <Icon name="address card" />
                {user.email}
              </Card.Header>
              <Card.Meta>{`Created On: ${user.createdAt}`}</Card.Meta>
              <Card.Description>
                <Button
                  toggle
                  active={user.adminAccess}
                  icon="clipboard"
                  label="Admin"
                  onClick={() => this.changeAdmin(user.id, user)}
                />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  onClick={() => this.deleteUser(user.id, user)}
                  color="red"
                >
                  Delete this User
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
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
