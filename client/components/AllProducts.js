import React, {Component} from 'react'
import {connect} from 'react-redux'

class AllProducts extends Component {
  componentDidMount() {
    // TODO: Uncomment line below when we have a thunk imported from the store named fetchProducts.
    // this.props.fetchProducts();
  }

  render() {
    const {products} = this.props

    return (
      <div>
        {products ? <div>{products}</div> : <div>No products in database.</div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
