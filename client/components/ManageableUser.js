import React, {Component} from 'react'
import {fetchSingleUser, updateUserById} from '../store/user'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'

class ManageableUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      salt: '',
      googleId: '',
      adminAccess: false,
      deleted: false
    }
  }

  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.userId)
  }

  deleteUser = id => {
    this.props.updateUser({deleted: true}, id)
    this.props.history.push('/users')
  }

  render() {
    return (
      <div>
        <h1>USER INFO</h1>

        <h3>
          <Icon name="address card" />
          {this.props.users.email}
        </h3>
        {this.props.users.adminAccess ? <h5>Admin Access</h5> : null}
        <h5>{`Created On: ${this.props.users.createdAt}`}</h5>

        <button onClick={() => this.deleteUser(id)}>Delete this User</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  fetchSingleUser: id => dispatch(fetchSingleUser(id)),
  updateUser: (userInfo, id) => dispatch(updateUserById(userInfo, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageableUser)
