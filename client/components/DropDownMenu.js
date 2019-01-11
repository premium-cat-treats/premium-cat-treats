import React, {Component} from 'react'
import {fetchCategories} from '../store/category'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class DropDownMenu extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange = event => {
    const value = Number(event.target.value)

    this.props.history.push(`/category/${value}`)
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DropDownMenu)
)
