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

  handleSubmit = productInDB => {
    const quantityAddingToCart = Number(
      this.refs[`${productInDB.id}-quantity-drop-down`].value
    )

    this.props.addToCart(productInDB, quantityAddingToCart)
  }

  render() {
    const {product} = this.props
    const [productInCart] = this.props.cart.filter(
      item => item.product.id === product.id
    )
    const cartItemQuantity = productInCart ? productInCart.quantity : 0

    // Creates a dynamic array of options based on available
    // items in stock minus what is already in the cart.
    const quantityOptions = new Array(product.quantity - cartItemQuantity)
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
          <div>
            <select ref={`${product.id}-quantity-drop-down`} defaultValue="1">
              {options}
            </select>
            {/* Button disables if the user already has already placed all available items in stock into their cart. */}
            <button
              type="button"
              disabled={product.quantity - cartItemQuantity ? '' : 'true'}
              onClick={() => this.handleSubmit(product)}
            >
              Add to Cart
            </button>
          </div>
          <div>
            {this.props.user.adminAccess ? (
              <Link to={`/products/admin/${product.id}`}>
                <Icon name="edit" />
                Edit this Product
              </Link>
            ) : null}
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me()),
  addToCart: (product, quantity) => dispatch(addToCart(product, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
