import React, {Component} from 'react'
import {Card, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class User extends Component {
  render() {
    const {user} = this.props
    return (
      <Card>
        <Card.Content>
          <Card.Header>{user.email}</Card.Header>
          <Card.Meta>
            <span className="Admin">
              {user.adminAccess ? (
                <div>
                  <Icon name="clipboard" />Admin
                </div>
              ) : null}
            </span>
          </Card.Meta>
          <Card.Description>{user.email}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/admin/users/${user.id}`}>
            <Icon name="edit" /> Edit this User
          </Link>
        </Card.Content>
      </Card>
    )
  }
}

export default User
