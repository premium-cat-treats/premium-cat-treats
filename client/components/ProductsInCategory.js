import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import ProductsList from './ProductsList'

class ProductsInCategory extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products, categories} = this.props
    // Grabs categoryId from parameter in URL
    const categoryId = Number(this.props.match.params.categoryId)
    // Finds category associated with id from URL
    const selectedCategory = categories.filter(
      category => category.id === categoryId
    )[0]
    // Finds the products from associated category
    const filteredProducts = products.filter(product => {
      return product.categories.some(category => category.id === categoryId)
    })

    return (
      <div>
        {products.length ? (
          <div>
            <h2>{selectedCategory.title}</h2>
            <ProductsList products={filteredProducts} />
          </div>
        ) : (
          <div>No products in database.</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.productsReducer,
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsInCategory)
