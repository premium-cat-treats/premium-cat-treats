import React, {Component} from 'react'
import ProductForm from './productForm'
import {connect} from 'react-redux'
import {deleteProductById} from '../store/product'

class ManageableProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  handleSelectSubmit = (e, id) => {
    e.preventDefault()
    if (e.target.value === 'delete') {
      this.props.deleteProduct(id)
      //reroute to AllProducts
    } else if (e.target.value === 'edit') {
      this.setState({edit: true})
    }
  }

  deleteProduct = id => {
    this.props.deleteProduct(id)
  }

  render() {
    return (
      <div className="single-admin-product">
        <div>
          <h3>{this.props.product.title}</h3>
          <img src={this.props.product.imageUrl} />
          <h4>{this.props.product.priceCents}</h4>
          <h4>{this.props.product.quantity}</h4>
          <p>{this.props.product.description}</p>
        </div>
        <form onSubmit={this.handleSelectSubmit(e, this.props.product.id)}>
          <select>
            <option>--</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        {this.state.edit ? <ProductForm /> : null}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteProduct: id => dispatch(deleteProductById(id))
})

export default connect(null, mapDispatchToProps)(ManageableProduct)
