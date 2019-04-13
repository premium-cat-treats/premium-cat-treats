/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CartItem from './CartItem'
import {Button, Image, List} from 'semantic-ui-react'

const cartItem = {
  product: {
    id: 1,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Cat_illustration.jpg/120px-Cat_illustration.jpg',
    priceCents: 399,
    title: 'KittyKat',
    quantity: 5,
    description: 'This is the description'
  },
  quantity: 3
}

const adapter = new Adapter()
enzyme.configure({adapter})

describe('CartItem', () => {
  let cartItemTester

  beforeEach(() => {
    cartItemTester = shallow(<CartItem cartItem={cartItem} />)
  })

  it('renders two <List.Content /> components', () => {
    expect(cartItemTester.find(List.Content)).to.have.lengthOf(2)
  })

  it('renders a delete button', () => {
    expect(cartItemTester.find(Button)).to.have.lengthOf(1)
  })

  it('renders a dynamic drop down list based on product quantity', () => {
    expect(cartItemTester.find('select').children()).to.have.lengthOf(
      cartItem.product.quantity
    )
  })

  it('renders the correct product title for the cart item', () => {
    expect(cartItemTester.find('.product-title').text()).to.be.equal(
      cartItem.product.title
    )
  })

  it('renders 1 cart item photo', () => {
    expect(cartItemTester.find(Image)).to.have.lengthOf(1)
  })

  it('can access props for cart item product and quantity', () => {
    const instance = cartItemTester.instance()
    expect(instance.props.cartItem.quantity).to.equal(cartItem.quantity)
    expect(instance.props.cartItem.product).to.equal(cartItem.product)
  })
})
