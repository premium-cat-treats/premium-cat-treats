import React, {Component} from 'react'
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

  // Function to dynamically add numbered options to the
  // drop-down menu, so we don't display more items than
  // are in stock.
  createOptions = x => {
    let options = []

    for (let i = 1; i <= x; i++) {
      options.push(
        <option key={i} value={`${i}`}>
          {i}
        </option>
      )
    }

    return options
  }

  render() {
    const {title, priceCents, quantity, description, id} = this.props.product
    // console.log(this.createOptions(5))

    return (
      <div>
        <h3>{title}</h3>
        <p>Price: ${priceCents / 100}</p>
        <p>Quantity in Stock: {quantity}</p>
        <p>Description: {description}</p>

        {/* Drop-down to allow user to add to cart */}
        <div>
          <select ref={`${id}-quantity-drop-down`} defaultValue="1">
            {this.createOptions(quantity)}
            {/* <option key={1} value={1}>
              {1}
            </option> */}
          </select>
          <button
            type="button"
            onClick={() => this.handleSubmit(this.props.product)}
          >
            Add to Cart
          </button>
        </div>

        {this.props.user.adminAccess ? (
          <Link to={`/products/admin/${id}`}>Edit this Product</Link>
        ) : null}
      </div>
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
