import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import Product from './Product'

class ProductsInCategory extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products, categories} = this.props
    const categoryId = Number(this.props.match.params.categoryId)
    const selectedCategory = categories.filter(
      category => category.id === categoryId
    )

    return (
      <div>
        {products.length ? (
          <div>
            <h2>{selectedCategory[0].title}</h2>
            {products
              // Will only properly filter if each product only belongs to one category
              .filter(product => product.categories[0].id === categoryId)
              .map(product => {
                return <Product key={product.id} product={product} />
              })}
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
