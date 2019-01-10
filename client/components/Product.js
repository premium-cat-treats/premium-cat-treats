import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'

class Product extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  handleSubmit = event => {
    const {id, title} = this.props.product
    event.preventDefault()
    const quantity = document.getElementById(`${id}-quantity-drop-down`)
    console.log(quantity.value, title)
  }

  render() {
    const {title, priceCents, quantity, description, id} = this.props.product

    return (
      <div>
        <h3>{title}</h3>
        <p>Price: ${priceCents / 100}</p>
        <p>Quantity in Stock: {quantity}</p>
        <p>Description: {description}</p>

        {/* Drop-down to allow user to add to cart */}
        <form onSubmit={this.handleSubmit}>
          <select id={`${id}-quantity-drop-down`} defaultValue="1">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit">Add to Cart</button>
        </form>

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
  getUser: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
