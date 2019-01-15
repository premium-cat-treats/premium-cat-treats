import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Order} from './Order'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Order', () => {
  let Order

  beforeEach(() => {
    Order = shallow(<Order email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
