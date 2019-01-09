import React, {Component} from 'react'
import {fetchCategories} from '../store/category'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'

class DropDownMenu extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    const value = Number(event.target.value)
    // If the value is valid, need to redirect URL to /product/:value Route
    if (value) console.log({value})
  }

  render() {
    const {categories} = this.props

    return (
      <div>
        <select name="categories" defaultValue="" onChange={this.handleChange}>
          <option disabled="disabled" value="">
            Select a Category
          </option>
          {categories ? (
            categories.map(category => {
              return (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              )
            })
          ) : (
            <option>Fetching Categories</option>
          )}
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenu)
