import React, {Component} from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'
import {addToCart} from '../store/cart'

class Product extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  handleSubmit = product => {
    const quantity = Number(this.refs[`${product.id}-quantity-drop-down`].value)
    this.props.addToCart(product.id, quantity)
  }

  render() {
    const {product} = this.props
    // Creates a dynamic array of options based on current product quantity.
    const quantityOptions = new Array(product.quantity)
    quantityOptions.fill('_')
    const options = quantityOptions.map((option, i) => (
      <option key={i} value={`${i + 1}`}>
        {i + 1}
      </option>
    ))

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
          <Icon name="paw" />
          <div>
            <select ref={`${product.id}-quantity-drop-down`} defaultValue="1">
              {options}
            </select>
            <button type="button" onClick={() => this.handleSubmit(product)}>
              Add to Cart
            </button>
          </div>
          <a>
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
  getUser: () => dispatch(me()),
  addToCart: (productId, quantity) => dispatch(addToCart(productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
