import React, {Component} from 'react'
import {fetchSingleUser} from '../store/user'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'

class ManageableUser extends Component {
  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.userId)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>USER INFO</h1>

        <h3>
          <Icon name="address card" />
          {this.props.users.email}
        </h3>
        {this.props.users.adminAccess ? <h5>Admin Access</h5> : null}
        <h5>{`Created On: ${this.props.users.createdAt}`}</h5>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  orders: state.userOrders
})

const mapDispatchToProps = dispatch => ({
  fetchSingleUser: id => dispatch(fetchSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageableUser)
