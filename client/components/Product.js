import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'

class Product extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    const {product} = this.props

    return (
      <div>
        <h3>{product.title}</h3>
        <p>Price: ${product.priceCents / 100}</p>
        <p>Description: {product.description}</p>
        {this.props.user.adminAccess ? (
          <Link to={`/products/admin/${product.id}`}>Edit this Product</Link>
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
