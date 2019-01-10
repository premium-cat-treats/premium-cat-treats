import React, {Component} from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'

class Product extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    const {product} = this.props
    console.log(this.props.product)
    return (
      <Card>
        <Image src={product.imageUrl} />
        <Card.Content>
          <Card.Header>{product.title}</Card.Header>
          <Card.Meta>
            <span className="price">${product.priceCents / 100}</span>
          </Card.Meta>
          <Card.Description>{product.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            {this.props.user.adminAccess ? (
              <Link to={`/products/admin/${product.id}`}>
                Edit this Product
              </Link>
            ) : null}
          </a>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
